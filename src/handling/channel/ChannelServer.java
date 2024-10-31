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
package handling.channel;

import client.MapleCharacter;
import constants.GameConstants;
import constants.ServerConstants;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import handling.MapleServerHandler;
import handling.login.LoginServer;
import handling.netty.ServerConnection;
import handling.world.CheaterData;
import handling.world.MapleParty;
import handling.world.MaplePartyCharacter;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import scripting.EventScriptManager;
import server.MapleSquad;
import server.MapleSquad.MapleSquadType;
import server.maps.MapleMapFactory;
import server.shops.HiredMerchant;
import server.shops.HiredMerchantSave;
import server.life.PlayerNPC;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.HashSet;
import java.util.Set;
import scripting.NPCScriptManager;
import server.ServerProperties;
import server.events.*;
import server.maps.AramiaFireWorks;
import server.maps.MapleMap;
import server.maps.MapleMapObject;
import tools.ConcurrentEnumMap;
import tools.packet.EtcPacket;
import tools.packet.EtcPacket.UIPacket;
import tools.packet.MaplePacketCreator;
import tools.packet.PlayerShopPacket;

public class ChannelServer { // 채널 설정

    public static long serverStartTime;
    private int expRate, mesoRate, dropRate, cashRate = 3, traitRate = 1;
    private short port = 8484;
    private static final short DEFAULT_PORT = 8585;
    private boolean isDoubleXP = false;
    public static int cshopNpc;
    private int channel, running_MerchantID = 0, flags = 0;
    private String serverMessage, ip, serverName;
    private boolean shutdown = false, finishedShutdown = false, MegaphoneMuteState = false, adminOnly = false;
    private PlayerStorage players;
    private ServerConnection acceptor;
    private final MapleMapFactory mapFactory;
    private EventScriptManager eventSM;
    private AramiaFireWorks works = new AramiaFireWorks();
    private static final Map<Integer, ChannelServer> instances = new HashMap<Integer, ChannelServer>();
    private final Map<MapleSquadType, MapleSquad> mapleSquads = new ConcurrentEnumMap<MapleSquadType, MapleSquad>(MapleSquadType.class);
    private final Map<Integer, HiredMerchant> merchants = new HashMap<Integer, HiredMerchant>();
    private final List<PlayerNPC> playerNPCs = new LinkedList<PlayerNPC>();
    private final ReentrantReadWriteLock merchLock = new ReentrantReadWriteLock(); //merchant
    private int eventmap = -1;
    private final Map<MapleEventType, MapleEvent> events = new EnumMap<MapleEventType, MapleEvent>(MapleEventType.class);
    private long[] Time = new long[50];

    private ChannelServer(final int channel) {
        this.channel = channel;
        mapFactory = new MapleMapFactory(channel);
    }

    public static Set<Integer> getAllInstance() {
        return new HashSet<Integer>(instances.keySet());
    }

    public final void loadEvents() {
        if (events.size() != 0) {
            return;
        }
        events.put(MapleEventType.CokePlay, new MapleCoconut(channel, MapleEventType.CokePlay)); //yep, coconut. same shit
        events.put(MapleEventType.Coconut, new MapleCoconut(channel, MapleEventType.Coconut));
        events.put(MapleEventType.Fitness, new MapleFitness(channel, MapleEventType.Fitness));
        events.put(MapleEventType.OlaOla, new MapleOla(channel, MapleEventType.OlaOla));
        events.put(MapleEventType.OxQuiz, new MapleOxQuiz(channel, MapleEventType.OxQuiz));
        events.put(MapleEventType.Snowball, new MapleSnowball(channel, MapleEventType.Snowball));
        events.put(MapleEventType.Survival, new MapleSurvival(channel, MapleEventType.Survival));
    }

