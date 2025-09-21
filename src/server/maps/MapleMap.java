/*
 This file is part of the OdinMS Maple Story Server
 Copyright (C) 2008 ~ 2010 Patrick Huy <patrick.huy@frz.cc>
 Matthias Butz <matze@odinms.de>
 Jan Christian Meyer <vimes@odinms.de>

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License version 3
 as published by the Free Software Foundation. You may not use, modify
 or distribute this program under any other version of the
 GNU Affero General Public License.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package server.maps;

import java.awt.Point;
import java.awt.Rectangle;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.Lock;
import java.util.Calendar;

import client.inventory.Equip;
import client.inventory.Item;
import constants.GameConstants;
import constants.ServerConstants;
import client.MapleBuffStat;
import client.MapleCharacter;
import client.MapleClient;
import client.MapleQuestStatus;
import client.MonsterFamiliar;
import client.Skill;
import client.SkillFactory;
import client.inventory.MapleInventoryType;
import client.inventory.MaplePet;
import client.status.MonsterStatus;
import client.status.MonsterStatusEffect;
import constants.QuickMove;
import database.DatabaseConnection;

import handling.channel.ChannelServer;
import handling.channel.handler.InventoryHandler;
import handling.world.PartyOperation;
import handling.world.World;
import handling.world.exped.ExpeditionType;
import java.lang.ref.WeakReference;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.EnumMap;
import java.util.LinkedHashMap;
import java.util.concurrent.locks.ReentrantLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import server.MapleItemInformationProvider;
import server.MaplePortal;
import server.MapleStatEffect;
import server.Randomizer;
import server.MapleInventoryManipulator;
import server.Timer;
import server.life.MapleMonster;
import server.life.MapleNPC;
import server.life.MapleLifeFactory;
import server.life.Spawns;
import server.life.SpawnPoint;
import server.life.SpawnPointAreaBoss;
import server.life.MonsterDropEntry;
import server.life.MonsterGlobalDropEntry;
import server.life.MapleMonsterInformationProvider;
import server.quest.MapleQuest;
import tools.FileoutputUtil;
import tools.StringUtil;
import tools.packet.EtcPacket;
import tools.packet.PetPacket;
import tools.packet.MobPacket;
import scripting.EventManager;
import server.MapleCarnivalFactory;
import server.MapleCarnivalFactory.MCSkill;
import server.MapleSquad;
import server.MapleSquad.MapleSquadType;
import server.SpeedRunner;
import server.Timer.MapTimer;
import server.Timer.EtcTimer;
import server.WheelData;
import server.events.MapleEvent;
import server.maps.MapleNodes.DirectionInfo;
import server.maps.MapleNodes.MapleNodeInfo;
import server.maps.MapleNodes.MaplePlatform;
import server.maps.MapleNodes.MonsterPoint;
import tools.Pair;
import tools.packet.EtcPacket.EffectPacket;
import tools.packet.EtcPacket.NPCPacket;
import tools.packet.EtcPacket;
import tools.packet.EtcPacket.SummonPacket;
import tools.packet.EtcPacket.UIPacket;
import tools.packet.MaplePacketCreator;
import tools.packet.MaplePacketCreator.PartyPacket;

public final class MapleMap {

    /*
     * Holds mappings of OID -> MapleMapObject separated by MapleMapObjectType.
     * Please acquire the appropriate lock when reading and writing to the LinkedHashMaps.
     * The MapObjectType Maps themselves do not need to synchronized in any way since they should never be modified.
     */
    private final Map<MapleMapObjectType, LinkedHashMap<Integer, MapleMapObject>> mapobjects;
    private final Map<MapleMapObjectType, ReentrantReadWriteLock> mapobjectlocks;
    private final List<MapleCharacter> characters = new ArrayList<MapleCharacter>();
    private final ReentrantReadWriteLock charactersLock = new ReentrantReadWriteLock();
    private int runningOid = 500000;
    private final Lock runningOidLock = new ReentrantLock();
    private final List<Spawns> monsterSpawn = new ArrayList<Spawns>();
    private final AtomicInteger spawnedMonstersOnMap = new AtomicInteger(0);
    private final Map<Integer, MaplePortal> portals = new HashMap<Integer, MaplePortal>();
    private MapleFootholdTree footholds = null;
    private float monsterRate, recoveryRate;
    private MapleMapEffect mapEffect;
    private byte channel;
    private short decHP = 0, createMobInterval = 9000, top = 0, bottom = 0, left = 0, right = 0;
    private int consumeItemCoolTime = 0, protectItem = 0, decHPInterval = 10000, mapid, returnMapId, timeLimit,
            fieldLimit, maxRegularSpawn = 0, fixedMob, forcedReturnMap = 999999999, instanceid = -1,
            lvForceMove = 0, lvLimit = 0, permanentWeather = 0, partyBonusRate = 0;
    private boolean town, clock, personalShop, everlast = false, dropsDisabled = false, gDropsDisabled = false,
            soaring = false, squadTimer = false, isSpawns = true, checkStates = true;
    private String mapName, streetName, onUserEnter, onFirstUserEnter, speedRunLeader = "";
    private List<Integer> dced = new ArrayList<Integer>();
    private ScheduledFuture<?> squadSchedule;
    private long speedRunStart = 0, lastSpawnTime = 0, lastHurtTime = 0;
    private MapleNodes nodes;
    private MapleSquadType squad;
    private Map<String, Integer> environment = new LinkedHashMap<String, Integer>();

    public MapleMap(final int mapid, final int channel, final int returnMapId, final float monsterRate) {
        this.mapid = mapid;
        this.channel = (byte) channel;
        this.returnMapId = returnMapId;
        if (this.returnMapId == 999999999) {
            this.returnMapId = mapid;
        }
        if (GameConstants.getPartyPlay(mapid) > 0) {
            this.monsterRate = (monsterRate - 1.0f) * 2.5f + 1.0f;
        } else {
            this.monsterRate = monsterRate;
        }
        EnumMap<MapleMapObjectType, LinkedHashMap<Integer, MapleMapObject>> objsMap = new EnumMap<MapleMapObjectType, LinkedHashMap<Integer, MapleMapObject>>(MapleMapObjectType.class);
        EnumMap<MapleMapObjectType, ReentrantReadWriteLock> objlockmap = new EnumMap<MapleMapObjectType, ReentrantReadWriteLock>(MapleMapObjectType.class);
        for (MapleMapObjectType type : MapleMapObjectType.values()) {
            objsMap.put(type, new LinkedHashMap<Integer, MapleMapObject>());
            objlockmap.put(type, new ReentrantReadWriteLock());
        }
        mapobjects = Collections.unmodifiableMap(objsMap);
        mapobjectlocks = Collections.unmodifiableMap(objlockmap);
    }

    public final void setSpawns(final boolean fm) {
        this.isSpawns = fm;
    }

    public final boolean getSpawns() {
        return isSpawns;
    }

    public final void setFixedMob(int fm) {
        this.fixedMob = fm;
    }

    public boolean isAriantPQMap() {
        switch (this.getId()) {
            case 980010101:
            case 980010201:
            case 980010301:
                return true;
        }
        return false;
    }

    public final void setForceMove(int fm) {
        this.lvForceMove = fm;
    }

    public final int getForceMove() {
        return lvForceMove;
    }

    public final void setLevelLimit(int fm) {
        this.lvLimit = fm;
    }

    public final int getLevelLimit() {
        return lvLimit;
    }

    public final void setReturnMapId(int rmi) {
        this.returnMapId = rmi;
    }

    public final void setSoaring(boolean b) {
        this.soaring = b;
    }

    public final boolean canSoar() {
        return soaring;
    }

    public final void toggleDrops() {
        this.dropsDisabled = !dropsDisabled;
    }

    public final void setDrops(final boolean b) {
        this.dropsDisabled = b;
    }

    public final void toggleGDrops() {
        this.gDropsDisabled = !gDropsDisabled;
    }

    public final int getId() {
        return mapid;
    }

    public final MapleMap getReturnMap() {
        return ChannelServer.getInstance(channel).getMapFactory().getMap(returnMapId);
    }

    public final int getReturnMapId() {
        return returnMapId;
    }

    public final int getForcedReturnId() {
        return forcedReturnMap;
    }

    public final MapleMap getForcedReturnMap() {
        return ChannelServer.getInstance(channel).getMapFactory().getMap(forcedReturnMap);
    }

    public final void setForcedReturnMap(final int map) {
        this.forcedReturnMap = map;
    }

    public final float getRecoveryRate() {
        return recoveryRate;
    }

    public final void setRecoveryRate(final float recoveryRate) {
        this.recoveryRate = recoveryRate;
    }

    public final int getFieldLimit() {
        return fieldLimit;
    }

    public final void setFieldLimit(final int fieldLimit) {
        this.fieldLimit = fieldLimit;
    }

    public final void setCreateMobInterval(final short createMobInterval) {
        this.createMobInterval = createMobInterval;
    }

    public final void setTimeLimit(final int timeLimit) {
        this.timeLimit = timeLimit;
    }

    public final void setMapName(final String mapName) {
        this.mapName = mapName;
    }

    public final String getMapName() {
        return mapName;
    }

    public final String getStreetName() {
        return streetName;
    }

    public final void setFirstUserEnter(final String onFirstUserEnter) {
        this.onFirstUserEnter = onFirstUserEnter;
    }

    public final void setUserEnter(final String onUserEnter) {
        this.onUserEnter = onUserEnter;
    }

    public final String getFirstUserEnter() {
        return onFirstUserEnter;
    }

    public final String getUserEnter() {
        return onUserEnter;
    }

    public final boolean hasClock() {
        return clock;
    }

    public final void setClock(final boolean hasClock) {
        this.clock = hasClock;
    }

    public final boolean isTown() {
        return town;
    }

    public final void setTown(final boolean town) {
        this.town = town;
    }

    public final boolean allowPersonalShop() {
        return personalShop;
    }

    public final void setPersonalShop(final boolean personalShop) {
        this.personalShop = personalShop;
    }

    public final void setStreetName(final String streetName) {
        this.streetName = streetName;
    }

    public final void setEverlast(final boolean everlast) {
        this.everlast = everlast;
    }

    public final boolean getEverlast() {
        return everlast;
    }

    public final int getHPDec() {
        return decHP;
    }

    public final void setHPDec(final int delta) {
        if (delta > 0 || mapid == 749040100) { //pmd
            lastHurtTime = System.currentTimeMillis(); //start it up
        }
        decHP = (short) delta;
    }

    public final int getHPDecInterval() {
        return decHPInterval;
    }

    public final void setHPDecInterval(final int delta) {
        decHPInterval = delta;
    }

    public final int getHPDecProtect() {
        return protectItem;
    }

    public final void setHPDecProtect(final int delta) {
        this.protectItem = delta;
    }

    public final int getCurrentPartyId() {
        charactersLock.readLock().lock();
        try {
            final Iterator<MapleCharacter> ltr = characters.iterator();
            MapleCharacter chr;
            while (ltr.hasNext()) {
                chr = ltr.next();
                if (chr.getParty() != null) {
                    return chr.getParty().getId();
                }
            }
        } finally {
            charactersLock.readLock().unlock();
        }
        return -1;
    }

    public final void addMapObject(final MapleMapObject mapobject) {
        runningOidLock.lock();
        int newOid;
        try {
            newOid = ++runningOid;
        } finally {
            runningOidLock.unlock();
        }

        mapobject.setObjectId(newOid);

        mapobjectlocks.get(mapobject.getType()).writeLock().lock();
        try {
            mapobjects.get(mapobject.getType()).put(newOid, mapobject);
        } finally {
            mapobjectlocks.get(mapobject.getType()).writeLock().unlock();
        }
    }

    private void spawnAndAddRangedMapObject(final MapleMapObject mapobject, final DelayedPacketCreation packetbakery) {
        addMapObject(mapobject);

        charactersLock.readLock().lock();
        try {
            final Iterator<MapleCharacter> itr = characters.iterator();
            MapleCharacter chr;
            while (itr.hasNext()) {
                chr = itr.next();
                if (!chr.isClone() && (mapobject.getType() == MapleMapObjectType.MIST || chr.getTruePosition().distanceSq(mapobject.getTruePosition()) <= GameConstants.maxViewRangeSq())) {
                    packetbakery.sendPackets(chr.getClient());
                    chr.addVisibleMapObject(mapobject);
                }
            }
        } finally {
            charactersLock.readLock().unlock();
        }
    }

    public final void removeMapObject(final MapleMapObject obj) {
        mapobjectlocks.get(obj.getType()).writeLock().lock();
        try {
            mapobjects.get(obj.getType()).remove(Integer.valueOf(obj.getObjectId()));
        } finally {
            mapobjectlocks.get(obj.getType()).writeLock().unlock();
        }
    }

    public final Point calcPointBelow(final Point initial) {
        final MapleFoothold fh = footholds.findBelow(initial);
        if (fh == null) {
            return null;
        }
        int dropY = fh.getY1();
        if (!fh.isWall() && fh.getY1() != fh.getY2()) {
            final double s1 = Math.abs(fh.getY2() - fh.getY1());
            final double s2 = Math.abs(fh.getX2() - fh.getX1());
            if (fh.getY2() < fh.getY1()) {
                dropY = fh.getY1() - (int) (Math.cos(Math.atan(s2 / s1)) * (Math.abs(initial.x - fh.getX1()) / Math.cos(Math.atan(s1 / s2))));
            } else {
                dropY = fh.getY1() + (int) (Math.cos(Math.atan(s2 / s1)) * (Math.abs(initial.x - fh.getX1()) / Math.cos(Math.atan(s1 / s2))));
            }
        }
        return new Point(initial.x, dropY);
    }

    public final Point calcDropPos(final Point initial, final Point fallback) {
        final Point ret = calcPointBelow(new Point(initial.x, initial.y - 50));
        if (ret == null) {
            return fallback;
        }
        return ret;
    }

    private void dropFromMonster(final MapleCharacter chr, final MapleMonster mob, final boolean instanced) {
        if (mob == null || chr == null || ChannelServer.getInstance(channel) == null || dropsDisabled || mob.dropsDisabled() || chr.getPyramidSubway() != null) { //no drops in pyramid ok? no cash either
            return;
        }

        //We choose not to readLock for this.
        //This will not affect the internal state, and we don't want to
        //introduce unneccessary locking, especially since this function
        //is probably used quite often.
        if (!instanced && mapobjects.get(MapleMapObjectType.ITEM).size() >= 250) {
            removeDrops();
        }

        final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        final byte droptype = (byte) (mob.getStats().isExplosiveReward() ? 3 : mob.getStats().isFfaLoot() ? 2 : chr.getParty() != null ? 1 : 0);
        final int mobpos = mob.getTruePosition().x, cmServerrate = ChannelServer.getInstance(channel).getMesoRate(), caServerrate = ChannelServer.getInstance(channel).getCashRate();
        int chServerrate = ChannelServer.getInstance(channel).getDropRate(); 
        if (chr.getPC()>=System.currentTimeMillis()) {
            chServerrate += 1; //프리미엄 서비스 드롭배율, ex (+1이면 드롭율 2배, +2이면 드롭율 3배)
        }        
        Item idrop;
        byte d = 1;
        Point pos = new Point(0, mob.getTruePosition().y);
        double showdown = 100.0;
        final MonsterStatusEffect mse = mob.getBuff(MonsterStatus.SHOWDOWN);
        if (mse != null) {
            showdown += mse.getX();
        }
        int mobId = mob.getId();
        int originmob = mobId;
        if (mobId >= 9800000 && mobId <= 9800124) {
            mobId = mob.getStats().getLink();
        }
        final MapleMonsterInformationProvider mi = MapleMonsterInformationProvider.getInstance();
        final List<MonsterDropEntry> derp = mi.retrieveDrop(mobId);
        if (derp == null) { //if no drops, no global drops either <3
            return;
        }
        final List<MonsterDropEntry> dropEntry = new ArrayList<MonsterDropEntry>(derp);
        Collections.shuffle(dropEntry);
        //if (mobId >= 8140001 && mobId <= 8140002 && chr.getKeyValue("rndrmr") != null); {
        //    dropEntry.add(new MonsterDropEntry(4032861, 40000, 1, 1, (short) 0));
        //}
        // 몬스터레벨별 드롭설정하는곳
        if ((mob.getStats().getLevel() >= 1) && (mob.getStats().getLevel() <= 69)) {
            dropEntry.add(new MonsterDropEntry(4001513, 5000, 1, 1, (short) 0));//斑點紋卷碎片
            dropEntry.add(new MonsterDropEntry(2022450, 10000, 1, 1, (short) 0));//經驗值上升(小)
        }
        if ((mob.getStats().getLevel()) >= 70 && (mob.getStats().getLevel() <= 119)) {
            dropEntry.add(new MonsterDropEntry(4001515, 5000, 1, 1, (short) 0));//豹紋卷碎片
            dropEntry.add(new MonsterDropEntry(2022451, 10000, 1, 1, (short) 0));//經驗值上升(中)
        }
        if ((mob.getStats().getLevel()) >= 120 && (mob.getStats().getLevel() <= 255)) {
            dropEntry.add(new MonsterDropEntry(4001521, 5000, 1, 1, (short) 0));//老虎紋卷碎片
            dropEntry.add(new MonsterDropEntry(2022452, 10000, 1, 1, (short) 0));//經驗值上升(大)
        }
        if ((mob.getStats().getLevel()) >= 10 && (mob.getStats().getLevel() <= 255)) {
            dropEntry.add(new MonsterDropEntry(2430692, 500, 1, 1, (short) 0));//Nebulite Box
        }
        //끝
        if (originmob >= 9800000 && originmob <= 9800124) {
            dropEntry.add(new MonsterDropEntry(4310020, 30000, 1, 1, (short) 0));
            dropEntry.add(new MonsterDropEntry(2028079, 12000, 1, 1, (short) 0));
            dropEntry.add(new MonsterDropEntry(2028080, 12000, 1, 1, (short) 0));

            dropEntry.add(new MonsterDropEntry(4330000, 3500, 1, 1, (short) 0));
            dropEntry.add(new MonsterDropEntry(4330004, 3500, 1, 1, (short) 0));
            dropEntry.add(new MonsterDropEntry(4330001, 2500, 1, 1, (short) 0));
            dropEntry.add(new MonsterDropEntry(4330005, 2500, 1, 1, (short) 0));
            dropEntry.add(new MonsterDropEntry(4330002, 2000, 1, 1, (short) 0));
            dropEntry.add(new MonsterDropEntry(4330006, 2000, 1, 1, (short) 0));
            dropEntry.add(new MonsterDropEntry(4330003, 1500, 1, 1, (short) 0));
            dropEntry.add(new MonsterDropEntry(4330007, 1500, 1, 1, (short) 0));
        }
        if (mob.getStats().isBoss()) {
            dropEntry.add(new MonsterDropEntry(4310029, 35000, 1, 1, (short) 0));
        }
        boolean mesoDropped = false;
        for (final MonsterDropEntry de : dropEntry) {
            if (de.itemId == mob.getStolen()) {
                continue;
            }
            if (Randomizer.nextInt(999999) < (int) (de.chance * chServerrate * chr.getDropMod() * (chr.getStat().dropBuff / 100.0) * (showdown / 100.0))) {
                if (mesoDropped && droptype != 3 && de.itemId == 0) { //not more than 1 sack of meso
                    continue;
                }
                if (de.questid > 0 && chr.getQuestStatus(de.questid) != 1) {
                    continue;
                }
                if (!mob.getStats().isBoss() && chr.getMonsterBook().getLevelByCard(ii.getCardMobId(de.itemId)) >= 2) {//de.itemId / 10000 == 238 &&
                    continue;
                }
                if (droptype == 3) {
                    pos.x = (mobpos + (d % 2 == 0 ? (40 * (d + 1) / 2) : -(40 * (d / 2))));
                } else {
                    pos.x = (mobpos + ((d % 2 == 0) ? (25 * (d + 1) / 2) : -(25 * (d / 2))));
                }
                if (de.itemId == 0) { // meso
                    int mesos = Randomizer.nextInt(1 + Math.abs(de.Maximum - de.Minimum)) + de.Minimum;

                    if (mesos > 0) {
                        if (chr.getPC()>=System.currentTimeMillis()) {
                            mesos += mesos * 0.5; //프리미엄 서비스 메소배율, ex(0.5면 50%)
                        }
                        spawnMobMesoDrop((int) (mesos * (chr.getStat().mesoBuff / 100.0) * cmServerrate), calcDropPos(pos, mob.getTruePosition()), mob, chr, false, droptype);
                        mesoDropped = true;
                    }
                } else {
                    if (GameConstants.getInventoryType(de.itemId) == MapleInventoryType.EQUIP) {
                        idrop = ii.randomizeStats((Equip) ii.getEquipById(de.itemId));
                        if (mob.getMap().getId() >= 952000000 && mob.getMap().getId() < 955000000) {
                            ((Equip) idrop).resetPotential();
                        }
                    } else {
                        final int range = Math.abs(de.Maximum - de.Minimum);
                        idrop = new Item(de.itemId, (byte) 0, (short) (de.Maximum != 1 ? Randomizer.nextInt(range <= 0 ? 1 : range) + de.Minimum : 1), (byte) 0);
                    }
                    idrop.setGMLog("Dropped from monster " + mobId + " on " + mapid);
                    spawnMobDrop(idrop, calcDropPos(pos, mob.getTruePosition()), mob, chr, droptype, de.questid);
                }
                d++;
            }
        }
        final List<MonsterGlobalDropEntry> globalEntry = new ArrayList<MonsterGlobalDropEntry>(mi.getGlobalDrop());
        Collections.shuffle(globalEntry);
        final int cashz = (int) ((mob.getStats().isBoss() && mob.getStats().getHPDisplayType() == 0 ? 20 : 1) * caServerrate);
        final int cashModifier = (int) ((mob.getStats().isBoss() ? (mob.getStats().isPartyBonus() ? (mob.getMobExp() / 1000) : 0) : (mob.getMobExp() / 1000 + mob.getMobMaxHp() / 20000))); //no rate
        // Global Drops
        for (final MonsterGlobalDropEntry de : globalEntry) {
            if (Randomizer.nextInt(999999) < de.chance && (de.continent < 0 || (de.continent < 10 && mapid / 100000000 == de.continent) || (de.continent < 100 && mapid / 10000000 == de.continent) || (de.continent < 1000 && mapid / 1000000 == de.continent))) {
                if (de.questid > 0 && chr.getQuestStatus(de.questid) != 1) {
                    continue;
                }
                if (de.itemId == 0) {
                    //chr.modifyCSPoints(1, (int) ((Randomizer.nextInt(cashz) + cashz + cashModifier) * (chr.getStat().cashBuff / 100.0) * chr.getCashMod()), true);
                } else if (!gDropsDisabled) {
                    if (droptype == 3) {
                        pos.x = (mobpos + (d % 2 == 0 ? (40 * (d + 1) / 2) : -(40 * (d / 2))));
                    } else {
                        pos.x = (mobpos + ((d % 2 == 0) ? (25 * (d + 1) / 2) : -(25 * (d / 2))));
                    }
                    if (GameConstants.getInventoryType(de.itemId) == MapleInventoryType.EQUIP) {
                        idrop = ii.randomizeStats((Equip) ii.getEquipById(de.itemId));
                    } else {
                        idrop = new Item(de.itemId, (byte) 0, (short) (de.Maximum != 1 ? Randomizer.nextInt(de.Maximum - de.Minimum) + de.Minimum : 1), (byte) 0);
                    }
                    idrop.setGMLog("Dropped from monster " + mobId + " on " + mapid + " (Global)");
                    spawnMobDrop(idrop, calcDropPos(pos, mob.getTruePosition()), mob, chr, de.onlySelf ? 0 : droptype, de.questid);
                    d++;
                }
            }
        }
    }

    public void removeMonster(final MapleMonster monster) {
        if (monster == null) {
            return;
        }
        spawnedMonstersOnMap.decrementAndGet();
        broadcastMessage(MobPacket.killMonster(monster.getObjectId(), 0));
        removeMapObject(monster);
        monster.killed();
    }

    public void killMonster(final MapleMonster monster) { // For mobs with removeAfter
        if (monster == null) {
            return;
        }
        spawnedMonstersOnMap.decrementAndGet();
        monster.setHp(0);
        if (monster.getLinkCID() <= 0) {
            monster.spawnRevives(this);
        }
        broadcastMessage(MobPacket.killMonster(monster.getObjectId(), monster.getStats().getSelfD() < 0 ? 1 : monster.getStats().getSelfD()));
        removeMapObject(monster);
        monster.killed();
    }

    public final void killMonster(final MapleMonster monster, final MapleCharacter chr, final boolean withDrops, final boolean second, byte animation) {
        killMonster(monster, chr, withDrops, second, animation, 0);
    }

    public final void killMonster(final MapleMonster monster, final MapleCharacter chr, final boolean withDrops, final boolean second, byte animation, final int lastSkill) {
        if (monster.getId() == 8820014) { //pb sponge, kills pb(w) first before dying
            killMonster(8820000);
        } else if (monster.getId() == 9300166) { //ariant pq bomb
            animation = 4; //or is it 3?
        }
        spawnedMonstersOnMap.decrementAndGet();
        removeMapObject(monster);
        monster.killed();
        final MapleSquad sqd = getSquadByMap();
        final boolean instanced = sqd != null || monster.getEventInstance() != null || getEMByMap() != null;
        int dropOwner = monster.killBy(chr, lastSkill);
        if (animation >= 0) {
            broadcastMessage(MobPacket.killMonster(monster.getObjectId(), animation));
        }
        if (chr.getQuestStatus(29400) == 1 && monster.getStats().getLevel() > chr.getLevel()) {//精明的獵人勳章任務
            final int mobdiy = Integer.parseInt(chr.getQuestNAdd(MapleQuest.getInstance(29400)).getCustomData()) + 1;
            chr.getQuestNAdd(MapleQuest.getInstance(29400)).setCustomData(mobdiy + "");
            chr.updateQuest(chr.getQuestNAdd(MapleQuest.getInstance(29400)), true);
        }
        if (chr.getBuffedValue(MapleBuffStat.REAPER) != null) {
            Skill reaper = SkillFactory.getSkill(32111006);
            if (reaper.getEffect(chr.getSkillLevel(reaper)).makeChanceResult() && chr.getSummonsSize() < 5) {//召喚裡波數量限制
                MapleSummon summon = chr.getSummons().get(32111006);
                if (summon == null) {
                    summon = new MapleSummon(chr, 32111006, chr.getSkillLevel(reaper), chr.getPosition(), SummonMovementType.WALK_STATIONARY);
                    summon.setSpawnTime(System.currentTimeMillis());
                    chr.addSummon(summon);
                }
                chr.getMap().spawnSummon(summon);
            }
        }
        final int mobid = monster.getId();
        ExpeditionType type = null;
        if (mobid == 8820008) { //wipe out statues and respawn
            for (final MapleMapObject mmo : getAllMonstersThreadsafe()) {
                MapleMonster mons = (MapleMonster) mmo;
                if (mons.getLinkOid() != monster.getObjectId()) {
                    killMonster(mons, chr, false, false, animation);
                }
            }
        } else if (mobid >= 8820010 && mobid <= 8820014) {
            for (final MapleMapObject mmo : getAllMonstersThreadsafe()) {
                MapleMonster mons = (MapleMonster) mmo;
                if (mons.getId() != 8820000 && mons.getId() != 8820001 && mons.getObjectId() != monster.getObjectId() && mons.isAlive() && mons.getLinkOid() == monster.getObjectId()) {
                    killMonster(mons, chr, false, false, animation);
                }
            }
        } else if (mobid / 100000 == 98 && chr.getMapId() / 10000000 == 95 && getAllMonstersThreadsafe().size() == 0) {
            int stage = (chr.getMap().getId() / 100) % 100;
            broadcastMessage(EtcPacket.playSound("Party1/Clear"));
            if (stage == 5) {
                broadcastMessage(MaplePacketCreator.getTopMsg("This event has ended and you can leave now."));
                broadcastMessage(EtcPacket.showEffect("monsterPark/clearF"));
            } else {
                broadcastMessage(MaplePacketCreator.getTopMsg("The monster has been cleared and can continue to move forward."));
                broadcastMessage(EtcPacket.showEffect("monsterPark/clear"));
            }
        }
        if (type != null) {
            if (speedRunStart > 0 && speedRunLeader.length() > 0) {
                long endTime = System.currentTimeMillis();
                String time = StringUtil.getReadableMillis(speedRunStart, endTime);
                broadcastMessage(MaplePacketCreator.serverNotice(5, speedRunLeader + "'s squad has taken " + time + " to defeat " + type.name() + "!"));
                getRankAndAdd(speedRunLeader, time, type, (endTime - speedRunStart), (sqd == null ? null : sqd.getMembers()));
                endSpeedRun();
            }
        }
        if (withDrops && dropOwner != 1) {
            MapleCharacter drop = null;
            if (dropOwner <= 0) {
                drop = chr;
            } else {
                drop = getCharacterById(dropOwner);
                if (drop == null) {
                    drop = chr;
                }
            }
            dropFromMonster(drop, monster, instanced);
        }
        if (chr.getAutoLoot() == true) {
            InventoryHandler.autoLoot(chr, chr.getClient());
        }
    }

    public List<MapleReactor> getAllReactor() {
        return getAllReactorsThreadsafe();
    }

    public List<MapleReactor> getAllReactorsThreadsafe() {
        ArrayList<MapleReactor> ret = new ArrayList<MapleReactor>();
        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.REACTOR).values()) {
                ret.add((MapleReactor) mmo);
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
        return ret;
    }

    public List<MapleSummon> getAllSummonsThreadsafe() {
        ArrayList<MapleSummon> ret = new ArrayList<MapleSummon>();
        mapobjectlocks.get(MapleMapObjectType.SUMMON).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.SUMMON).values()) {
                if (mmo instanceof MapleSummon) {
                    ret.add((MapleSummon) mmo);
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.SUMMON).readLock().unlock();
        }
        return ret;
    }

    public List<MapleMapObject> getAllDoor() {
        return getAllDoorsThreadsafe();
    }

    public List<MapleMapObject> getAllDoorsThreadsafe() {
        ArrayList<MapleMapObject> ret = new ArrayList<MapleMapObject>();
        mapobjectlocks.get(MapleMapObjectType.DOOR).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.DOOR).values()) {
                if (mmo instanceof MapleDoor) {
                    ret.add(mmo);
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.DOOR).readLock().unlock();
        }
        return ret;
    }

    public List<MapleMapObject> getAllMechDoorsThreadsafe() {
        ArrayList<MapleMapObject> ret = new ArrayList<MapleMapObject>();
        mapobjectlocks.get(MapleMapObjectType.DOOR).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.DOOR).values()) {
                if (mmo instanceof MechDoor) {
                    ret.add(mmo);
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.DOOR).readLock().unlock();
        }
        return ret;
    }

    public List<MapleMapObject> getAllMerchant() {
        return getAllHiredMerchantsThreadsafe();
    }

    public List<MapleMapObject> getAllHiredMerchantsThreadsafe() {
        ArrayList<MapleMapObject> ret = new ArrayList<MapleMapObject>();
        mapobjectlocks.get(MapleMapObjectType.HIRED_MERCHANT).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.HIRED_MERCHANT).values()) {
                ret.add(mmo);
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.HIRED_MERCHANT).readLock().unlock();
        }
        return ret;
    }

    public List<MapleMonster> getAllMonster() {
        return getAllMonstersThreadsafe();
    }

    public List<MapleMonster> getAllMonstersThreadsafe() {
        ArrayList<MapleMonster> ret = new ArrayList<MapleMonster>();
        mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.MONSTER).values()) {
                ret.add((MapleMonster) mmo);
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().unlock();
        }
        return ret;
    }

    public List<Integer> getAllUniqueMonsters() {
        ArrayList<Integer> ret = new ArrayList<Integer>();
        mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.MONSTER).values()) {
                final int theId = ((MapleMonster) mmo).getId();
                if (!ret.contains(theId)) {
                    ret.add(theId);
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().unlock();
        }
        return ret;
    }

    public final void killAllMonsters(final boolean animate) {
        for (final MapleMapObject monstermo : getAllMonstersThreadsafe()) {
            final MapleMonster monster = (MapleMonster) monstermo;
            spawnedMonstersOnMap.decrementAndGet();
            monster.setHp(0);
            broadcastMessage(MobPacket.killMonster(monster.getObjectId(), animate ? 1 : 0));
            removeMapObject(monster);
            monster.killed();
        }
    }

    public final void killMonster(final int monsId) {
        for (final MapleMapObject mmo : getAllMonstersThreadsafe()) {
            if (((MapleMonster) mmo).getId() == monsId) {
                spawnedMonstersOnMap.decrementAndGet();
                removeMapObject(mmo);
                broadcastMessage(MobPacket.killMonster(mmo.getObjectId(), 1));
                ((MapleMonster) mmo).killed();
                break;
            }
        }
    }

    private String MapDebug_Log() {
        final StringBuilder sb = new StringBuilder("Defeat time : ");
        sb.append(FileoutputUtil.CurrentReadable_Time());

        sb.append(" | Mapid : ").append(this.mapid);

        charactersLock.readLock().lock();
        try {
            sb.append(" Users [").append(characters.size()).append("] | ");
            for (MapleCharacter mc : characters) {
                sb.append(mc.getName()).append(", ");
            }
        } finally {
            charactersLock.readLock().unlock();
        }
        return sb.toString();
    }

    public final void limitReactor(final int rid, final int num) {
        List<MapleReactor> toDestroy = new ArrayList<MapleReactor>();
        Map<Integer, Integer> contained = new LinkedHashMap<Integer, Integer>();
        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            for (MapleMapObject obj : mapobjects.get(MapleMapObjectType.REACTOR).values()) {
                MapleReactor mr = (MapleReactor) obj;
                if (contained.containsKey(mr.getReactorId())) {
                    if (contained.get(mr.getReactorId()) >= num) {
                        toDestroy.add(mr);
                    } else {
                        contained.put(mr.getReactorId(), contained.get(mr.getReactorId()) + 1);
                    }
                } else {
                    contained.put(mr.getReactorId(), 1);
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
        for (MapleReactor mr : toDestroy) {
            destroyReactor(mr.getObjectId());
        }
    }

    public final void destroyReactors(final int first, final int last) {
        List<MapleReactor> toDestroy = new ArrayList<MapleReactor>();
        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            for (MapleMapObject obj : mapobjects.get(MapleMapObjectType.REACTOR).values()) {
                MapleReactor mr = (MapleReactor) obj;
                if (mr.getReactorId() >= first && mr.getReactorId() <= last) {
                    toDestroy.add(mr);
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
        for (MapleReactor mr : toDestroy) {
            destroyReactor(mr.getObjectId());
        }
    }

    public final void destroyReactor(final int oid) {
        final MapleReactor reactor = getReactorByOid(oid);
        if (reactor == null) {
            return;
        }
        broadcastMessage(EtcPacket.destroyReactor(reactor));
        reactor.setAlive(false);
        removeMapObject(reactor);
        reactor.setTimerActive(false);

        if (reactor.getDelay() > 0) {
            MapTimer.getInstance().schedule(new Runnable() {

                @Override
                public final void run() {
                    respawnReactor(reactor);
                }
            }, reactor.getDelay());
        }
    }

    public final void reloadReactors() {
        List<MapleReactor> toSpawn = new ArrayList<MapleReactor>();
        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            for (MapleMapObject obj : mapobjects.get(MapleMapObjectType.REACTOR).values()) {
                final MapleReactor reactor = (MapleReactor) obj;
                broadcastMessage(EtcPacket.destroyReactor(reactor));
                reactor.setAlive(false);
                reactor.setTimerActive(false);
                toSpawn.add(reactor);
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
        for (MapleReactor r : toSpawn) {
            removeMapObject(r);
            if (!r.isCustom()) { //guardians cpq
                respawnReactor(r);
            }
        }
    }

    /*
     * command to reset all item-reactors in a map to state 0 for GM/NPC use - not tested (broken reactors get removed
     * from mapobjects when destroyed) Should create instances for multiple copies of non-respawning reactors...
     */
    public final void resetReactors() {
        setReactorState((byte) 0);
    }

    public final void setReactorState() {
        setReactorState((byte) 1);
    }

    public final void setReactorState(final byte state) {
        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            for (MapleMapObject obj : mapobjects.get(MapleMapObjectType.REACTOR).values()) {
                ((MapleReactor) obj).forceHitReactor((byte) state);
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
    }

    public final void setReactorDelay(final int state) {
        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            for (MapleMapObject obj : mapobjects.get(MapleMapObjectType.REACTOR).values()) {
                ((MapleReactor) obj).setDelay(state);
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
    }

    /*
     * command to shuffle the positions of all reactors in a map for PQ purposes (such as ZPQ/LMPQ)
     */
    public final void shuffleReactors() {
        shuffleReactors(0, 9999999); //all
    }

    public final void shuffleReactors(int first, int last) {
        List<Point> points = new ArrayList<Point>();
        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            for (MapleMapObject obj : mapobjects.get(MapleMapObjectType.REACTOR).values()) {
                MapleReactor mr = (MapleReactor) obj;
                if (mr.getReactorId() >= first && mr.getReactorId() <= last) {
                    points.add(mr.getPosition());
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
        Collections.shuffle(points);
        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            for (MapleMapObject obj : mapobjects.get(MapleMapObjectType.REACTOR).values()) {
                MapleReactor mr = (MapleReactor) obj;
                if (mr.getReactorId() >= first && mr.getReactorId() <= last) {
                    mr.setPosition(points.remove(points.size() - 1));
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
    }

    /**
     * Automagically finds a new controller for the given monster from the chars
     * on the map...
     *
     * @param monster
     */
    public final void updateMonsterController(final MapleMonster monster) {
        if (!monster.isAlive() || monster.getLinkCID() > 0 || monster.getStats().isEscort()) {
            return;
        }
        if (monster.getController() != null) {
            if (monster.getController().getMap() != this || monster.getController().getTruePosition().distanceSq(monster.getTruePosition()) > monster.getRange()) {
                monster.getController().stopControllingMonster(monster);
            } else { // Everything is fine :)
                return;
            }
        }
        int mincontrolled = -1;
        MapleCharacter newController = null;

        charactersLock.readLock().lock();
        try {
            final Iterator<MapleCharacter> ltr = characters.iterator();
            MapleCharacter chr;
            while (ltr.hasNext()) {
                chr = ltr.next();
                if (!chr.isHidden() && !chr.isClone() && (chr.getControlledSize() < mincontrolled || mincontrolled == -1) && chr.getTruePosition().distanceSq(monster.getTruePosition()) <= monster.getRange()) {
                    mincontrolled = chr.getControlledSize();
                    newController = chr;
                }
            }
        } finally {
            charactersLock.readLock().unlock();
        }
        if (newController != null) {
            if (monster.isFirstAttack()) {
                newController.controlMonster(monster, true);
                monster.setControllerHasAggro(true);
            } else {
                newController.controlMonster(monster, false);
            }
        }
    }

    public final MapleMapObject getMapObject(int oid, MapleMapObjectType type) {
        mapobjectlocks.get(type).readLock().lock();
        try {
            return mapobjects.get(type).get(oid);
        } finally {
            mapobjectlocks.get(type).readLock().unlock();
        }
    }

    public final boolean containsNPC(int npcid) {
        mapobjectlocks.get(MapleMapObjectType.NPC).readLock().lock();
        try {
            Iterator<MapleMapObject> itr = mapobjects.get(MapleMapObjectType.NPC).values().iterator();
            while (itr.hasNext()) {
                MapleNPC n = (MapleNPC) itr.next();
                if (n.getId() == npcid) {
                    return true;
                }
            }
            return false;
        } finally {
            mapobjectlocks.get(MapleMapObjectType.NPC).readLock().unlock();
        }
    }

    public MapleNPC getNPCById(int id) {
        mapobjectlocks.get(MapleMapObjectType.NPC).readLock().lock();
        try {
            Iterator<MapleMapObject> itr = mapobjects.get(MapleMapObjectType.NPC).values().iterator();
            while (itr.hasNext()) {
                MapleNPC n = (MapleNPC) itr.next();
                if (n.getId() == id) {
                    return n;
                }
            }
            return null;
        } finally {
            mapobjectlocks.get(MapleMapObjectType.NPC).readLock().unlock();
        }
    }

    public MapleMonster getMonsterById(int id) {
        mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().lock();
        try {
            MapleMonster ret = null;
            Iterator<MapleMapObject> itr = mapobjects.get(MapleMapObjectType.MONSTER).values().iterator();
            while (itr.hasNext()) {
                MapleMonster n = (MapleMonster) itr.next();
                if (n.getId() == id) {
                    ret = n;
                    break;
                }
            }
            return ret;
        } finally {
            mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().unlock();
        }
    }

    public int countMonsterById(int id) {
        mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().lock();
        try {
            int ret = 0;
            Iterator<MapleMapObject> itr = mapobjects.get(MapleMapObjectType.MONSTER).values().iterator();
            while (itr.hasNext()) {
                MapleMonster n = (MapleMonster) itr.next();
                if (n.getId() == id) {
                    ret++;
                }
            }
            return ret;
        } finally {
            mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().unlock();
        }
    }

    public MapleReactor getReactorById(int id) {
        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            MapleReactor ret = null;
            Iterator<MapleMapObject> itr = mapobjects.get(MapleMapObjectType.REACTOR).values().iterator();
            while (itr.hasNext()) {
                MapleReactor n = (MapleReactor) itr.next();
                if (n.getReactorId() == id) {
                    ret = n;
                    break;
                }
            }
            return ret;
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
    }

    /**
     * returns a monster with the given oid, if no such monster exists returns
     * null
     *
     * @param oid
     * @return
     */
    public final MapleMonster getMonsterByOid(final int oid) {
        MapleMapObject mmo = getMapObject(oid, MapleMapObjectType.MONSTER);
        if (mmo == null) {
            return null;
        }
        return (MapleMonster) mmo;
    }

    public final MapleNPC getNPCByOid(final int oid) {
        MapleMapObject mmo = getMapObject(oid, MapleMapObjectType.NPC);
        if (mmo == null) {
            return null;
        }
        return (MapleNPC) mmo;
    }

    public final MapleReactor getReactorByOid(final int oid) {
        MapleMapObject mmo = getMapObject(oid, MapleMapObjectType.REACTOR);
        if (mmo == null) {
            return null;
        }
        return (MapleReactor) mmo;
    }

    public final MonsterFamiliar getFamiliarByOid(final int oid) {
        MapleMapObject mmo = getMapObject(oid, MapleMapObjectType.FAMILIAR);
        if (mmo == null) {
            return null;
        }
        return (MonsterFamiliar) mmo;
    }

    public final MapleReactor getReactorByName(final String name) {
        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            for (MapleMapObject obj : mapobjects.get(MapleMapObjectType.REACTOR).values()) {
                MapleReactor mr = ((MapleReactor) obj);
                if (mr.getName().equalsIgnoreCase(name)) {
                    return mr;
                }
            }
            return null;
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
    }

    public final void spawnNpc(final int id, final Point pos) {
        final MapleNPC npc = MapleLifeFactory.getNPC(id);
        npc.setPosition(pos);
        npc.setCy(pos.y);
        npc.setRx0(pos.x + 50);
        npc.setRx1(pos.x - 50);
        npc.setFh(getFootholds().findBelow(pos).getId());
        npc.setCustom(true);
        addMapObject(npc);
        broadcastMessage(NPCPacket.spawnNPC(npc, true));
    }

    public final void removeNpc(final int npcid) {
        mapobjectlocks.get(MapleMapObjectType.NPC).writeLock().lock();
        try {
            Iterator<MapleMapObject> itr = mapobjects.get(MapleMapObjectType.NPC).values().iterator();
            while (itr.hasNext()) {
                MapleNPC npc = (MapleNPC) itr.next();
                if (npc.isCustom() && (npcid == -1 || npc.getId() == npcid)) {
                    broadcastMessage(NPCPacket.removeNPCController(npc.getObjectId()));
                    broadcastMessage(NPCPacket.removeNPC(npc.getObjectId()));
                    itr.remove();
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.NPC).writeLock().unlock();
        }
    }

    public final void hideNpc(final int npcid) {
        mapobjectlocks.get(MapleMapObjectType.NPC).readLock().lock();
        try {
            Iterator<MapleMapObject> itr = mapobjects.get(MapleMapObjectType.NPC).values().iterator();
            while (itr.hasNext()) {
                MapleNPC npc = (MapleNPC) itr.next();
                if (npcid == -1 || npc.getId() == npcid) {
                    broadcastMessage(NPCPacket.removeNPCController(npc.getObjectId()));
                    broadcastMessage(NPCPacket.removeNPC(npc.getObjectId()));
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.NPC).readLock().unlock();
        }
    }

    public final void spawnReactorOnGroundBelow(final MapleReactor mob, final Point pos) {
        mob.setPosition(pos); //reactors dont need FH lol
        mob.setCustom(true);
        spawnReactor(mob);
    }

    public final void spawnMonster_sSack(final MapleMonster mob, final Point pos, final int spawnType) {
        mob.setPosition(calcPointBelow(new Point(pos.x, pos.y - 1)));
        spawnMonster(mob, spawnType);
    }

    public final void spawnMonster_Pokemon(final MapleMonster mob, final Point pos, final int spawnType) {
        final Point spos = calcPointBelow(new Point(pos.x, pos.y - 1));
        mob.setPosition(spos);
        spawnMonster(mob, spawnType, true);
    }

    public final void spawnMonsterOnGroundBelow(final MapleMonster mob, final Point pos) {
        spawnMonster_sSack(mob, pos, -2);
    }

    public final int spawnMonsterWithEffectBelow(final MapleMonster mob, final Point pos, final int effect) {
        final Point spos = calcPointBelow(new Point(pos.x, pos.y - 1));
        return spawnMonsterWithEffect(mob, effect, spos);
    }

    public final void spawnZakum(final int x, final int y) {
        final Point pos = new Point(x, y);
        final MapleMonster mainb = MapleLifeFactory.getMonster(8800000);
        final Point spos = calcPointBelow(new Point(pos.x, pos.y - 1));
        mainb.setPosition(spos);
        mainb.setFake(true);

        // Might be possible to use the map object for reference in future.
        spawnFakeMonster(mainb);

        final int[] zakpart = {8800003, 8800004, 8800005, 8800006, 8800007,
            8800008, 8800009, 8800010};

        for (final int i : zakpart) {
            final MapleMonster part = MapleLifeFactory.getMonster(i);
            part.setPosition(spos);

            spawnMonster(part, -2);
        }
        if (squadSchedule != null) {
            cancelSquadSchedule(false);
        }
    }

    public final void spawnChaosZakum(final int x, final int y) {
        final Point pos = new Point(x, y);
        final MapleMonster mainb = MapleLifeFactory.getMonster(8800100);
        final Point spos = calcPointBelow(new Point(pos.x, pos.y - 1));
        mainb.setPosition(spos);
        mainb.setFake(true);

        // Might be possible to use the map object for reference in future.
        spawnFakeMonster(mainb);

        final int[] zakpart = {8800103, 8800104, 8800105, 8800106, 8800107,
            8800108, 8800109, 8800110};

        for (final int i : zakpart) {
            final MapleMonster part = MapleLifeFactory.getMonster(i);
            part.setPosition(spos);

            spawnMonster(part, -2);
        }
        if (squadSchedule != null) {
            cancelSquadSchedule(false);
        }
    }

    public final void spawnFakeMonsterOnGroundBelow(final MapleMonster mob, final Point pos) {
        Point spos = calcPointBelow(new Point(pos.x, pos.y - 1));
        spos.y -= 1;
        mob.setPosition(spos);
        spawnFakeMonster(mob);
    }

    private void checkRemoveAfter(final MapleMonster monster) {
        final int ra = monster.getStats().getRemoveAfter();

        if (ra > 0 && monster.getLinkCID() <= 0) {
            monster.registerKill(ra * 1000);
        }
    }

    public final void spawnRevives(final MapleMonster monster, final int oid) {
        monster.setMap(this);
        checkRemoveAfter(monster);
        monster.setLinkOid(oid);
        spawnAndAddRangedMapObject(monster, new DelayedPacketCreation() {

            @Override
            public final void sendPackets(MapleClient c) {
                c.getSession().write(MobPacket.spawnMonster(monster, monster.getStats().getSummonType() <= 1 ? -3 : monster.getStats().getSummonType(), oid)); // TODO effect
            }
        });
        updateMonsterController(monster);

        spawnedMonstersOnMap.incrementAndGet();
    }

    public final void spawnMonster(final MapleMonster monster, final int spawnType) {
        spawnMonster(monster, spawnType, false);
    }

    public final void spawnMonster(final MapleMonster monster, final int spawnType, final boolean overwrite) {
        if (monster.getMap() == null && monster.getStats().isPatrol()) {
            monster.setPatrolScopeX1(monster.getPosition().x);
            monster.setPatrolScopeX2(monster.getPosition().x + monster.getStats().getPatrolRange());
        }
        monster.setMap(this);
        checkRemoveAfter(monster);

        spawnAndAddRangedMapObject(monster, new DelayedPacketCreation() {

            public final void sendPackets(MapleClient c) {
                c.getSession().write(MobPacket.spawnMonster(monster, monster.getStats().getSummonType() <= 1 || monster.getStats().getSummonType() == 27 || overwrite ? spawnType : monster.getStats().getSummonType(), 0));
            }
        });
        updateMonsterController(monster);

        spawnedMonstersOnMap.incrementAndGet();
    }

    public final int spawnMonsterWithEffect(final MapleMonster monster, final int effect, Point pos) {
        try {
            monster.setMap(this);
            monster.setPosition(pos);

            spawnAndAddRangedMapObject(monster, new DelayedPacketCreation() {

                @Override
                public final void sendPackets(MapleClient c) {
                    c.getSession().write(MobPacket.spawnMonster(monster, effect, 0));
                }
            });
            updateMonsterController(monster);

            spawnedMonstersOnMap.incrementAndGet();
            return monster.getObjectId();
        } catch (Exception e) {
            return -1;
        }
    }

    public final void spawnFakeMonster(final MapleMonster monster) {
        monster.setMap(this);
        monster.setFake(true);

        spawnAndAddRangedMapObject(monster, new DelayedPacketCreation() {

            @Override
            public final void sendPackets(MapleClient c) {
                c.getSession().write(MobPacket.spawnMonster(monster, -4, 0));
            }
        });
        updateMonsterController(monster);

        spawnedMonstersOnMap.incrementAndGet();
    }

    public final void spawnReactor(final MapleReactor reactor) {
        reactor.setMap(this);

        spawnAndAddRangedMapObject(reactor, new DelayedPacketCreation() {

            @Override
            public final void sendPackets(MapleClient c) {
                c.getSession().write(EtcPacket.spawnReactor(reactor));
            }
        });
    }

    private void respawnReactor(final MapleReactor reactor) {
        reactor.setState((byte) 0);
        reactor.setAlive(true);
        spawnReactor(reactor);
    }

    public final void spawnDoor(final MapleDoor door) {
        spawnAndAddRangedMapObject(door, new DelayedPacketCreation() {

            public final void sendPackets(MapleClient c) {
                door.sendSpawnData(c);
                c.getSession().write(MaplePacketCreator.enableActions());
            }
        });
    }

    public final void spawnMechDoor(final MechDoor door) {
        spawnAndAddRangedMapObject(door, new DelayedPacketCreation() {

            public final void sendPackets(MapleClient c) {
                c.getSession().write(EtcPacket.spawnMechDoor(door, true));
                c.getSession().write(MaplePacketCreator.enableActions());
            }
        });
    }

    public final void spawnSummon(final MapleSummon summon) {
        summon.updateMap(this);
        spawnAndAddRangedMapObject(summon, new DelayedPacketCreation() {

            @Override
            public void sendPackets(MapleClient c) {
                if (summon != null && c.getPlayer() != null && (!summon.isChangedMap() || summon.getOwnerId() == c.getPlayer().getId())) {
                    c.getSession().write(SummonPacket.spawnSummon(summon, true));
                }
            }
        });
    }

    public final void spawnFamiliar(final MonsterFamiliar familiar) {
        spawnAndAddRangedMapObject(familiar, new DelayedPacketCreation() {

            @Override
            public void sendPackets(MapleClient c) {
                if (familiar != null && c.getPlayer() != null) {
                    c.getSession().write(EtcPacket.spawnFamiliar(familiar, true));
                }
            }
        });
    }

    public final void spawnExtractor(final MapleExtractor ex) {
        spawnAndAddRangedMapObject(ex, new DelayedPacketCreation() {

            @Override
            public void sendPackets(MapleClient c) {
                ex.sendSpawnData(c);
            }
        });
    }

    public final void spawnMist(final MapleMist mist, final int duration, boolean fake) {
        spawnAndAddRangedMapObject(mist, new DelayedPacketCreation() {

            @Override
            public void sendPackets(MapleClient c) {
                mist.sendSpawnData(c);
            }
        });

        final MapTimer tMan = MapTimer.getInstance();
        final ScheduledFuture<?> poisonSchedule;
        switch (mist.isPoisonMist()) {
            case 1:
                //poison: 0 = none, 1 = poisonous, 2 = recovery
                final MapleCharacter owner = getCharacterById(mist.getOwnerId());
                final boolean pvp = owner.inPVP();
                poisonSchedule = tMan.register(new Runnable() {

                    @Override
                    public void run() {
                        for (final MapleMapObject mo : getMapObjectsInRect(mist.getBox(), Collections.singletonList(pvp ? MapleMapObjectType.PLAYER : MapleMapObjectType.MONSTER))) {
                            if (pvp && mist.makeChanceResult() && !((MapleCharacter) mo).hasDOT() && ((MapleCharacter) mo).getId() != mist.getOwnerId()) {
                                ((MapleCharacter) mo).setDOT(mist.getSource().getDOT(), mist.getSourceSkill().getId(), mist.getSkillLevel());
                            } else if (!pvp && mist.makeChanceResult() && !((MapleMonster) mo).isBuffed(MonsterStatus.POISON)) {
                                ((MapleMonster) mo).applyStatus(owner, new MonsterStatusEffect(MonsterStatus.POISON, 1, mist.getSourceSkill().getId(), null, false), true, duration, true, mist.getSource());
                            }
                        }
                    }
                }, 2000, 2500);
                break;
            case 4:
                poisonSchedule = tMan.register(new Runnable() {

                    @Override
                    public void run() {
                        for (final MapleMapObject mo : getMapObjectsInRect(mist.getBox(), Collections.singletonList(MapleMapObjectType.PLAYER))) {
                            if (mist.makeChanceResult()) {
                                final MapleCharacter chr = ((MapleCharacter) mo);
                                chr.addMP((int) (mist.getSource().getX() * (chr.getStat().getMaxMp() / 100.0)));
                            }
                        }
                    }
                }, 2000, 2500);
                break;
            default:
                poisonSchedule = null;
                break;
        }
        mist.setPoisonSchedule(poisonSchedule);
        mist.setSchedule(tMan.schedule(new Runnable() {

            @Override
            public void run() {
                broadcastMessage(EtcPacket.removeMist(mist.getObjectId(), false));
                removeMapObject(mist);
                if (poisonSchedule != null) {
                    poisonSchedule.cancel(false);
                }
            }
        }, duration));
    }

    public final void disappearingItemDrop(final MapleMapObject dropper, final MapleCharacter owner, final Item item, final Point pos) {
        final Point droppos = calcDropPos(pos, pos);
        final MapleMapItem drop = new MapleMapItem(item, droppos, dropper, owner, (byte) 1, false);
        broadcastMessage(EtcPacket.dropItemFromMapObject(drop, dropper.getTruePosition(), droppos, (byte) 3), drop.getTruePosition());
    }

    public final void spawnMesoDrop(final int meso, final Point position, final MapleMapObject dropper, final MapleCharacter owner, final boolean playerDrop, final byte droptype) {
        final Point droppos = calcDropPos(position, position);
        final MapleMapItem mdrop = new MapleMapItem(meso, droppos, dropper, owner, droptype, playerDrop);

        spawnAndAddRangedMapObject(mdrop, new DelayedPacketCreation() {

            @Override
            public void sendPackets(MapleClient c) {
                c.getSession().write(EtcPacket.dropItemFromMapObject(mdrop, dropper.getTruePosition(), droppos, (byte) 1));
            }
        });
        if (!everlast) {
            mdrop.registerExpire(120000);
            if (droptype == 0 || droptype == 1) {
                mdrop.registerFFA(30000);
            }
        }
    }

    public final void spawnMobMesoDrop(final int meso, final Point position, final MapleMapObject dropper, final MapleCharacter owner, final boolean playerDrop, final byte droptype) {
        final MapleMapItem mdrop = new MapleMapItem(meso, position, dropper, owner, droptype, playerDrop);

        spawnAndAddRangedMapObject(mdrop, new DelayedPacketCreation() {

            @Override
            public void sendPackets(MapleClient c) {
                c.getSession().write(EtcPacket.dropItemFromMapObject(mdrop, dropper.getTruePosition(), position, (byte) 1));
            }
        });

        mdrop.registerExpire(120000);
        if (droptype == 0 || droptype == 1) {
            mdrop.registerFFA(30000);
        }
    }

    public final void spawnMobDrop(final Item idrop, final Point dropPos, final MapleMonster mob, final MapleCharacter chr, final byte droptype, final int questid) {
        final MapleMapItem mdrop = new MapleMapItem(idrop, dropPos, mob, chr, droptype, false, questid);

        spawnAndAddRangedMapObject(mdrop, new DelayedPacketCreation() {

            @Override
            public void sendPackets(MapleClient c) {
                if (c != null && c.getPlayer() != null && mob != null && dropPos != null && (c.getPlayer().getQuestStatus(questid) == 1 || c.getPlayer().getMonsterBook().getLevelByCard(idrop.getItemId()) < 2)) {
                    c.getSession().write(EtcPacket.dropItemFromMapObject(mdrop, mob.getTruePosition(), dropPos, (byte) 1));
                }
            }
        });
//	broadcastMessage(CField.dropItemFromMapObject(mdrop, mob.getTruePosition(), dropPos, (byte) 0));

        mdrop.registerExpire(120000);
        if (droptype == 0 || droptype == 1) {
            mdrop.registerFFA(30000);
        }
        activateItemReactors(mdrop, chr.getClient());
    }

    public final void spawnRandDrop() {
        if (mapid != 910000000 || channel != 1) {
            return; //fm, ch1
        }

        mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().lock();
        try {
            for (MapleMapObject o : mapobjects.get(MapleMapObjectType.ITEM).values()) {
                if (((MapleMapItem) o).isRandDrop()) {
                    return;
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().unlock();
        }
        MapTimer.getInstance().schedule(new Runnable() {

            public void run() {
                final Point pos = new Point(Randomizer.nextInt(800) + 531, -806);
                final int theItem = Randomizer.nextInt(1000);
                int itemid = 0;
                if (theItem < 950) { //0-949 = normal, 950-989 = rare, 990-999 = super
                    itemid = GameConstants.normalDrops[Randomizer.nextInt(GameConstants.normalDrops.length)];
                } else if (theItem < 990) {
                    itemid = GameConstants.rareDrops[Randomizer.nextInt(GameConstants.rareDrops.length)];
                } else {
                    itemid = GameConstants.superDrops[Randomizer.nextInt(GameConstants.superDrops.length)];
                }
                spawnAutoDrop(itemid, pos);
            }
        }, 20000);
    }

    public final void spawnAutoDrop(final int itemid, final Point pos) {
        Item idrop = null;
        final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        if (GameConstants.getInventoryType(itemid) == MapleInventoryType.EQUIP) {
            idrop = ii.randomizeStats((Equip) ii.getEquipById(itemid));
        } else {
            idrop = new Item(itemid, (byte) 0, (short) 1, (byte) 0);
        }
        idrop.setGMLog("Dropped from auto " + " on " + mapid);
        final MapleMapItem mdrop = new MapleMapItem(pos, idrop);
        spawnAndAddRangedMapObject(mdrop, new DelayedPacketCreation() {

            @Override
            public void sendPackets(MapleClient c) {
                c.getSession().write(EtcPacket.dropItemFromMapObject(mdrop, pos, pos, (byte) 1));
            }
        });
        broadcastMessage(EtcPacket.dropItemFromMapObject(mdrop, pos, pos, (byte) 0));
        if (itemid / 10000 != 291) {
            mdrop.registerExpire(120000);
        }
    }

    public final void spawnItemDrop(final MapleMapObject dropper, final MapleCharacter owner, final Item item, Point pos, final boolean ffaDrop, final boolean playerDrop) {
        final Point droppos = calcDropPos(pos, pos);
        final MapleMapItem drop = new MapleMapItem(item, droppos, dropper, owner, (byte) 2, playerDrop);

        spawnAndAddRangedMapObject(drop, new DelayedPacketCreation() {

            @Override
            public void sendPackets(MapleClient c) {
                c.getSession().write(EtcPacket.dropItemFromMapObject(drop, dropper.getTruePosition(), droppos, (byte) 1));
            }
        });
        broadcastMessage(EtcPacket.dropItemFromMapObject(drop, dropper.getTruePosition(), droppos, (byte) 0));

        if (!everlast) {
            drop.registerExpire(120000);
            activateItemReactors(drop, owner.getClient());
        }
    }

    private void activateItemReactors(final MapleMapItem drop, final MapleClient c) {
        final Item item = drop.getItem();

        mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().lock();
        try {
            for (final MapleMapObject o : mapobjects.get(MapleMapObjectType.REACTOR).values()) {
                final MapleReactor react = (MapleReactor) o;

                boolean logical;
                int cmapid = c.getPlayer().getMapId();
                    
                if (react.getReactorType() == 100) {
                    if (react.getReactorId() == 2408002) {//設置反應堆ID是2408002的時候
                        logical = item.getItemId() == GameConstants.getCustomReactItem(react.getReactorId(), react.getReactItem().getLeft(), cmapid) && react.getReactItem().getRight() == item.getQuantity();
                    } else {
                        logical = item.getItemId() == GameConstants.getCustomReactItem(react.getReactorId(), react.getReactItem().getLeft()) && react.getReactItem().getRight() == item.getQuantity();
                    }                  
                    if (logical) {
                        if (react.getArea().contains(drop.getTruePosition())) {
                            if (!react.isTimerActive()) {
                                MapTimer.getInstance().schedule(new ActivateItemReactor(drop, react, c), 5000);
                                react.setTimerActive(true);
                                break;
                            }
                        }
                    }
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.REACTOR).readLock().unlock();
        }
    }

    public int getItemsSize() {
        return mapobjects.get(MapleMapObjectType.ITEM).size();
    }

    public int getExtractorSize() {
        return mapobjects.get(MapleMapObjectType.EXTRACTOR).size();
    }

    public int getMobsSize() {
        return mapobjects.get(MapleMapObjectType.MONSTER).size();
    }

    public List<MapleMapItem> getAllItems() {
        return getAllItemsThreadsafe();
    }

    public List<MapleMapItem> getAllItemsThreadsafe() {
        ArrayList<MapleMapItem> ret = new ArrayList<MapleMapItem>();
        mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.ITEM).values()) {
                ret.add((MapleMapItem) mmo);
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().unlock();
        }
        return ret;
    }

    public Point getPointOfItem(int itemid) {
        mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.ITEM).values()) {
                MapleMapItem mm = ((MapleMapItem) mmo);
                if (mm.getItem() != null && mm.getItem().getItemId() == itemid) {
                    return mm.getPosition();
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().unlock();
        }
        return null;
    }

    public List<MapleMist> getAllMistsThreadsafe() {
        ArrayList<MapleMist> ret = new ArrayList<MapleMist>();
        mapobjectlocks.get(MapleMapObjectType.MIST).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.MIST).values()) {
                ret.add((MapleMist) mmo);
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.MIST).readLock().unlock();
        }
        return ret;
    }

    public final void returnEverLastItem(final MapleCharacter chr) {
        for (final MapleMapObject o : getAllItemsThreadsafe()) {
            final MapleMapItem item = ((MapleMapItem) o);
            if (item.getOwner() == chr.getId()) {
                item.setPickedUp(true);
                broadcastMessage(EtcPacket.removeItemFromMap(item.getObjectId(), 2, chr.getId()), item.getTruePosition());
                if (item.getMeso() > 0) {
                    chr.gainMeso(item.getMeso(), false);
                } else {
                    MapleInventoryManipulator.addFromDrop(chr.getClient(), item.getItem(), false);
                }
                removeMapObject(item);
            }
        }
        spawnRandDrop();
    }

    public final void talkMonster(final String msg, final int itemId, final int objectid) {
        if (itemId > 0) {
            startMapEffect(msg, itemId, false);
        }
        broadcastMessage(MobPacket.talkMonster(objectid, itemId, msg)); //5120035
        broadcastMessage(MobPacket.removeTalkMonster(objectid));
    }

    public final void startMapEffect(final String msg, final int itemId) {
        startMapEffect(msg, itemId, false);
    }

    public final void startMapEffect(final String msg, final int itemId, final boolean jukebox) {
        if (mapEffect != null) {
            return;
        }
        mapEffect = new MapleMapEffect(msg, itemId);
        mapEffect.setJukebox(jukebox);
        broadcastMessage(mapEffect.makeStartData());
        MapTimer.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                if (mapEffect != null) {
                    broadcastMessage(mapEffect.makeDestroyData());
                    mapEffect = null;
                }
            }
        }, jukebox ? 300000 : 30000);
    }

    public final void startExtendedMapEffect(final String msg, final int itemId) {
        broadcastMessage(EtcPacket.startMapEffect(msg, itemId, true));
        MapTimer.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                broadcastMessage(EtcPacket.removeMapEffect());
                broadcastMessage(EtcPacket.startMapEffect(msg, itemId, false));
                //dont remove mapeffect.
            }
        }, 60000);
    }

    public final void startSimpleMapEffect(final String msg, final int itemId) {
        broadcastMessage(EtcPacket.startMapEffect(msg, itemId, true));
    }

    public final void startJukebox(final String msg, final int itemId) {
        startMapEffect(msg, itemId, true);
    }

    public final void addPlayer(final MapleCharacter chr) {
        mapobjectlocks.get(MapleMapObjectType.PLAYER).writeLock().lock();
        try {
            mapobjects.get(MapleMapObjectType.PLAYER).put(chr.getObjectId(), chr);
        } finally {
            mapobjectlocks.get(MapleMapObjectType.PLAYER).writeLock().unlock();
        }

        if (chr.isGM()) {
        chr.dropMessage(5, "MAP/" + chr.getMap().getMapName() + chr.getMapId());//地圖ID
        }

        charactersLock.writeLock().lock();
        try {
            characters.add(chr);
        } finally {
            charactersLock.writeLock().unlock();
        }
        chr.setChangeTime();
        if (GameConstants.isTeamMap(mapid) && !chr.inPVP()) {
            chr.setTeam(getAndSwitchTeam() ? 0 : 1);
        }
        final byte[] packet = EtcPacket.spawnPlayerMapobject(chr);
        if (!chr.isHidden()) {
            broadcastMessage(chr, packet, false);
            if (chr.isIntern() && speedRunStart > 0) {
                endSpeedRun();
                broadcastMessage(MaplePacketCreator.serverNotice(5, "The speed run has ended."));
            }
        } else {
            broadcastGMMessage(chr, packet, false);
        }
        if (!chr.isClone()) {
            if (!onFirstUserEnter.equals("")) {
                if (getCharactersSize() == 1) {
                    MapScriptMethods.startScript_FirstUser(chr.getClient(), onFirstUserEnter);
                }
            }
            sendObjectPlacement(chr);

            chr.getClient().getSession().write(packet);

            if (!onUserEnter.equals("")) {
                MapScriptMethods.startScript_User(chr.getClient(), onUserEnter);
            }
            GameConstants.achievementRatio(chr.getClient());
            chr.getClient().getSession().write(EtcPacket.spawnFlags(nodes.getFlags()));
            if (GameConstants.isTeamMap(mapid) && !chr.inPVP()) {
                chr.getClient().getSession().write(EtcPacket.showEquipEffect(chr.getTeam()));
            }
            switch (mapid) {
                case 809000101:
                case 809000201:
                    chr.getClient().getSession().write(EtcPacket.showEquipEffect());
                    break;
                case 689000000:
                case 689000010:
                    chr.getClient().getSession().write(EtcPacket.getCaptureFlags(this));
                    break;
            }
        }
        for (final MaplePet pet : chr.getPets()) {
            if (pet.getSummoned()) {
                pet.setPos(chr.getTruePosition());//過地圖寵物座標
                chr.getClient().getSession().write(PetPacket.showPet(chr, pet, false, false)); 
            }
        }
        if (chr.getSummonedFamiliar() != null) {
            chr.spawnFamiliar(chr.getSummonedFamiliar());
        }
        /*   if (mapid != 3 && mapid != 1 && chr.getLevel() <= 11) {
         chr.setHasSummon(true);
         chr.getClient().getSession().write(UIPacket.summonHelper(true));
         if (mapid == 104000000) {
         chr.dropMessage(5, "신규 모험가 도우미는 Lv.11 까지 모험가님을 돕습니다.");
         chr.getClient().getSession().write(UIPacket.summonMessage(1));
         }
         }
         if (chr.getLevel() >= 11 && chr.hasSummon() == true) {
         chr.setHasSummon(false);
         }
         */
        if (mapid == chr.CMap && chr.getClient().getChannel() != 1) {
            chr.changeChannel(1);
        }
        if (chr.isElf()) {
            chr.changeElf();
        }
        if (chr.checkCT() != null) {
            chr.cancelChair();
        }
        if (chr.getAndroid() != null) {
            chr.getAndroid().setPos(chr.getPosition());
            broadcastMessage(EtcPacket.spawnAndroid(chr, chr.getAndroid()));
        }
        if (chr.getParty() != null && !chr.isClone()) {
            chr.silentPartyUpdate();
            chr.getClient().getSession().write(PartyPacket.updateParty(chr.getClient().getChannel(), chr.getParty(), PartyOperation.SILENT_UPDATE, null));
            chr.updatePartyMemberHP();
            chr.receivePartyMemberHP();
        }

        if (QuickMove.getQuickMoves(mapid) != null) {
            chr.getClient().getSession().write(EtcPacket.getQuickMove(QuickMove.getQuickMoves(mapid)));
            chr.setQuickMoved(true);
        }

        if (!chr.isClone()) {
            final List<MapleSummon> ss = chr.getSummonsReadLock();
            try {
                for (MapleSummon summon : ss) {
                    summon.setPosition(chr.getTruePosition());
                    chr.addVisibleMapObject(summon);
                    this.spawnSummon(summon);
                }
            } finally {
                chr.unlockSummonsReadLock();
            }
        }
        if (mapEffect != null) {
            mapEffect.sendStartData(chr.getClient());
        }
        if (timeLimit > 0 && getForcedReturnMap() != null && !chr.isClone()) {
            chr.startMapTimeLimitTask(timeLimit, getForcedReturnMap());
        }
        if (chr.getBuffedValue(MapleBuffStat.MONSTER_RIDING) != null && !GameConstants.isResist(chr.getJob())) {
            if (FieldLimitType.Mount.check(fieldLimit)) {
                chr.cancelEffectFromBuffStat(MapleBuffStat.MONSTER_RIDING);
            }
        }
        if (!chr.isClone()) {
            if (chr.getEventInstance() != null && chr.getEventInstance().isTimerStarted() && !chr.isClone()) {
                if (chr.inPVP()) {
                    chr.getClient().getSession().write(EtcPacket.getPVPClock(Integer.parseInt(chr.getEventInstance().getProperty("type")), (int) (chr.getEventInstance().getTimeLeft() / 1000)));
                } else {
                    chr.getClient().getSession().write(EtcPacket.getClock((int) (chr.getEventInstance().getTimeLeft() / 1000)));
                }
            }
            if (hasClock()) {
                final Calendar cal = Calendar.getInstance();
                chr.getClient().getSession().write((EtcPacket.getClockTime(cal.get(Calendar.HOUR_OF_DAY), cal.get(Calendar.MINUTE), cal.get(Calendar.SECOND))));
            }
            if (chr.getCarnivalParty() != null && chr.getEventInstance() != null) {
                chr.getEventInstance().onMapLoad(chr);
            }
            MapleEvent.mapLoad(chr, channel);
            if (getSquadBegin() != null && getSquadBegin().getTimeLeft() > 0 && getSquadBegin().getStatus() == 1) {
                chr.getClient().getSession().write(EtcPacket.getClock((int) (getSquadBegin().getTimeLeft() / 1000)));
            }
            if (mapid / 1000 != 105100 && mapid / 100 != 8020003 && mapid / 100 != 8020008 && mapid != 271040100) { //no boss_balrog/2095/coreblaze/auf/cygnus. but coreblaze/auf/cygnus does AFTER
                final MapleSquad sqd = getSquadByMap(); //for all squads
                final EventManager em = getEMByMap();
                if (!squadTimer && sqd != null && chr.getName().equals(sqd.getLeaderName()) && em != null && em.getProperty("leader") != null && em.getProperty("leader").equals("true") && checkStates) {
                    //leader? display
                    squadTimer = true;
                }
            }
            if (getNumMonsters() > 0 && (mapid == 280030001 || mapid == 240060201 || mapid == 280030000 || mapid == 240060200 || mapid == 220080001 || mapid == 541020800 || mapid == 541010100)) {
                String music = "Bgm09/TimeAttack";
                switch (mapid) {
                    case 240060200:
                    case 240060201:
                        music = "Bgm14/HonTale";
                        break;
                    case 280030000:
                    case 280030001:
                        music = "Bgm06/FinalFight";
                        break;
                }
                chr.getClient().getSession().write(EtcPacket.musicChange(music));
                //maybe timer too for zak/ht
            }
            for (final WeakReference<MapleCharacter> chrz : chr.getClones()) {
                if (chrz.get() != null) {
                    chrz.get().setPosition(chr.getTruePosition());
                    chrz.get().setMap(this);
                    addPlayer(chrz.get());
                }
            }
            if (mapid == 914000000 || (mapid >= 927000000 && mapid <= 927000070) || (mapid >= 910150000 && mapid <= 910150003)) {//添加精靈遊俠演示屬性
                chr.getClient().getSession().write(MaplePacketCreator.temporaryStats_Aran());
            } else if (mapid == 105100300 && chr.getLevel() >= 91) {
                chr.getClient().getSession().write(MaplePacketCreator.temporaryStats_Balrog(chr));
            } else if (mapid == 140090000 || mapid == 931050030 || mapid == 910150004 || mapid == 105100301 || mapid == 105100401 || mapid == 105100100) {//添加關閉精靈遊俠，惡魔演示屬性
                chr.getClient().getSession().write(MaplePacketCreator.temporaryStats_Reset());
            }
        }
        if (GameConstants.isEvan(chr.getJob()) && chr.getJob() >= 2200) {
            if (chr.getDragon() == null) {
                chr.makeDragon();
            } else {
                chr.getDragon().setPosition(chr.getPosition());
            }
            if (chr.getDragon() != null) {
                broadcastMessage(EtcPacket.spawnDragon(chr.getDragon()));
            }
        }
        if ((mapid == 10000 && chr.getJob() == 0) || (mapid == 130030000 && chr.getJob() == 1000) || (mapid == 914000000 && chr.getJob() == 2000) || (mapid == 900010000 && chr.getJob() == 2001) || (mapid == 931000000 && chr.getJob() == 3000)) {
            chr.dropMessage(5, "Your EXP Rate will be set to " + GameConstants.getExpRateByLevel(chr.getLevel(), channel) + "x until you reach level 10. (Currently normal rates)");
            chr.dropMessage(-1, "Your EXP Rate will be set to " + GameConstants.getExpRateByLevel(chr.getLevel(), channel) + "x until you reach level 10. (Currently normal rates)");
        }
        if (permanentWeather > 0) {
            chr.getClient().getSession().write(EtcPacket.startMapEffect("", permanentWeather, false)); //snow, no msg
        }
        if (getPlatforms().size() > 0) {
            chr.getClient().getSession().write(EtcPacket.getMovingPlatforms(this));
        }
        if (environment.size() > 0) {
            chr.getClient().getSession().write(EtcPacket.getUpdateEnvironment(this));
        }
        //if (partyBonusRate > 0) {
        //    chr.dropMessage(-1, partyBonusRate + "% additional EXP will be applied per each party member here.");
        //    chr.dropMessage(-1, "You've entered the party play zone.");
        //}
        if (isTown()) {
            chr.cancelEffectFromBuffStat(MapleBuffStat.RAINING_MINES);
        }
        if (!canSoar()) {
            chr.cancelEffectFromBuffStat(MapleBuffStat.SOARING);
        }
        if (chr.getJob() < 3200 || chr.getJob() > 3212) {
            chr.cancelEffectFromBuffStat(MapleBuffStat.AURA);
        }
        int inmap[] = {200110000, 200110001, 200110010, 200110011, 200110020, 200110021, 200110030, 200110031, 200110040, 200110041, 200110050, 200110051, 200110060, 200110061, 200110070, 200110071};
        int tomap[] = {200000111, 104020110, 200000100, 240000110, 200000121, 220000110, 200000151, 260000100, 200000141, 250000100, 200000170, 310000010, 200000161, 130000210, 310000010, 104020130};
        int Buff = chr.getBuffSource(MapleBuffStat.WDEF);
        int Time = (Buff == 80001027) ? (3 * 60 * 1000) : (2 * 60 * 1000);//設置不能超過4分鐘
            for (int i = 0; i < inmap.length; i++)
            if (chr.getMapId() == inmap[i]) {
                int y = i;

                chr.getClient().getSession().write(EtcPacket.getClock(Time / 1000));

                Timer.PingTimer.getInstance().schedule(new Runnable() {

            @Override
            public void run() {

                        final MapleMap to = ChannelServer.getInstance(1).getMapFactory().getMap(tomap[y]);
                        chr.changeMap(to, to.getPortal(0));
                        }
                    }, Time);
                }
            }

    public int getNumItems() {
        mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().lock();
        try {
            return mapobjects.get(MapleMapObjectType.ITEM).size();
        } finally {
            mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().unlock();
        }
    }

    public int getNumMonsters() {
        mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().lock();
        try {
            return mapobjects.get(MapleMapObjectType.MONSTER).size();
        } finally {
            mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().unlock();
        }
    }

    public final MapleSquad getSquadByMap() {
        MapleSquadType zz = null;
        switch (mapid) {
            case 105100400:
            case 105100300:
                zz = MapleSquadType.bossbalrog;
                break;
            case 280030000:
                zz = MapleSquadType.zak;
                break;
            case 280030001:
                zz = MapleSquadType.chaoszak;
                break;
            case 240060000:
            case 240060100:
            case 240060200:
                zz = MapleSquadType.horntail;
                break;
            case 240060001:
            case 240060101:
            case 240060201:
                zz = MapleSquadType.chaosht;
                break;
            case 270050100:
                zz = MapleSquadType.pinkbean;
                break;
            case 802000111:
                zz = MapleSquadType.nmm_squad;
                break;
            case 802000211:
                zz = MapleSquadType.vergamot;
                break;
            case 802000311:
                zz = MapleSquadType.tokyo_2095;
                break;
            case 802000411:
                zz = MapleSquadType.dunas;
                break;
            case 802000611:
                zz = MapleSquadType.nibergen_squad;
                break;
            case 802000711:
                zz = MapleSquadType.dunas2;
                break;
            case 802000801:
            case 802000802:
            case 802000803:
                zz = MapleSquadType.core_blaze;
                break;
            case 802000821:
            case 802000823:
                zz = MapleSquadType.aufheben;
                break;
            case 211070100:
            case 211070101:
            case 211070110:
                zz = MapleSquadType.vonleon;
                break;
            case 551030200:
                zz = MapleSquadType.scartar;
                break;
            case 271040100:
                zz = MapleSquadType.cygnus;
                break;
            case 272020200:
                zz = MapleSquadType.arkarium;
                break;
            case 801040100:
                zz = MapleSquadType.showa;
                break;
            default:
                return null;
        }
        return ChannelServer.getInstance(channel).getMapleSquad(zz);
    }

    public final MapleSquad getSquadBegin() {
        if (squad != null) {
            return ChannelServer.getInstance(channel).getMapleSquad(squad);
        }
        return null;
    }

    public final EventManager getEMByMap() {
        String em = null;
        switch (mapid) {
            case 105100400:
                em = "BossBalrog_EASY";
                break;
            case 105100300:
                em = "BossBalrog_NORMAL";
                break;
            case 280030000:
                em = "ZakumBattle";
                break;
            case 240060000:
            case 240060100:
            case 240060200:
                em = "HorntailBattle";
                break;
            case 280030001:
                em = "ChaosZakum";
                break;
            case 240060001:
            case 240060101:
            case 240060201:
                em = "ChaosHorntail";
                break;
            case 270050100:
                em = "PinkBeanBattle";
                break;
            case 802000111:
                em = "NamelessMagicMonster";
                break;
            case 802000211:
                em = "Vergamot";
                break;
            case 802000311:
                em = "2095_tokyo";
                break;
            case 802000411:
                em = "Dunas";
                break;
            case 802000611:
                em = "Nibergen";
                break;
            case 802000711:
                em = "Dunas2";
                break;
            case 802000801:
            case 802000802:
            case 802000803:
                em = "CoreBlaze";
                break;
            case 802000821:
            case 802000823:
                em = "Aufhaven";
                break;
            case 211070100:
            case 211070101:
            case 211070110:
                em = "VonLeonBattle";
                break;
            case 551030200:
                em = "ScarTarBattle";
                break;
            case 271040100:
                em = "CygnusBattle";
                break;
            case 272020200:
                em = "ArkariumBattle";
                break;
            case 801040100:
                em = "ShowaBattle";
                break;
            default:
                return null;
        }
        return ChannelServer.getInstance(channel).getEventSM().getEventManager(em);
    }

    public final void removePlayer(final MapleCharacter chr) {
        //log.warn("[dc] [level2] Player {} leaves map {}", new Object[] { chr.getName(), mapid });

        if (everlast) {
            returnEverLastItem(chr);
        }

        charactersLock.writeLock().lock();
        try {
            characters.remove(chr);
        } finally {
            charactersLock.writeLock().unlock();
        }
        removeMapObject(chr);
        chr.checkFollow();
        if (chr.getExtractor() != null) {
            chr.removeExtractor();
            chr.setExtractor(null);
            chr.dropMessage(5, "The decomposition machine in this area has been removed.");
        }
        broadcastMessage(EtcPacket.removePlayerFromMap(chr.getId()));

        if (chr.getSummonedFamiliar() != null) {
            chr.removeVisibleFamiliar();
        }
        List<MapleSummon> toCancel = new ArrayList<MapleSummon>();
        final List<MapleSummon> ss = chr.getSummonsReadLock();
        try {
            for (final MapleSummon summon : ss) {
                broadcastMessage(SummonPacket.removeSummon(summon, true));
                removeMapObject(summon);
                if (summon.getMovementType() == SummonMovementType.STATIONARY || summon.getMovementType() == SummonMovementType.CIRCLE_STATIONARY || summon.getMovementType() == SummonMovementType.WALK_STATIONARY) {
                    toCancel.add(summon);
                } else {
                    summon.setChangedMap(true);
                }
            }
        } finally {
            chr.unlockSummonsReadLock();
        }
        for (MapleSummon summon : toCancel) {
            chr.removeSummon(summon);
            chr.dispelSkill(summon.getSkill()); //remove the buff
        }
        if (!chr.isClone()) {
            checkStates(chr.getName());
            if (mapid == 109020001) {
                chr.canTalk(true);
            }
            for (final WeakReference<MapleCharacter> chrz : chr.getClones()) {
                if (chrz.get() != null) {
                    removePlayer(chrz.get());
                }
            }
            chr.leaveMap(this);
        }
    }

    public final void broadcastMessage(final byte[] packet) {
        broadcastMessage(null, packet, Double.POSITIVE_INFINITY, null);
    }

    public final void broadcastMessage(final MapleCharacter source, final byte[] packet, final boolean repeatToSource) {
        broadcastMessage(repeatToSource ? null : source, packet, Double.POSITIVE_INFINITY, source.getTruePosition());
    }

    /*	public void broadcastMessage(MapleCharacter source, byte[] packet, boolean repeatToSource, boolean ranged) {
     broadcastMessage(repeatToSource ? null : source, packet, ranged ? MapleCharacter.MAX_VIEW_RANGE_SQ : Double.POSITIVE_INFINITY, source.getPosition());
     }*/
    public final void broadcastMessage(final byte[] packet, final Point rangedFrom) {
        broadcastMessage(null, packet, GameConstants.maxViewRangeSq(), rangedFrom);
    }

    public final void broadcastMessage(final MapleCharacter source, final byte[] packet, final Point rangedFrom) {
        broadcastMessage(source, packet, GameConstants.maxViewRangeSq(), rangedFrom);
    }

    public void broadcastMessage(final MapleCharacter source, final byte[] packet, final double rangeSq, final Point rangedFrom) {
        charactersLock.readLock().lock();
        try {
            for (MapleCharacter chr : characters) {
                if (chr != source) {
                    if (rangeSq < Double.POSITIVE_INFINITY) {
                        if (rangedFrom.distanceSq(chr.getTruePosition()) <= rangeSq) {
                            chr.getClient().getSession().write(packet);
                        }
                    } else {
                        chr.getClient().getSession().write(packet);
                    }
                }
            }
        } finally {
            charactersLock.readLock().unlock();
        }
    }

    private void sendObjectPlacement(final MapleCharacter c) {
        if (c == null || c.isClone()) {
            return;
        }
        for (final MapleMapObject o : getMapObjectsInRange(c.getTruePosition(), c.getRange(), GameConstants.rangedMapobjectTypes)) {
            if (o.getType() == MapleMapObjectType.REACTOR) {
                if (!((MapleReactor) o).isAlive()) {
                    continue;
                }
            }
            o.sendSpawnData(c.getClient());
            c.addVisibleMapObject(o);
        }
    }

    public final List<MaplePortal> getPortalsInRange(final Point from, final double rangeSq) {
        final List<MaplePortal> ret = new ArrayList<MaplePortal>();
        for (MaplePortal type : portals.values()) {
            if (from.distanceSq(type.getPosition()) <= rangeSq && type.getTargetMapId() != mapid && type.getTargetMapId() != 999999999) {
                ret.add(type);
            }
        }
        return ret;
    }

    public final List<MapleMapObject> getMapObjectsInRange(final Point from, final double rangeSq) {
        final List<MapleMapObject> ret = new ArrayList<MapleMapObject>();
        for (MapleMapObjectType type : MapleMapObjectType.values()) {
            mapobjectlocks.get(type).readLock().lock();
            try {
                Iterator<MapleMapObject> itr = mapobjects.get(type).values().iterator();
                while (itr.hasNext()) {
                    MapleMapObject mmo = itr.next();
                    if (from.distanceSq(mmo.getTruePosition()) <= rangeSq) {
                        ret.add(mmo);
                    }
                }
            } finally {
                mapobjectlocks.get(type).readLock().unlock();
            }
        }
        return ret;
    }

    public List<MapleMapObject> getItemsInRange(Point from, double rangeSq) {
        return getMapObjectsInRange(from, rangeSq, Arrays.asList(MapleMapObjectType.ITEM));
    }

    public final List<MapleMapObject> getMapObjectsInRange(final Point from, final double rangeSq, final List<MapleMapObjectType> MapObject_types) {
        final List<MapleMapObject> ret = new ArrayList<MapleMapObject>();
        for (MapleMapObjectType type : MapObject_types) {
            mapobjectlocks.get(type).readLock().lock();
            try {
                Iterator<MapleMapObject> itr = mapobjects.get(type).values().iterator();
                while (itr.hasNext()) {
                    MapleMapObject mmo = itr.next();
                    if (from.distanceSq(mmo.getTruePosition()) <= rangeSq) {
                        ret.add(mmo);
                    }
                }
            } finally {
                mapobjectlocks.get(type).readLock().unlock();
            }
        }
        return ret;
    }

    public final List<MapleMapObject> getMapObjectsInRect(final Rectangle box, final List<MapleMapObjectType> MapObject_types) {
        final List<MapleMapObject> ret = new ArrayList<MapleMapObject>();
        for (MapleMapObjectType type : MapObject_types) {
            mapobjectlocks.get(type).readLock().lock();
            try {
                Iterator<MapleMapObject> itr = mapobjects.get(type).values().iterator();
                while (itr.hasNext()) {
                    MapleMapObject mmo = itr.next();
                    if (box.contains(mmo.getTruePosition())) {
                        ret.add(mmo);
                    }
                }
            } finally {
                mapobjectlocks.get(type).readLock().unlock();
            }
        }
        return ret;
    }

    public final List<MapleCharacter> getCharactersIntersect(final Rectangle box) {
        final List<MapleCharacter> ret = new ArrayList<MapleCharacter>();
        charactersLock.readLock().lock();
        try {
            for (MapleCharacter chr : characters) {
                if (chr.getBounds().intersects(box)) {
                    ret.add(chr);
                }
            }
        } finally {
            charactersLock.readLock().unlock();
        }
        return ret;
    }

    public final List<MapleCharacter> getPlayersInRectAndInList(final Rectangle box, final List<MapleCharacter> chrList) {
        final List<MapleCharacter> character = new LinkedList<MapleCharacter>();

        charactersLock.readLock().lock();
        try {
            final Iterator<MapleCharacter> ltr = characters.iterator();
            MapleCharacter a;
            while (ltr.hasNext()) {
                a = ltr.next();
                if (chrList.contains(a) && box.contains(a.getTruePosition())) {
                    character.add(a);
                }
            }
        } finally {
            charactersLock.readLock().unlock();
        }
        return character;
    }

    public final void addPortal(final MaplePortal myPortal) {
        portals.put(myPortal.getId(), myPortal);
    }

    public final MaplePortal getPortal(final String portalname) {
        for (final MaplePortal port : portals.values()) {
            if (port.getName().equals(portalname)) {
                return port;
            }
        }
        return null;
    }

    public final MaplePortal getPortal(final int portalid) {
        return portals.get(portalid);
    }

    public final void resetPortals() {
        for (final MaplePortal port : portals.values()) {
            port.setPortalState(true);
        }
    }

    public final void setFootholds(final MapleFootholdTree footholds) {
        this.footholds = footholds;
    }

    public final MapleFootholdTree getFootholds() {
        return footholds;
    }

    public final int getNumSpawnPoints() {
        return monsterSpawn.size();
    }

    public final void loadMonsterRate(final boolean first) {
        final int spawnSize = monsterSpawn.size();
        if (spawnSize >= 20 || partyBonusRate > 0) {
            maxRegularSpawn = Math.round(spawnSize / monsterRate);
        } else {
            maxRegularSpawn = (int) Math.ceil(spawnSize * monsterRate);
        }
        if (fixedMob > 0) {
            maxRegularSpawn = fixedMob;
        } else if (maxRegularSpawn <= 2) {
            maxRegularSpawn = 2;
        } else if (maxRegularSpawn > spawnSize) {
            maxRegularSpawn = Math.max(10, spawnSize);
        }

        Collection<Spawns> newSpawn = new LinkedList<Spawns>();
        Collection<Spawns> newBossSpawn = new LinkedList<Spawns>();
        for (final Spawns s : monsterSpawn) {
            if (s.getCarnivalTeam() >= 2) {
                continue; // Remove carnival spawned mobs
            }
            if (s.getMonster().isBoss()) {
                newBossSpawn.add(s);
            } else {
                newSpawn.add(s);
            }
        }
        monsterSpawn.clear();
        monsterSpawn.addAll(newBossSpawn);
        monsterSpawn.addAll(newSpawn);

        if (first && spawnSize > 0) {
            lastSpawnTime = System.currentTimeMillis();
            if (GameConstants.isForceRespawn(mapid)) {
                createMobInterval = 15000;
            }
            respawn(false); // this should do the trick, we don't need to wait upon entering map
        }
    }

    public final SpawnPoint addMonsterSpawn(final MapleMonster monster, final int mobTime, final byte carnivalTeam, final String msg) {
        final Point newpos = calcPointBelow(monster.getPosition());
        newpos.y -= 1;
        final SpawnPoint sp = new SpawnPoint(monster, newpos, mobTime, carnivalTeam, msg);
        if (carnivalTeam > -1) {
            monsterSpawn.add(0, sp); //at the beginning
        } else {
            monsterSpawn.add(sp);
        }
        return sp;
    }

    public final void addAreaMonsterSpawn(final MapleMonster monster, Point pos1, Point pos2, Point pos3, final int mobTime, final String msg, final boolean shouldSpawn) {
        pos1 = calcPointBelow(pos1);
        pos2 = calcPointBelow(pos2);
        pos3 = calcPointBelow(pos3);
        if (pos1 != null) {
            pos1.y -= 1;
        }
        if (pos2 != null) {
            pos2.y -= 1;
        }
        if (pos3 != null) {
            pos3.y -= 1;
        }
        if (pos1 == null && pos2 == null && pos3 == null) {
            System.out.println("WARNING: mapid " + mapid + ", monster " + monster.getId() + " could not be spawned.");

            return;
        } else if (pos1 != null) {
            if (pos2 == null) {
                pos2 = new Point(pos1);
            }
            if (pos3 == null) {
                pos3 = new Point(pos1);
            }
        } else if (pos2 != null) {
            if (pos1 == null) {
                pos1 = new Point(pos2);
            }
            if (pos3 == null) {
                pos3 = new Point(pos2);
            }
        } else if (pos3 != null) {
            if (pos1 == null) {
                pos1 = new Point(pos3);
            }
            if (pos2 == null) {
                pos2 = new Point(pos3);
            }
        }
        monsterSpawn.add(new SpawnPointAreaBoss(monster, pos1, pos2, pos3, mobTime, msg, shouldSpawn));
    }

    public final List<MapleCharacter> getCharacters() {
        return getCharactersThreadsafe();
    }

    public final List<MapleCharacter> getCharactersThreadsafe() {
        final List<MapleCharacter> chars = new ArrayList<MapleCharacter>();

        charactersLock.readLock().lock();
        try {
            for (MapleCharacter mc : characters) {
                chars.add(mc);
            }
        } finally {
            charactersLock.readLock().unlock();
        }
        return chars;
    }

    public final MapleCharacter getCharacterByName(final String id) {
        charactersLock.readLock().lock();
        try {
            for (MapleCharacter mc : characters) {
                if (mc.getName().equalsIgnoreCase(id)) {
                    return mc;
                }
            }
        } finally {
            charactersLock.readLock().unlock();
        }
        return null;
    }

    public final MapleCharacter getCharacterById_InMap(final int id) {
        return getCharacterById(id);
    }

    public final MapleCharacter getCharacterById(final int id) {
        charactersLock.readLock().lock();
        try {
            for (MapleCharacter mc : characters) {
                if (mc.getId() == id) {
                    return mc;
                }
            }
        } finally {
            charactersLock.readLock().unlock();
        }
        return null;
    }

    public final void updateMapObjectVisibility(final MapleCharacter chr, final MapleMapObject mo) {
        if (chr == null || chr.isClone()) {
            return;
        }
        if (!chr.isMapObjectVisible(mo)) { // monster entered view range
            if (mo.getType() == MapleMapObjectType.MIST || mo.getType() == MapleMapObjectType.EXTRACTOR || mo.getType() == MapleMapObjectType.SUMMON || mo.getType() == MapleMapObjectType.FAMILIAR || mo instanceof MechDoor || mo.getTruePosition().distanceSq(chr.getTruePosition()) <= mo.getRange()) {
                chr.addVisibleMapObject(mo);
                mo.sendSpawnData(chr.getClient());
            }
        } else { // monster left view range
            if (!(mo instanceof MechDoor) && mo.getType() != MapleMapObjectType.MIST && mo.getType() != MapleMapObjectType.EXTRACTOR && mo.getType() != MapleMapObjectType.SUMMON && mo.getType() != MapleMapObjectType.FAMILIAR && mo.getTruePosition().distanceSq(chr.getTruePosition()) > mo.getRange()) {
                chr.removeVisibleMapObject(mo);
                mo.sendDestroyData(chr.getClient());
            } else if (mo.getType() == MapleMapObjectType.MONSTER) { //monster didn't leave view range, and is visible
            //    if (chr.getTruePosition().distanceSq(mo.getTruePosition()) <= GameConstants.maxViewRangeSq_Half()) {
                    updateMonsterController((MapleMonster) mo);
            //    }
            }
        }
    }

    public void moveMonster(MapleMonster monster, Point reportedPos) {
        monster.setPosition(reportedPos);

        charactersLock.readLock().lock();
        try {
            for (MapleCharacter mc : characters) {
                updateMapObjectVisibility(mc, monster);
            }
        } finally {
            charactersLock.readLock().unlock();
        }
    }

    public void movePlayer(final MapleCharacter player, final Point newPosition) {
        player.setPosition(newPosition);
        if (!player.isClone()) {
            try {
                Collection<MapleMapObject> visibleObjects = player.getAndWriteLockVisibleMapObjects();
                ArrayList<MapleMapObject> copy = new ArrayList<MapleMapObject>(visibleObjects);
                Iterator<MapleMapObject> itr = copy.iterator();
                while (itr.hasNext()) {
                    MapleMapObject mo = itr.next();
                    if (mo != null && getMapObject(mo.getObjectId(), mo.getType()) == mo) {
                        updateMapObjectVisibility(player, mo);
                    } else if (mo != null) {
                        visibleObjects.remove(mo);
                    }
                }
                for (MapleMapObject mo : getMapObjectsInRange(player.getTruePosition(), player.getRange())) {
                    if (mo != null && !visibleObjects.contains(mo)) {
                        mo.sendSpawnData(player.getClient());
                        visibleObjects.add(mo);
                    }
                }
            } finally {
                player.unlockWriteVisibleMapObjects();
            }
        }
    }

    public MaplePortal findClosestSpawnpoint(Point from) {
        MaplePortal closest = getPortal(0);
        double distance, shortestDistance = Double.POSITIVE_INFINITY;
        for (MaplePortal portal : portals.values()) {
            distance = portal.getPosition().distanceSq(from);
            if (portal.getType() >= 0 && portal.getType() <= 2 && distance < shortestDistance && portal.getTargetMapId() == 999999999) {
                closest = portal;
                shortestDistance = distance;
            }
        }
        return closest;
    }

    public MaplePortal findClosestPortal(Point from) {
        MaplePortal closest = getPortal(0);
        double distance, shortestDistance = Double.POSITIVE_INFINITY;
        for (MaplePortal portal : portals.values()) {
            distance = portal.getPosition().distanceSq(from);
            if (distance < shortestDistance) {
                closest = portal;
                shortestDistance = distance;
            }
        }
        return closest;
    }

    public String spawnDebug() {
        StringBuilder sb = new StringBuilder("Mobs in map : ");
        sb.append(this.getMobsSize());
        sb.append(" spawnedMonstersOnMap: ");
        sb.append(spawnedMonstersOnMap);
        sb.append(" spawnpoints: ");
        sb.append(monsterSpawn.size());
        sb.append(" maxRegularSpawn: ");
        sb.append(maxRegularSpawn);
        sb.append(" actual monsters: ");
        sb.append(getNumMonsters());
        sb.append(" monster rate: ");
        sb.append(monsterRate);
        sb.append(" fixed: ");
        sb.append(fixedMob);

        return sb.toString();
    }

    public int characterSize() {
        return characters.size();
    }

    public final int getMapObjectSize() {
        return mapobjects.size() + getCharactersSize() - characters.size();
    }

    public final int getCharactersSize() {
        int ret = 0;
        charactersLock.readLock().lock();
        try {
            final Iterator<MapleCharacter> ltr = characters.iterator();
            MapleCharacter chr;
            while (ltr.hasNext()) {
                chr = ltr.next();
                if (!chr.isClone()) {
                    ret++;
                }
            }
        } finally {
            charactersLock.readLock().unlock();
        }
        return ret;
    }

    public Collection<MaplePortal> getPortals() {
        return Collections.unmodifiableCollection(portals.values());
    }

    public int getSpawnedMonstersOnMap() {
        return spawnedMonstersOnMap.get();
    }

    private class ActivateItemReactor implements Runnable {

        private MapleMapItem mapitem;
        private MapleReactor reactor;
        private MapleClient c;

        public ActivateItemReactor(MapleMapItem mapitem, MapleReactor reactor, MapleClient c) {
            this.mapitem = mapitem;
            this.reactor = reactor;
            this.c = c;
        }

        @Override
        public void run() {
            if (mapitem != null && mapitem == getMapObject(mapitem.getObjectId(), mapitem.getType()) && !mapitem.isPickedUp()) {
                mapitem.expire(MapleMap.this);
                reactor.hitReactor(c);
                reactor.setTimerActive(false);

                if (reactor.getDelay() > 0) {
                    MapTimer.getInstance().schedule(new Runnable() {

                        @Override
                        public void run() {
                            reactor.forceHitReactor((byte) 0);
                        }
                    }, reactor.getDelay());
                }
            } else {
                reactor.setTimerActive(false);
            }
        }
    }

    public void respawn(final boolean force) {
        respawn(force, System.currentTimeMillis());
    }

    public void respawn(final boolean force, final long now) { //몬스터 리젠 설정
        lastSpawnTime = now;
        if (force) { //cpq quick hack
            final int numShouldSpawn = monsterSpawn.size() - spawnedMonstersOnMap.get();

            if (numShouldSpawn > 0) {
                int spawned = 0;

                for (Spawns spawnPoint : monsterSpawn) {
                    spawnPoint.spawnMonster(this);
                    spawned++;
                    if (spawned >= numShouldSpawn) {
                        break;
                    }
                }
            }
        } else { //調整外星人區域最大怪物數量
            final int numShouldSpawn = (GameConstants.isForceRespawn(mapid) ? monsterSpawn.size() : (maxRegularSpawn / (((mapid >= 600010100 && mapid <= 600010700) || (mapid >= 610040000 && mapid <= 610040300)) ? 2 : 1)) * (ServerConstants.monsterSpawn ? 7 : 1)) - spawnedMonstersOnMap.get();
            if (numShouldSpawn > 0) {
                int spawned = 0;

                final List<Spawns> randomSpawn = new ArrayList<Spawns>(monsterSpawn);
                Collections.shuffle(randomSpawn);

                for (Spawns spawnPoint : randomSpawn) {
                    if (!isSpawns && spawnPoint.getMobTime() > 0) {
                        continue;
                    }
                    if (spawnPoint.shouldSpawn(lastSpawnTime) || GameConstants.isForceRespawn(mapid) || (monsterSpawn.size() < 10 && maxRegularSpawn * (ServerConstants.monsterSpawn ? 5 : 1) > monsterSpawn.size() && partyBonusRate > 0)) {
                        spawnPoint.spawnMonster(this);
                        spawned++;
                    }
                    if (spawned >= numShouldSpawn) {
                        break;
                    }
                }
            }
        }
    }

    private static interface DelayedPacketCreation {

        void sendPackets(MapleClient c);
    }

    public String getSnowballPortal() {
        int[] teamss = new int[2];
        charactersLock.readLock().lock();
        try {
            for (MapleCharacter chr : characters) {
                if (chr.getTruePosition().y > -80) {
                    teamss[0]++;
                } else {
                    teamss[1]++;
                }
            }
        } finally {
            charactersLock.readLock().unlock();
        }
        if (teamss[0] > teamss[1]) {
            return "st01";
        } else {
            return "st00";
        }
    }

    public boolean isDisconnected(int id) {
        return dced.contains(Integer.valueOf(id));
    }

    public void addDisconnected(int id) {
        dced.add(Integer.valueOf(id));
    }

    public void resetDisconnected() {
        dced.clear();
    }

    public void startSpeedRun() {
        final MapleSquad squad = getSquadByMap();
        if (squad != null) {
            charactersLock.readLock().lock();
            try {
                for (MapleCharacter chr : characters) {
                    if (chr.getName().equals(squad.getLeaderName()) && !chr.isIntern()) {
                        startSpeedRun(chr.getName());
                        return;
                    }
                }
            } finally {
                charactersLock.readLock().unlock();
            }
        }
    }

    public void startSpeedRun(String leader) {
        speedRunStart = System.currentTimeMillis();
        speedRunLeader = leader;
    }

    public void endSpeedRun() {
        speedRunStart = 0;
        speedRunLeader = "";
    }

    public void getRankAndAdd(String leader, String time, ExpeditionType type, long timz, Collection<String> squad) {
        try {
            long lastTime = SpeedRunner.getSpeedRunData(type) == null ? 0 : SpeedRunner.getSpeedRunData(type).right;
            StringBuilder rett = new StringBuilder();
            if (squad != null) {
                for (String chr : squad) {
                    rett.append(chr);
                    rett.append(",");
                }
            }
            String z = rett.toString();
            if (squad != null) {
                z = z.substring(0, z.length() - 1);
            }
            Connection con = null;
            PreparedStatement ps = null;
            try {
            con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("INSERT INTO speedruns(`type`, `leader`, `timestring`, `time`, `members`) VALUES (?,?,?,?,?)");
            ps.setString(1, type.name());
            ps.setString(2, leader);
            ps.setString(3, time);
            ps.setLong(4, timz);
            ps.setString(5, z);
            ps.executeUpdate();
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                if (ps != null) {
                    try {
                        ps.close();
                    } catch (Exception e) {
                    }
                }
            }

            if (lastTime == 0) {
                SpeedRunner.addSpeedRunData(type, SpeedRunner.addSpeedRunData(new StringBuilder(SpeedRunner.getPreamble(type)), new HashMap<Integer, String>(), z, leader, 1, time), timz);
            } else {
                SpeedRunner.removeSpeedRunData(type);
                SpeedRunner.loadSpeedRunData(type);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public long getSpeedRunStart() {
        return speedRunStart;
    }

    public final void disconnectAll() {
        for (MapleCharacter chr : getCharactersThreadsafe()) {
            if (!chr.isGM()) {
                chr.getClient().disconnect(true, false);
                chr.getClient().getSession().close();
            }
        }
    }

    public List<MapleNPC> getAllNPCs() {
        return getAllNPCsThreadsafe();
    }

    public List<MapleNPC> getAllNPCsThreadsafe() {
        ArrayList<MapleNPC> ret = new ArrayList<MapleNPC>();
        mapobjectlocks.get(MapleMapObjectType.NPC).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.NPC).values()) {
                ret.add((MapleNPC) mmo);
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.NPC).readLock().unlock();
        }
        return ret;
    }

    public final void resetNPCs() {
        removeNpc(-1);
    }

    public final void resetPQ(int level) {
        resetFully();
        for (MapleMonster mons : getAllMonstersThreadsafe()) {
            mons.changeLevel(level, true);
        }
        resetSpawnLevel(level);
    }

    public final void resetAriantPQ(int level) {
        killAllMonsters(true);
        reloadReactors();
        removeDrops();
        resetNPCs();
        resetSpawns();
        resetDisconnected();
        endSpeedRun();
        cancelSquadSchedule(true);
        resetPortals();
        environment.clear();
        respawn(true);
        for (MapleMonster mons : getAllMonstersThreadsafe()) {
            mons.changeLevel(level, true);
        }
        resetSpawnLevel(level);
    }

    public final void resetSpawnLevel(int level) {
        for (Spawns spawn : monsterSpawn) {
            if (spawn instanceof SpawnPoint) {
                ((SpawnPoint) spawn).setLevel(level);
            }
        }
    }

    public final void resetFully() {
        resetFully(true);
    }

    public final void resetFully(final boolean respawn) {
        killAllMonsters(false);
        reloadReactors();
        removeDrops();
        resetNPCs();
        resetSpawns();
        resetDisconnected();
        endSpeedRun();
        cancelSquadSchedule(true);
        resetPortals();
        environment.clear();
        if (respawn) {
            respawn(true);
        }
    }

    public final void cancelSquadSchedule(boolean interrupt) {
        squadTimer = false;
        checkStates = true;
        if (squadSchedule != null) {
            squadSchedule.cancel(interrupt);
            squadSchedule = null;
        }
    }

    public final void removeDrops() {
        List<MapleMapItem> items = this.getAllItemsThreadsafe();
        for (MapleMapItem i : items) {
            i.expire(this);
        }
    }

    public final void resetAllSpawnPoint(int mobid, int mobTime) {
        Collection<Spawns> sss = new LinkedList<Spawns>(monsterSpawn);
        resetFully();
        monsterSpawn.clear();
        for (Spawns s : sss) {
            MapleMonster newMons = MapleLifeFactory.getMonster(mobid);
            newMons.setF(s.getF());
            newMons.setFh(s.getFh());
            newMons.setPosition(s.getPosition());
            addMonsterSpawn(newMons, mobTime, (byte) -1, null);
        }
        loadMonsterRate(true);
    }

    public final void resetSpawns() {
        boolean changed = false;
        Iterator<Spawns> sss = monsterSpawn.iterator();
        while (sss.hasNext()) {
            if (sss.next().getCarnivalId() > -1) {
                sss.remove();
                changed = true;
            }
        }
        setSpawns(true);
        if (changed) {
            loadMonsterRate(true);
        }
    }

    public final boolean makeCarnivalSpawn(final int team, final MapleMonster newMons, final int num) {
        MonsterPoint ret = null;
        for (MonsterPoint mp : nodes.getMonsterPoints()) {
            if (mp.team == team || mp.team == -1) {
                final Point newpos = calcPointBelow(new Point(mp.x, mp.y));
                newpos.y -= 1;
                boolean found = false;
                for (Spawns s : monsterSpawn) {
                    if (s.getCarnivalId() > -1 && (mp.team == -1 || s.getCarnivalTeam() == mp.team) && s.getPosition().x == newpos.x && s.getPosition().y == newpos.y) {
                        found = true;
                        break; //this point has already been used.
                    }
                }
                if (!found) {
                    ret = mp; //this point is safe for use.
                    break;
                }
            }
        }
        if (ret != null) {
            newMons.setCy(ret.cy);
            newMons.setF(0); //always.
            newMons.setFh(ret.fh);
            newMons.setRx0(ret.x + 50);
            newMons.setRx1(ret.x - 50); //does this matter
            newMons.setPosition(new Point(ret.x, ret.y));
            newMons.setHide(false);
            final SpawnPoint sp = addMonsterSpawn(newMons, 1, (byte) team, null);
            sp.setCarnival(num);
        }
        return ret != null;
    }

    public final boolean makeCarnivalReactor(final int team, final int num) {
        final MapleReactor old = getReactorByName(team + "" + num);
        if (old != null && old.getState() < 5) { //already exists
            return false;
        }
        Point guardz = null;
        final List<MapleReactor> react = getAllReactorsThreadsafe();
        for (Pair<Point, Integer> guard : nodes.getGuardians()) {
            if (guard.right == team || guard.right == -1) {
                boolean found = false;
                for (MapleReactor r : react) {
                    if (r.getTruePosition().x == guard.left.x && r.getTruePosition().y == guard.left.y && r.getState() < 5) {
                        found = true;
                        break; //already used
                    }
                }
                if (!found) {
                    guardz = guard.left; //this point is safe for use.
                    break;
                }
            }
        }
        if (guardz != null) {
            final MapleReactor my = new MapleReactor(MapleReactorFactory.getReactor(9980000 + team), 9980000 + team);
            my.setState((byte) 1);
            my.setName(team + "" + num); //lol
            //with num. -> guardians in factory
            spawnReactorOnGroundBelow(my, guardz);
            final MCSkill skil = MapleCarnivalFactory.getInstance().getGuardian(num);
            for (MapleMonster mons : getAllMonstersThreadsafe()) {
                if (mons.getCarnivalTeam() == team) {
                    skil.getSkill().applyEffect(null, mons, false);
                }
            }
        }
        return guardz != null;
    }

    public final void blockAllPortal() {
        for (MaplePortal p : portals.values()) {
            p.setPortalState(false);
        }
    }

    public boolean getAndSwitchTeam() {
        return getCharactersSize() % 2 != 0;
    }

    public void setSquad(MapleSquadType s) {
        this.squad = s;

    }

    public int getChannel() {
        return channel;
    }

    public int getConsumeItemCoolTime() {
        return consumeItemCoolTime;
    }

    public void setConsumeItemCoolTime(int ciit) {
        this.consumeItemCoolTime = ciit;
    }

    public void setPermanentWeather(int pw) {
        this.permanentWeather = pw;
    }

    public int getPermanentWeather() {
        return permanentWeather;
    }

    public void checkStates(final String chr) {
        if (!checkStates) {
            return;
        }
        final MapleSquad sqd = getSquadByMap();
        final EventManager em = getEMByMap();
        final int size = getCharactersSize();
        if (sqd != null && sqd.getStatus() == 2) {
            sqd.removeMember(chr);
            if (em != null) {
                if (sqd.getLeaderName().equalsIgnoreCase(chr)) {
                    em.setProperty("leader", "false");
                }
                if (chr.equals("") || size == 0) {
                    em.setProperty("state", "0");
                    em.setProperty("leader", "true");
                    cancelSquadSchedule(!chr.equals(""));
                    sqd.clear();
                    sqd.copy();
                }
            }
        }
        if (em != null && em.getProperty("state") != null && (sqd == null || sqd.getStatus() == 2) && size == 0) {
            em.setProperty("state", "0");
            if (em.getProperty("leader") != null) {
                em.setProperty("leader", "true");
            }
        }
        if (speedRunStart > 0 && size == 0) {
            endSpeedRun();
        }
        //if (squad != null) {
        //    final MapleSquad sqdd = ChannelServer.getInstance(channel).getMapleSquad(squad);
        //    if (sqdd != null && chr != null && chr.length() > 0 && sqdd.getAllNextPlayer().contains(chr)) {
        //	sqdd.getAllNextPlayer().remove(chr);
        //	broadcastMessage(CWvsContext.serverNotice(5, "The queued player " + chr + " has left the map."));
        //    }
        //}
    }

    public void setCheckStates(boolean b) {
        this.checkStates = b;
    }

    public void setNodes(final MapleNodes mn) {
        this.nodes = mn;
    }

    public final List<MaplePlatform> getPlatforms() {
        return nodes.getPlatforms();
    }

    public Collection<MapleNodeInfo> getNodes() {
        return nodes.getNodes();
    }

    public MapleNodeInfo getNode(final int index) {
        return nodes.getNode(index);
    }

    public boolean isLastNode(final int index) {
        return nodes.isLastNode(index);
    }

    public final List<Rectangle> getAreas() {
        return nodes.getAreas();
    }

    public final Rectangle getArea(final int index) {
        return nodes.getArea(index);
    }

    public final void changeEnvironment(final String ms, final int type) {
        broadcastMessage(EtcPacket.environmentChange(ms, type));
    }

    public final void toggleEnvironment(final String ms) {
        if (environment.containsKey(ms)) {
            moveEnvironment(ms, environment.get(ms) == 1 ? 2 : 1);
        } else {
            moveEnvironment(ms, 1);
        }
    }

    public final void moveEnvironment(final String ms, final int type) {
        broadcastMessage(EtcPacket.environmentMove(ms, type));
        environment.put(ms, type);
    }

    public final Map<String, Integer> getEnvironment() {
        return environment;
    }

    public final int getNumPlayersInArea(final int index) {
        return getNumPlayersInRect(getArea(index));
    }

    public final int getNumPlayersInRect(final Rectangle rect) {
        int ret = 0;

        charactersLock.readLock().lock();
        try {
            final Iterator<MapleCharacter> ltr = characters.iterator();
            MapleCharacter a;
            while (ltr.hasNext()) {
                if (rect.contains(ltr.next().getTruePosition())) {
                    ret++;
                }
            }
        } finally {
            charactersLock.readLock().unlock();
        }
        return ret;
    }

    public final int getNumPlayersItemsInArea(final int index) {
        return getNumPlayersItemsInRect(getArea(index));
    }

    public final int getNumPlayersItemsInRect(final Rectangle rect) {
        int ret = getNumPlayersInRect(rect);

        mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().lock();
        try {
            for (MapleMapObject mmo : mapobjects.get(MapleMapObjectType.ITEM).values()) {
                if (rect.contains(mmo.getTruePosition())) {
                    ret++;
                }
            }
        } finally {
            mapobjectlocks.get(MapleMapObjectType.ITEM).readLock().unlock();
        }
        return ret;
    }

    public void broadcastGMMessage(MapleCharacter source, byte[] packet, boolean repeatToSource) {
        broadcastGMMessage(repeatToSource ? null : source, packet);
    }

    private void broadcastGMMessage(MapleCharacter source, byte[] packet) {
        charactersLock.readLock().lock();
        try {
            if (source == null) {
                for (MapleCharacter chr : characters) {
                    if (chr.isStaff()) {
                        chr.getClient().getSession().write(packet);
                    }
                }
            } else {
                for (MapleCharacter chr : characters) {
                    if (chr != source && (chr.getGMLevel() >= source.getGMLevel())) {
                        chr.getClient().getSession().write(packet);
                    }
                }
            }
        } finally {
            charactersLock.readLock().unlock();
        }
    }

    public final List<Pair<Integer, Integer>> getMobsToSpawn() {
        return nodes.getMobsToSpawn();
    }

    public final List<Integer> getSkillIds() {
        return nodes.getSkillIds();
    }

    public final boolean canSpawn(long now) {
        return lastSpawnTime > 0 && lastSpawnTime + createMobInterval < now;
    }

    public final boolean canHurt(long now) {
        if (lastHurtTime > 0 && lastHurtTime + decHPInterval < now) {
            lastHurtTime = now;
            return true;
        }
        return false;
    }

    public final void resetShammos(final MapleClient c) {
        killAllMonsters(true);
        broadcastMessage(MaplePacketCreator.serverNotice(5, "A player has moved too far from Shammos. Shammos is going back to the start."));
        EtcTimer.getInstance().schedule(new Runnable() {

            public void run() {
                if (c.getPlayer() != null) {
                    c.getPlayer().changeMap(MapleMap.this, getPortal(0));
                    if (getCharactersThreadsafe().size() > 1) {
                        MapScriptMethods.startScript_FirstUser(c, "shammos_Fenter");
                    }
                }
            }
        }, 500); //avoid dl
    }

    public int getInstanceId() {
        return instanceid;
    }

    public void setInstanceId(int ii) {
        this.instanceid = ii;
    }

    public int getPartyBonusRate() {
        return partyBonusRate;
    }

    public void setPartyBonusRate(int ii) {
        this.partyBonusRate = ii;
    }

    public short getTop() {
        return top;
    }

    public short getBottom() {
        return bottom;
    }

    public short getLeft() {
        return left;
    }

    public short getRight() {
        return right;
    }

    public void setTop(int ii) {
        this.top = (short) ii;
    }

    public void setBottom(int ii) {
        this.bottom = (short) ii;
    }

    public void setLeft(int ii) {
        this.left = (short) ii;
    }

    public void setRight(int ii) {
        this.right = (short) ii;
    }

    public List<Pair<Point, Integer>> getGuardians() {
        return nodes.getGuardians();
    }

    public DirectionInfo getDirectionInfo(int i) {
        return nodes.getDirection(i);
    }
}