    public final void run_startup_configurations() {
        setChannel(channel); //instances.put
        try {
            expRate = ServerConstants.expRate;
            mesoRate = ServerConstants.mesoRate;
            dropRate = ServerConstants.dropRate;
            serverMessage = ServerConstants.serverMassage;;
            serverName = ServerConstants.serverName;
            cshopNpc = Integer.parseInt(ServerConstants.cshopNpc);
            flags = 0;
            adminOnly = false;
            eventSM = new EventScriptManager(this, ServerConstants.event.split(","));
            port = (short) (DEFAULT_PORT + channel);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        ip = ServerConstants.ip + ":" + port;

        players = new PlayerStorage(channel);

        loadEvents();

        try {

            acceptor = new ServerConnection(port, 0, channel, false);
            acceptor.run();
            System.out.println(" <" + channel + ">LoadingPort： " + port + "Please wait a moment..:debug"+GameConstants.build);
            eventSM.init();

        } catch (Exception e) {
            System.out.println("" + port + "Port Already occupied (channel : " + getChannel() + ")" + e);
        }
    }

    public final void shutdown() {
        if (finishedShutdown) {
            return;
        }
        broadcastPacket(MaplePacketCreator.serverNotice(0, "This channel will now shut down."));
        // dc all clients by hand so we get sessionClosed...
        shutdown = true;

        System.out.println("Channel " + channel + ", Saving characters...");

        getPlayerStorage().disconnectAll();

        System.out.println("Channel " + channel + ", Unbinding...");

        acceptor.close();
        acceptor = null;

        //temporary while we dont have !addchannel
        instances.remove(channel);
        setFinishShutdown();
    }

    public final void unbind() {
        acceptor.close();
    }

    public final boolean hasFinishedShutdown() {
        return finishedShutdown;
    }

    public final MapleMapFactory getMapFactory() {
        return mapFactory;
    }

    public static final ChannelServer newInstance(final int channel) {
        return new ChannelServer(channel);
    }

    public static final ChannelServer getInstance(final int channel) {
        return instances.get(channel);
    }

    public final void addPlayer(final MapleCharacter chr) {
        getPlayerStorage().registerPlayer(chr);
    }

    public final PlayerStorage getPlayerStorage() {
        if (players == null) { //wth
            players = new PlayerStorage(channel); //wthhhh
        }
        return players;
    }

    public final void removePlayer(final MapleCharacter chr) {
        getPlayerStorage().deregisterPlayer(chr);

    }

    public final void removePlayer(final int idz, final String namez) {
        getPlayerStorage().deregisterPlayer(idz, namez);

    }

    public boolean isDoubleXP() {
        return isDoubleXP;
    }

    public void setDoubleXP(boolean a) {
        isDoubleXP = a;
    }

    public final String getServerMessage() {
        return serverMessage;
    }

    public final void setServerMessage(final String newMessage) {
        serverMessage = newMessage;
        broadcastPacket(MaplePacketCreator.serverMessage(serverMessage));
    }

    public void ItemMessage(String msg, int itemid) {
        getPlayerStorage().broadcastPacket(MaplePacketCreator.serverNotice(msg, itemid));
    }

    public final void broadcastPacket(final byte[] data) {
        getPlayerStorage().broadcastPacket(data);
    }

    public void dropMessage(int type, String message) {
        getPlayerStorage().broadcastPacket(MaplePacketCreator.serverNotice(type, message));
    }

    public final void broadcastSmegaPacket(final byte[] data) {
        getPlayerStorage().broadcastSmegaPacket(data);
    }

    public final List<MapleCharacter> getPartyMembers(final MapleParty party) {
        List<MapleCharacter> partym = new LinkedList<MapleCharacter>();
        for (final MaplePartyCharacter partychar : party.getMembers()) {
            if (partychar.getChannel() == getChannel()) { // Make sure the thing doesn't get duplicate plays due to ccing bug.
                MapleCharacter chr = getPlayerStorage().getCharacterByName(partychar.getName());
                if (chr != null) {
                    partym.add(chr);
                }
            }
        }
        return partym;
    }

    public final List<MapleCharacter> getPartyMembers(final MapleParty party, final int map) {
        List<MapleCharacter> partym = new ArrayList<MapleCharacter>(6);
        for (final MaplePartyCharacter partychar : party.getMembers()) {
            if (partychar.getChannel() == getChannel()) {
                if (map > 0 && partychar.getMapid() != map) {
                    continue;
                }
                MapleCharacter chr = getPlayerStorage().getCharacterByName(partychar.getName());
                if (chr != null) {
                    partym.add(chr);
                }
            }
        }
        return partym;
    }

    public final void broadcastGMPacket(final byte[] data) {
        getPlayerStorage().broadcastGMPacket(data);
    }

    public final int getExpRate() {
        return expRate;
    }

    public final void setExpRate(final int expRate) {
        this.expRate = expRate;
    }

    public final int getDropRate() {
        return dropRate;
    }

    public final void setDropRate(final int dropRate) {
        this.dropRate = dropRate;
    }

    public final int getCashRate() {
        return cashRate;
    }

    public final int getChannel() {
        return channel;
    }

    public final void setChannel(final int channel) {
        instances.put(channel, this);
        LoginServer.addChannel(channel);
    }

    public void HotTime() {
        for (MapleCharacter mc : getPlayerStorage().getAllCharacters()) {
            NPCScriptManager.getInstance().start(mc.getClient(), 9010010, "dlqpsxm", null);
        }
    }

    public static final ArrayList<ChannelServer> getAllInstances() {
        return new ArrayList<ChannelServer>(instances.values());
    }

    public final String getIP() {
        return ip;
    }

    public final boolean isShutdown() {
        return shutdown;
    }

    public final int getLoadedMaps() {
        return mapFactory.getLoadedMaps();
    }

    public final EventScriptManager getEventSM() {
        return eventSM;
    }

    public final void reloadEvents() {
        eventSM.cancel();
        eventSM = new EventScriptManager(this, ServerConstants.event.split(","));
        eventSM.init();
    }

    public final int getMesoRate() {
        return mesoRate;
    }

    public final void setMesoRate(final int mesoRate) {
        this.mesoRate = mesoRate;
    }

    public static final void startChannel_Main() {
        serverStartTime = System.currentTimeMillis();

        for (int i = 0; i < ServerConstants.channelcount; i++) {
            newInstance(i + 1).run_startup_configurations();
        }
    }

    public Map<MapleSquadType, MapleSquad> getAllSquads() {
        return Collections.unmodifiableMap(mapleSquads);
    }

    public final MapleSquad getMapleSquad(final String type) {
        return getMapleSquad(MapleSquadType.valueOf(type.toLowerCase()));
    }

    public final MapleSquad getMapleSquad(final MapleSquadType type) {
        return mapleSquads.get(type);
    }

    public final boolean addMapleSquad(final MapleSquad squad, final String type) {
        final MapleSquadType types = MapleSquadType.valueOf(type.toLowerCase());
        if (types != null && !mapleSquads.containsKey(types)) {
            mapleSquads.put(types, squad);
            squad.scheduleRemoval();
            return true;
        }
        return false;
    }

    public final boolean removeMapleSquad(final MapleSquadType types) {
        if (types != null && mapleSquads.containsKey(types)) {
            mapleSquads.remove(types);
            return true;
        }
        return false;
    }

    public final void saveAllMerchant() {
        final Iterator<HiredMerchant> merchants_ = merchants.values().iterator();
        while (merchants_.hasNext()) {
            HiredMerchant merch = merchants_.next();
            merch.saveItems();
        }
    }

    public final int closeAllMerchant() {
        int ret = 0;
        merchLock.writeLock().lock();
        try {
            final Iterator<Entry<Integer, HiredMerchant>> merchants_ = merchants.entrySet().iterator();
            while (merchants_.hasNext()) {
                HiredMerchant hm = merchants_.next().getValue();
                hm.closeShop(true, false);
                hm.getMap().removeMapObject(hm);
                merchants_.remove();
                ret++;
            }
        } finally {
            merchLock.writeLock().unlock();
        }

        // Define the range of map IDs for merchants
        int[] mapIds = { GameConstants.square, 910000001, 910000022 }; // Add more valid map IDs if needed
        for (int mapId : mapIds) {
            MapleMap map = mapFactory.getMap(mapId);
            if (map != null) { // Only proceed if the map is valid
                for (MapleMapObject mmo : map.getAllHiredMerchantsThreadsafe()) {
                    if (mmo instanceof HiredMerchant) {
                        ((HiredMerchant) mmo).closeShop(true, false);
                        ret++;
                    }
                }
            } else {
                System.out.println("Warning: Map with ID " + mapId + " is null. Skipping...");
            }
        }

        return ret;
    }



    public final int addMerchant(final HiredMerchant hMerchant) {
        merchLock.writeLock().lock();
        try {
            running_MerchantID++;
            merchants.put(running_MerchantID, hMerchant);
            return running_MerchantID;
        } finally {
            merchLock.writeLock().unlock();
        }
    }

    public final void removeMerchant(final HiredMerchant hMerchant) {
        merchLock.writeLock().lock();

        try {
            merchants.remove(hMerchant.getStoreId());
        } finally {
            merchLock.writeLock().unlock();
        }
    }

    public final boolean containsMerchant(final int accid, int cid) {
        boolean contains = false;

        merchLock.readLock().lock();
        try {
            final Iterator itr = merchants.values().iterator();

            while (itr.hasNext()) {
                HiredMerchant hm = (HiredMerchant) itr.next();
                if (hm.getOwnerAccId() == accid || hm.getOwnerId() == cid) {
                    contains = true;
                    break;
                }
            }
        } finally {
            merchLock.readLock().unlock();
        }
        return contains;
    }

    public final List<HiredMerchant> searchMerchant(final int itemSearch) {
        final List<HiredMerchant> list = new LinkedList<HiredMerchant>();
        merchLock.readLock().lock();
        try {
            final Iterator itr = merchants.values().iterator();

            while (itr.hasNext()) {
                HiredMerchant hm = (HiredMerchant) itr.next();
                if (hm.searchItem(itemSearch).size() > 0) {
                    list.add(hm);
                }
            }
        } finally {
            merchLock.readLock().unlock();
        }
        return list;
    }

    public final void toggleMegaphoneMuteState() {
        this.MegaphoneMuteState = !this.MegaphoneMuteState;
    }

    public final boolean getMegaphoneMuteState() {
        return MegaphoneMuteState;
    }

    public int getEvent() {
        return eventmap;
    }

    public final void setEvent(final int ze) {
        this.eventmap = ze;
    }

    public MapleEvent getEvent(final MapleEventType t) {
        return events.get(t);
    }

    public final Collection<PlayerNPC> getAllPlayerNPC() {
        return playerNPCs;
    }

    public final void addPlayerNPC(final PlayerNPC npc) {
        if (playerNPCs.contains(npc)) {
            return;
        }
        playerNPCs.add(npc);
        getMapFactory().getMap(npc.getMapId()).addMapObject(npc);
    }

    public final void removePlayerNPC(final PlayerNPC npc) {
        if (playerNPCs.contains(npc)) {
            playerNPCs.remove(npc);
            getMapFactory().getMap(npc.getMapId()).removeMapObject(npc);
        }
    }

    public final String getServerName() {
        return serverName;
    }

    public final void setServerName(final String sn) {
        this.serverName = sn;
    }

    public final String getTrueServerName() {
        return serverName.substring(0, serverName.length() - (GameConstants.GMS ? 2 : 3));
    }

    public final int getPort() {
        return port;
    }

    public static final Set<Integer> getChannelServer() {
        return new HashSet<Integer>(instances.keySet());
    }

    public final void setShutdown() {
        this.shutdown = true;
        System.out.println("Channel " + channel + " has set to shutdown and is closing Hired Merchants...");
    }

    public final void setFinishShutdown() {
        this.finishedShutdown = true;
        System.out.println("Channel " + channel + " has finished shutdown.");
    }

    public final boolean isAdminOnly() {
        return adminOnly;
    }

    public final static int getChannelCount() {
        return instances.size();
    }

    public final int getTempFlag() {
        return flags;
    }

    public static Map<Integer, Integer> getChannelLoad() {
        Map<Integer, Integer> ret = new HashMap<Integer, Integer>();
        for (ChannelServer cs : instances.values()) {
            ret.put(cs.getChannel(), cs.getConnectedClients());
        }
        return ret;
    }

    public int getConnectedClients() {
        return getPlayerStorage().getConnectedClients();
    }

    public List<CheaterData> getCheaters() {
        List<CheaterData> cheaters = getPlayerStorage().getCheaters();

        Collections.sort(cheaters);
        return cheaters;
    }

    public List<CheaterData> getReports() {
        List<CheaterData> cheaters = getPlayerStorage().getReports();

        Collections.sort(cheaters);
        return cheaters;
    }

    public void broadcastMessage(byte[] message) {
        broadcastPacket(message);
    }

    public void broadcastSmega(byte[] message) {
        broadcastSmegaPacket(message);
    }

    public void broadcastGMMessage(byte[] message) {
        broadcastGMPacket(message);
    }

    public AramiaFireWorks getFireWorks() {
        return works;
    }

    public int getTraitRate() {
        return traitRate;
    }

    public void MParkClock(final MapleMap map, int pid) {
        int stage = (map.getId() / 100) % 100;
        if (stage == 0) {
            Time[pid] = System.currentTimeMillis();
            map.broadcastMessage(EtcPacket.getClock(1200));
        } else if (stage > 0) {
            map.broadcastMessage(EtcPacket.getClock(1200 - (int) (System.currentTimeMillis() - Time[pid]) / 1000));
        }
    }

    public void MParkout(final MapleMap map, int pid) {
        Time[pid] = 0;
        map.killAllMonsters(false);
    }

    public void writeinitemtosql(Integer accid, boolean bool) {
        merchLock.readLock().lock();
        try {
            final Iterator<HiredMerchant> itr = merchants.values().iterator();
            while (itr.hasNext()) {
                HiredMerchant hire = (HiredMerchant) itr.next();
                if (hire.getOwnerAccId() == accid) {
                    hire.saveItems();
                    if (bool) {
                        hire.getItems().clear();
                    }
                    break;
                }
            }
        } finally {
            merchLock.readLock().unlock();
        }
    }
}
