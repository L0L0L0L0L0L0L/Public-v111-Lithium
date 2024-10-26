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
package handling.channel.handler;

import java.awt.Point;
import java.util.List;

import client.inventory.Item;
import client.Skill;
import client.SkillFactory;
import client.SkillMacro;
import client.MapleStat;
import constants.GameConstants;
import client.inventory.MapleInventoryType;
import client.MapleBuffStat;
import client.MapleClient;
import client.MapleCharacter;
import client.PlayerStats;
import client.anticheat.CheatingOffense;
import client.status.MonsterStatus;
import client.status.MonsterStatusEffect;
import constants.BattleConstants;
import constants.BattleConstants.PokemonAbility;
import constants.BattleConstants.PokemonMap;
import handling.channel.ChannelServer;
import java.lang.ref.WeakReference;
import server.events.MapleEvent;
import server.events.MapleEventType;
import java.util.Collections;
import java.util.EnumMap;
import java.util.LinkedList;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.MapleStatEffect;
import server.MaplePortal;
import server.PokemonBattle;
import server.Randomizer;
import server.Timer.CloneTimer;
import server.events.MapleSnowball.MapleSnowballs;
import server.life.BanishInfo;
import server.life.MapleMonster;
import server.life.MobAttackInfo;
import server.life.MobSkill;
import server.life.MobSkillFactory;
import server.maps.MapleMap;
import server.maps.FieldLimitType;
import server.movement.LifeMovementFragment;
import server.quest.MapleQuest;
import tools.FileoutputUtil;
import tools.packet.EtcPacket;
import tools.Pair;
import tools.packet.MobPacket;
import tools.packet.MTSCSPacket;
import tools.data.LittleEndianAccessor;
import tools.packet.EtcPacket.EffectPacket;
import tools.packet.EtcPacket.UIPacket;
import tools.packet.MaplePacketCreator;
import tools.packet.MaplePacketCreator.InventoryPacket;

public class PlayerHandler {

    public static int isFinisher(final int skillid) {
        switch (skillid) {
            case 1111003:
                return GameConstants.GMS ? 1 : 10;
            case 1111005:
                return GameConstants.GMS ? 2 : 10;
            case 11111002:
                return GameConstants.GMS ? 1 : 10;
            case 11111003:
                return GameConstants.GMS ? 2 : 10;
        }
        return 0;
    }

    public static void ChangeSkillMacro(final LittleEndianAccessor slea, final MapleCharacter chr) {
        final int num = slea.readByte();
        String name;
        int shout, skill1, skill2, skill3;
        SkillMacro macro;

        for (int i = 0; i < num; i++) {
            name = slea.readMapleAsciiString();
            shout = slea.readByte();
            skill1 = slea.readInt();
            skill2 = slea.readInt();
            skill3 = slea.readInt();

            macro = new SkillMacro(skill1, skill2, skill3, name, shout, i);
            chr.updateMacros(i, macro);
        }
    }

    public static final void ChangeKeymap(final LittleEndianAccessor slea, final MapleCharacter chr) {
        //F1 00 
        //01 00 00 00
        //84 84 1E 00
        if (slea.available() > 8 && chr != null) { // else = pet auto pot
            slea.skip(4); //0
            final int numChanges = slea.readInt();

            for (int i = 0; i < numChanges; i++) {
                final int key = slea.readInt();
                final byte type = slea.readByte();
                final int action = slea.readInt();
                if (type == 1 && action >= 1000) { //0 = normal key, 1 = skill, 2 = item
                    final Skill skil = SkillFactory.getSkill(action);
                    if (skil != null) { //not sure about aran tutorial skills..lol
                        if ((!skil.isFourthJob() && !skil.isBeginnerSkill() && skil.isinvisible() && chr.getSkillLevel(skil) <= 0) || GameConstants.isLinkedAranSkill(action) || (action % 10000 < 1000&&action!=23120011) || action >= 91000000) { //cannot put on a key
                            continue;
                        }
                    }
                }
                chr.changeKeybinding(key, type, action);
            }
        } else if (chr != null) {
            final int type = slea.readInt();
            final int data = slea.readInt();/*
            switch (type) {
               
                case 1:
                    if (data <= 0) {
                        chr.getQuestRemove(MapleQuest.getInstance(GameConstants.HP_ITEM));
                    } else {
                        chr.getQuestNAdd(MapleQuest.getInstance(GameConstants.HP_ITEM)).setCustomData(String.valueOf(data));
                    }
                    break;
                case 2:
                    if (data <= 0) {
                        chr.getQuestRemove(MapleQuest.getInstance(GameConstants.MP_ITEM));
                    } else {
                        chr.getQuestNAdd(MapleQuest.getInstance(GameConstants.MP_ITEM)).setCustomData(String.valueOf(data));
                    }
                    break;
                case 3:
                    if (data <= 0) {
                        chr.getQuestRemove(MapleQuest.getInstance(GameConstants.CURE));
                    } else {
                        chr.getQuestNAdd(MapleQuest.getInstance(GameConstants.CURE)).setCustomData(String.valueOf(data));
                    }
                    break;
                case 5:
                    if (data <= 0) {
                        chr.getQuestRemove(MapleQuest.getInstance(GameConstants.UNPICK));
                    } else {
                        chr.getQuestNAdd(MapleQuest.getInstance(GameConstants.UNPICK)).setCustomData(String.valueOf(data));
                    }
                    break;
            }*/
            switch (type) {
               
                case 1://위치는 HP지만 ?불러옴
                    //System.out.print(type+"/"+data);
                    //System.out.print(GameConstants.HP_ITEM+"/"+type+"/"+chr.getIntNoRecord(GameConstants.HP_ITEM)+"\n");
                    if (data <= 0) {
                        chr.getQuestRemove(MapleQuest.getInstance(GameConstants.HP_ITEM));
                    } else {
                        chr.getQuestNAdd(MapleQuest.getInstance(GameConstants.HP_ITEM)).setCustomData(String.valueOf(data));
                    }
                    break;
                case 2://위치는 MP지만HP불러옴
                    //System.out.print(type+"/"+data);
                    //System.out.print(GameConstants.MP_ITEM+"/"+type+"/"+chr.getIntNoRecord(GameConstants.MP_ITEM)+"\n");
                    if (data <= 0) {
                        chr.getQuestRemove(MapleQuest.getInstance(GameConstants.MP_ITEM));
                    } else {
                        chr.getQuestNAdd(MapleQuest.getInstance(GameConstants.MP_ITEM)).setCustomData(String.valueOf(data));
                    }
                    break;
                case 3:
                    //System.out.print(type+"/"+data);
                    //System.out.print(GameConstants.CURE+"/"+type+"/"+chr.getIntNoRecord(GameConstants.CURE)+"\n");
                    if (data <= 0) {
                        chr.getQuestRemove(MapleQuest.getInstance(GameConstants.CURE));
                    } else {
                        chr.getQuestNAdd(MapleQuest.getInstance(GameConstants.CURE)).setCustomData(String.valueOf(data));
                    }
                    break;
                case 5:
                    //System.out.print(type+"/"+data);
                    if (data <= 0) {
                        chr.getQuestRemove(MapleQuest.getInstance(GameConstants.UNPICK));
                    } else {
                        chr.getQuestNAdd(MapleQuest.getInstance(GameConstants.UNPICK)).setCustomData(String.valueOf(data));
                    }
                    break;
            }
        }
    }

    public static final void UseTitle(final int itemId, final MapleClient c, final MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        final Item toUse = chr.getInventory(MapleInventoryType.SETUP).findById(itemId);
        if (toUse == null) {
            return;
        }
        if (itemId <= 0) {
            chr.getQuestRemove(MapleQuest.getInstance(GameConstants.ITEM_TITLE));
        } else {
            chr.getQuestNAdd(MapleQuest.getInstance(GameConstants.ITEM_TITLE)).setCustomData(String.valueOf(itemId));
        }
        chr.getMap().broadcastMessage(chr, EtcPacket.showTitle(chr.getId(), itemId), false);
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    public static final void UseChair(final int itemId, final MapleClient c, final MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        final Item toUse = chr.getInventory(MapleInventoryType.SETUP).findById(itemId);
        if (toUse == null) {
            chr.getCheatTracker().registerOffense(CheatingOffense.USING_UNAVAILABLE_ITEM, Integer.toString(itemId));
            return;
        }
        if (GameConstants.isFishingMap(chr.getMapId()) && (!GameConstants.GMS || itemId == 3011000)) {
            if (chr.getStat().canFish) {
                chr.startFishingTask();
            }
        }
        if (chr.getMapId() == chr.CMap && chr.getPosition().y == 1289 && itemId == chr.Chair) {
            if (chr.getLevel() >= 30) {
            chr.ChairTimer(1);
            } else {
                chr.dropMessage(5, "[Tip] Fishing can be used starting from Lv.30 or above.");
            }
        }
        chr.setChair(itemId);
        chr.getMap().broadcastMessage(chr, EtcPacket.showChair(chr.getId(), itemId), false);
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    public static final void CancelChair(final short id, final MapleClient c, final MapleCharacter chr) {
        if (chr.getLevel() >= 30 && chr.getMapId() == chr.CMap && chr.getPosition().y == 1289 && chr.getChair() == chr.Chair) {
            chr.cancelChair();
        }
        if (id == -1) { // Cancel Chair
            chr.cancelFishingTask();
            chr.setChair(0);
            c.getSession().write(EtcPacket.cancelChair(-1));
            if (chr.getMap() != null) {
                chr.getMap().broadcastMessage(chr, EtcPacket.showChair(chr.getId(), 0), false);
            }
        } else { // Use In-Map Chair
            chr.setChair(id);
            c.getSession().write(EtcPacket.cancelChair(id));
        }
    }

    public static final void PoisonBomb(final LittleEndianAccessor slea, final MapleClient c, final MapleCharacter chr) {
        final int x = slea.readShort();
        slea.readShort();//00 00 도되었다가 FF FF도 되었다가
        final int y = slea.readShort();
        slea.readShort();//위랑같음
        slea.skip(4);//캐릭터의 Y좌표
        final int charge = slea.readInt(); //게이지를 모은정도
        final int skillId = slea.readInt(); //스킬아이디
        final int skillLevel = slea.readInt(); //스킬레벨
        if (skillId != 14111006 && skillLevel < 1) {
            //System.out.println("핵의심유저: " + chr.getName());
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        } else {
            c.getSession().write(MaplePacketCreator.enableActions());
        }
    }

    public static final void TrockAddMap(final LittleEndianAccessor slea, final MapleClient c, final MapleCharacter chr) {
        final byte addrem = slea.readByte();
        final byte vip = slea.readByte();

        if (vip == 1) { // Regular rocks
            if (addrem == 0) {
                chr.deleteFromRegRocks(slea.readInt());
            } else if (addrem == 1) {
                if (!FieldLimitType.VipRock.check(chr.getMap().getFieldLimit())) {
                    chr.addRegRockMap();
                } else {
                    chr.dropMessage(1, "This map is not available to enter for the list.");
                }
            }
        } else if (vip == 2) { // VIP Rock
            if (addrem == 0) {
                chr.deleteFromRocks(slea.readInt());
            } else if (addrem == 1) {
                if (!FieldLimitType.VipRock.check(chr.getMap().getFieldLimit())) {
                    chr.addRockMap();
                } else {
                    chr.dropMessage(1, "This map is not available to enter for the list.");
                }
            }
        } else if (vip == 3 || vip == 5) {
            if (addrem == 0) {
                chr.deleteFromHyperRocks(slea.readInt());
            } else if (addrem == 1) {
                if (!FieldLimitType.VipRock.check(chr.getMap().getFieldLimit())) {
                    chr.addHyperRockMap();
                } else {
                    chr.dropMessage(1, "This map is not available to enter for the list.");
                }
            }
        } else {
            chr.dropMessage(1, "An unknown error has occurred.");
        }
        c.getSession().write(MTSCSPacket.OnMapTransferResult(chr, vip, addrem == 0));
    }

    public static final void CharInfoRequest(final int objectid, final MapleClient c, final MapleCharacter chr) {
        if (c.getPlayer() == null || c.getPlayer().getMap() == null) {
            return;
        }
        final MapleCharacter player = c.getPlayer().getMap().getCharacterById(objectid);
        c.getSession().write(MaplePacketCreator.enableActions());
        if (player != null && !player.isClone()) {
            if (!player.isGM() || c.getPlayer().isGM()) {
                c.getSession().write(MaplePacketCreator.charInfo(player, c.getPlayer().getId() == objectid));
            }
        }
    }

    public static final void TakeDamage(final LittleEndianAccessor slea, final MapleClient c, final MapleCharacter chr) {
        slea.skip(4); // randomized
        chr.updateTick(slea.readInt()); // ticks
        final byte type = slea.readByte(); //-4 is mist, -3 and -2 are map damage.
        slea.skip(1); // Element - 0x00 = elementless, 0x01 = ice, 0x02 = fire, 0x03 = lightning
        int damage = slea.readInt();
        slea.skip(2);
        boolean isDeadlyAttack = false;
        boolean pPhysical = false;
        int oid = 0;
        int monsteridfrom = 0;
        int fake = 0;
        int mpattack = 0;
        int skillid = 0;
        int pID = 0;
        int pDMG = 0;
        byte direction = 0;
        byte pType = 0;
        Point pPos = new Point(0, 0);
        MapleMonster attacker = null;
        if (chr == null || chr.isHidden() || chr.getMap() == null) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (chr.isGM() && chr.isInvincible()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        final PlayerStats stats = chr.getStat();
        if (type != -2 && type != -3 && type != -4) { // Not map damage
            monsteridfrom = slea.readInt();
            oid = slea.readInt();
            attacker = chr.getMap().getMonsterByOid(oid);
            direction = slea.readByte(); // Knock direction

            if (attacker == null || attacker.getId() != monsteridfrom || attacker.getLinkCID() > 0 || attacker.isFake() || attacker.getStats().isFriendly()) {
                return;
            }
            if (attacker.getId() == 9400809 || attacker.getId() == 9300507) {
                List<BanishInfo> infos = attacker.getStats().getBanishInfo();
                BanishInfo info = infos.get(Randomizer.nextInt(infos.size()));
                if (info != null) {
                    chr.changeMapBanish(info.getMap(), info.getPortal(), info.getMsg());
                }
            }
            if (type != -1 && damage > 0) { // Bump damage
                final MobAttackInfo attackInfo = attacker.getStats().getMobAttack(type);
                if (attackInfo != null) {
                    if (attackInfo.isElement && stats.TER > 0 && Randomizer.nextInt(100) < stats.TER) {
                        System.out.println("Avoided ER from mob id: " + monsteridfrom);
                        return;
                    }
                    if (attackInfo.isDeadlyAttack()) {
                        isDeadlyAttack = true;
                        mpattack = stats.getMp() - 1;
                    } else {
                        mpattack += attackInfo.getMpBurn();
                    }
                    final MobSkill skill = MobSkillFactory.getMobSkill(attackInfo.getDiseaseSkill(), attackInfo.getDiseaseLevel());
                    if (skill != null && (damage == -1 || damage > 0)) {
                        skill.applyEffect(chr, attacker, false);
                    }
                    attacker.setMp(attacker.getMp() - attackInfo.getMpCon());
                }
            }
            skillid = slea.readInt();
            pDMG = slea.readInt(); // we don't use this, incase packet edit..
            final byte defType = slea.readByte();
            slea.skip(1); // ?
            if (defType == 1) { // Guard
                final Skill bx = SkillFactory.getSkill(31110008);
                final int bof = chr.getTotalSkillLevel(bx);
                if (bof > 0) {
                    final MapleStatEffect eff = bx.getEffect(bof);
                    if (Randomizer.nextInt(100) <= eff.getX()) { // estimate
                        chr.handleForceGain(oid, 31110008, eff.getZ());
                    }
                }
            }
            if (skillid != 0) {
                pPhysical = slea.readByte() > 0;
                pID = slea.readInt();
                pType = slea.readByte();
                slea.skip(4); // Mob position garbage
                pPos = slea.readPos();
            }
        }
        if (damage == -1) {
            fake = 4020002 + ((chr.getJob() / 10 - 40) * 100000);
            if (fake != 4120002 && fake != 4220002) {
                fake = 4120002;
            }
            if (type == -1 && chr.getJob() == 122 && attacker != null && chr.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -10) != null) {
                if (chr.getTotalSkillLevel(1220006) > 0) {
                    final MapleStatEffect eff = SkillFactory.getSkill(1220006).getEffect(chr.getTotalSkillLevel(1220006));
                    attacker.applyStatus(chr, new MonsterStatusEffect(MonsterStatus.STUN, 1, 1220006, null, false), false, eff.getDuration(), true, eff);
                    fake = 1220006;
                }
            }
            if (chr.getTotalSkillLevel(fake) <= 0) {
                return;
            }
        } else if (damage < -1 || damage > 200000) {
            //AutobanManager.getInstance().addPoints(c, 1000, 60000, "Taking abnormal amounts of damge from " + monsteridfrom + ": " + damage);
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (chr.getStat().dodgeChance > 0 && Randomizer.nextInt(100) < chr.getStat().dodgeChance) {
            //c.getSession().write(EffectPacket.showForeignEffect(20));
            return;
        }
        if (pPhysical && skillid == 5310009) {//反擊砲手
                final Skill divine = SkillFactory.getSkill(5310009);
                final MapleStatEffect divineShield = divine.getEffect(chr.getTotalSkillLevel(divine));
                final int theDmg = (int) (divineShield.getDamage() * chr.getStat().getCurrentMaxBaseDamage() / 100.0);
                attacker.damage(chr, theDmg, pPhysical, 5310009);
        }
        chr.getCheatTracker().checkTakeDamage(damage);
        Pair<Double, Boolean> modify = chr.modifyDamageTaken((double) damage, attacker);
        damage = modify.left.intValue();
        if (damage > 0) {
            chr.getCheatTracker().setAttacksWithoutHit(false);

            if (chr.getBuffedValue(MapleBuffStat.MORPH) != null) {
                chr.cancelMorphs();
            }
            // if (slea.available() == 3 || slea.available() == 4) {
            //     byte level = slea.readByte();
            //     if (level > 0) {
            //         final MobSkill skill = MobSkillFactory.getMobSkill(slea.readShort(), level);
            //          if (skill != null) {
            //             skill.applyEffect(chr, attacker, false);
            //         }
            //      }
            //  }
            boolean mpAttack = chr.getBuffedValue(MapleBuffStat.MECH_CHANGE) != null && chr.getBuffSource(MapleBuffStat.MECH_CHANGE) != 35121005;
            if (chr.getBuffedValue(MapleBuffStat.MAGIC_GUARD) != null) {
                int hploss = 0, mploss = 0;
                if (isDeadlyAttack) {
                    if (stats.getHp() > 1) {
                        hploss = stats.getHp() - 1;
                    }
                    if (stats.getMp() > 1) {
                        mploss = stats.getMp() - 1;
                    }
                    if (chr.getBuffedValue(MapleBuffStat.INFINITY) != null) {
                        mploss = 0;
                    }
                    chr.addMPHP(-hploss, -mploss);
                    //} else if (mpattack > 0) {
                    //    chr.addMPHP(-damage, -mpattack);
                } else {
                    mploss = (int) (damage * (chr.getBuffedValue(MapleBuffStat.MAGIC_GUARD).doubleValue() / 100.0)) + mpattack;
                    hploss = damage - mploss;
                    if (chr.getBuffedValue(MapleBuffStat.INFINITY) != null) {
                        mploss = 0;
                    } else if (mploss > stats.getMp()) {
                        mploss = stats.getMp();
                        hploss = damage - mploss + mpattack;
                    }
                    chr.addMPHP(-hploss, -mploss);
                }

            } else if (chr.getStat().mesoGuardMeso > 0) {
                //damage = (int) Math.ceil(damage * chr.getStat().mesoGuard / 100.0);
                //handled in client
                final int mesoloss = (int) (damage * (chr.getStat().mesoGuardMeso / 100.0));
                if (chr.getMeso() < mesoloss) {
                    chr.gainMeso(-chr.getMeso(), false);
                    chr.cancelBuffStats(MapleBuffStat.MESOGUARD);
                } else {
                    chr.gainMeso(-mesoloss, false);
                }
                if (isDeadlyAttack && stats.getMp() > 1) {
                    mpattack = stats.getMp() - 1;
                }

                chr.addMPHP(-(damage / 2), -mpattack);
            } else {
                if (isDeadlyAttack) {
                    chr.addMPHP(stats.getHp() > 1 ? -(stats.getHp() - 1) : 0, stats.getMp() > 1 && !mpAttack ? -(stats.getMp() - 1) : 0);
                } else {
                    chr.addMPHP(-damage, mpAttack ? 0 : -mpattack);
                }
            }
            if (!GameConstants.GMS) { //TODO JUMP
                chr.handleBattleshipHP(-damage);
            }
            if (chr.inPVP() && chr.getStat().getHPPercent() <= 20) {
                SkillFactory.getSkill(chr.getStat().getSkillByJob(93, chr.getJob())).getEffect(1).applyTo(chr);
            }
        }
        byte offset = 0;
        int offset_d = 0;
        if (slea.available() == 1) {
            offset = slea.readByte();
            if (offset == 1 && slea.available() >= 4) {
                offset_d = slea.readInt();
            }
            if (offset < 0 || offset > 2) {
                offset = 0;
            }
        }

        //c.getSession().write(CWvsContext.enableActions());
        chr.getMap().broadcastMessage(chr, EtcPacket.damagePlayer(chr.getId(), type, damage, monsteridfrom, direction, skillid, pDMG, pPhysical, pID, pType, pPos, offset, offset_d, fake), false);
    }

    public static final void AranCombo(final MapleClient c, final MapleCharacter chr, int toAdd) {
        if (chr != null && chr.getJob() >= 2000 && chr.getJob() <= 2112) {
            short combo = chr.getCombo();
            final long curr = System.currentTimeMillis();

            if (combo > 0 && (curr - chr.getLastCombo()) > 7000) {
                // Official MS timing is 3.5 seconds, so 7 seconds should be safe.
                //chr.getCheatTracker().registerOffense(CheatingOffense.ARAN_COMBO_HACK);
                combo = 0;
            }
            combo = (short) Math.min(30000, combo + toAdd);
            chr.setLastCombo(curr);
            chr.setCombo(combo);

            c.getSession().write(EtcPacket.testCombo(combo));

            switch (combo) { // Hackish method xD
                case 10:
                case 20:
                case 30:
                case 40:
                case 50:
                case 60:
                case 70:
                case 80:
                case 90:
                case 100:
                    if (chr.getSkillLevel(21000000) >= (combo / 10)) {
                        SkillFactory.getSkill(21000000).getEffect(combo / 10).applyComboBuff(chr, combo);
                    }
                    break;
            }
        }
    }

    public static final void UseItemEffect(final int itemId, final MapleClient c, final MapleCharacter chr) {
        final Item toUse = chr.getInventory(MapleInventoryType.CASH).findById(itemId);
        if (toUse == null || toUse.getItemId() != itemId || toUse.getQuantity() < 1) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (itemId != 5510000) {
            chr.setItemEffect(itemId);
        }
        chr.getMap().broadcastMessage(chr, EtcPacket.itemEffect(chr.getId(), itemId), false);
    }

    public static final void CancelItemEffect(final int id, final MapleCharacter chr) {
        chr.cancelEffect(
                MapleItemInformationProvider.getInstance().getItemEffect(-id), false, -1);
    }

    public static final void CancelBuffHandler(final int sourceid, final MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        final Skill skill = SkillFactory.getSkill(sourceid);

        if (skill.isChargeSkill()) {
            chr.setKeyDownSkill_Time(0);
            chr.getMap().broadcastMessage(chr, EtcPacket.skillCancel(chr, sourceid), false);
        } else {
            chr.cancelEffect(skill.getEffect(1), false, -1);
        }
    }

    public static final void CancelMech(final LittleEndianAccessor slea, final MapleCharacter chr) {
        if (chr == null) {
            return;
        }
        int sourceid = slea.readInt();
        if (sourceid % 10000 < 1000 && SkillFactory.getSkill(sourceid) == null) {
            sourceid += 1000;
        }
        final Skill skill = SkillFactory.getSkill(sourceid);
        if (skill == null) { //not sure
            return;
        }
        if (skill.isChargeSkill()) {
            chr.setKeyDownSkill_Time(0);
            chr.getMap().broadcastMessage(chr, EtcPacket.skillCancel(chr, sourceid), false);
        } else {
            chr.cancelEffect(skill.getEffect(slea.readByte()), false, -1);
        }
    }

    public static final void QuickSlot(final LittleEndianAccessor slea, final MapleCharacter chr) {
        if (slea.available() == 32 && chr != null) {
            final StringBuilder ret = new StringBuilder();
            for (int i = 0; i < 8; i++) {
                ret.append(slea.readInt()).append(",");
            }
            ret.deleteCharAt(ret.length() - 1);
            chr.getQuestNAdd(MapleQuest.getInstance(GameConstants.QUICK_SLOT)).setCustomData(ret.toString());
        }
    }

    public static final void SkillEffect(final LittleEndianAccessor slea, final MapleCharacter chr) {
        final int skillId = slea.readInt();
        if (skillId >= 91000000) { //guild/recipe? no
            chr.getClient().getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        final byte level = slea.readByte();
        final short direction = slea.readShort();
        final byte unk = slea.readByte(); // Added on v.82

        final Skill skill = SkillFactory.getSkill(GameConstants.getLinkedAranSkill(skillId));
        if (chr == null || skill == null || chr.getMap() == null) {
            return;
        }
        final int skilllevel_serv = chr.getTotalSkillLevel(skill);

        if (skilllevel_serv > 0 && skilllevel_serv == level && (skillId == 33101005 || skill.isChargeSkill())) {
            chr.setKeyDownSkill_Time(System.currentTimeMillis());
            if (skillId == 33101005) {
                chr.setLinkMid(slea.readInt(), 0);
            }
            chr.getMap().broadcastMessage(chr, EtcPacket.skillEffect(chr, skillId, level, direction, unk), false);
        }
    }

    public static final void SpecialMove(final LittleEndianAccessor slea, final MapleClient c, final MapleCharacter chr) {
        if (chr == null || chr.hasBlockedInventory() || chr.getMap() == null || slea.available() < 9) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        slea.skip(4); // Old X and Y
        int skillid = slea.readInt();

        if (skillid >= 91000000) { //guild/recipe? no
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (skillid == 23111008) { //spirits, hack
            skillid += Randomizer.nextInt(3);
        }
        int skillLevel = slea.readByte();
        final Skill skill = SkillFactory.getSkill(skillid);
        if (skill == null || (GameConstants.isAngel(skillid) && (chr.getStat().equippedSummon % 10000) != (skillid % 10000)) || (chr.inPVP() && skill.isPVPDisabled())) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (chr.getTotalSkillLevel(GameConstants.getLinkedAranSkill(skillid)) <= 0 || chr.getTotalSkillLevel(GameConstants.getLinkedAranSkill(skillid)) != skillLevel) {
            if (!GameConstants.isIceKnightSkill(skillid) && !GameConstants.isMulungSkill(skillid) && !GameConstants.isPyramidSkill(skillid) && chr.getTotalSkillLevel(GameConstants.getLinkedAranSkill(skillid)) <= 0) {//PVP冰騎士支援
                //c.getSession().close();
                return;
            }
            if (GameConstants.isMulungSkill(skillid)) {
                if (chr.getMapId() / 10000 != 92502) {
                    return;
                } else {
                    if (chr.getMulungEnergy() < 10000) {
                        return;
                    }
                    chr.mulung_EnergyModify(false);
                }
            } else if (GameConstants.isPyramidSkill(skillid)) {
                if (chr.getMapId() / 10000 != 92602 && chr.getMapId() / 10000 != 92601) {
                    return;
                }
            }
        }
        if (GameConstants.isEventMap(chr.getMapId())) {
            for (MapleEventType t : MapleEventType.values()) {
                final MapleEvent e = ChannelServer.getInstance(chr.getClient().getChannel()).getEvent(t);
                if (e.isRunning() && !chr.isGM()) {
                    for (int i : e.getType().mapids) {
                        if (chr.getMapId() == i) {
                            chr.dropMessage(5, "You may not use that here.");
                            return; //non-skill cannot use
                        }
                    }
                }
            }
        }
        skillLevel = chr.getTotalSkillLevel(GameConstants.getLinkedAranSkill(skillid));
        final MapleStatEffect effect = chr.inPVP() ? skill.getPVPEffect(skillLevel) : skill.getEffect(skillLevel);
        if (effect.isMPRecovery() && chr.getStat().getHp() < (chr.getStat().getMaxHp() / 100) * 10) { //less than 10% hp
            c.getPlayer().dropMessage(5, "You do not have the HP to use this skill.");
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (effect.getCooldown(chr) > 0 && !chr.isGM()) {
            if (chr.skillisCooling(skillid)) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            if (skillid != 5221006 && skillid != 35111002) { // Battleship
                c.getSession().write(EtcPacket.skillCooldown(skillid, effect.getCooldown(chr)));
                chr.addCooldown(skillid, System.currentTimeMillis(), effect.getCooldown(chr) * 1000);
            }
        }
        //chr.checkFollow(); //not msea-like but ALEX'S WISHES
        switch (skillid) {
            case 1121001:
            case 1221001:
            case 1321001:
            case 9001020: // GM magnet
            case 9101020:
            case 31111003:
                final byte number_of_mobs = slea.readByte();
                slea.skip(3);
                for (int i = 0; i < number_of_mobs; i++) {
                    int mobId = slea.readInt();

                    final MapleMonster mob = chr.getMap().getMonsterByOid(mobId);
                    if (mob != null) {
//			chr.getMap().broadcastMessage(chr, CField.showMagnet(mobId, slea.readByte()), chr.getTruePosition());
                        mob.switchController(chr, mob.isControllerHasAggro());
                        mob.applyStatus(chr, new MonsterStatusEffect(MonsterStatus.STUN, 1, skillid, null, false), false, effect.getDuration(), true, effect);
                    }
                }
                chr.getMap().broadcastMessage(chr, EffectPacket.showBuffeffect(chr.getId(), skillid, 1, chr.getLevel(), skillLevel, slea.readByte()), chr.getTruePosition());
                c.getSession().write(MaplePacketCreator.enableActions());
                break;
            case 30001061: //capture
                int mobID = slea.readInt();
                MapleMonster mob = chr.getMap().getMonsterByOid(mobID);
                if (mob != null) {
                    boolean success = mob.getHp() <= mob.getMobMaxHp() / 2 && mob.getId() >= 9304000 && mob.getId() < 9305000;
                    chr.getMap().broadcastMessage(chr, EffectPacket.showBuffeffect(chr.getId(), skillid, 1, chr.getLevel(), skillLevel, (byte) (success ? 1 : 0)), chr.getTruePosition());
                    if (success) {
                        chr.getQuestNAdd(MapleQuest.getInstance(GameConstants.JAGUAR)).setCustomData(String.valueOf((mob.getId() - 9303999) * 10));
                        chr.getMap().killMonster(mob, chr, true, false, (byte) 1);
                        chr.cancelEffectFromBuffStat(MapleBuffStat.MONSTER_RIDING);
                        c.getSession().write(MaplePacketCreator.updateJaguar(chr));
                    } else {
                        chr.dropMessage(5, "The monster has too much physical strength, so you cannot catch it.");
                    }
                }
                c.getSession().write(MaplePacketCreator.enableActions());
                break;
            case 30001062: //hunter call
                chr.dropMessage(5, "No monsters can be summoned. Capture a monster first."); //lool
                c.getSession().write(MaplePacketCreator.enableActions());
                break;
            case 33101005: //jaguar oshi
                mobID = chr.getFirstLinkMid();
                mob = chr.getMap().getMonsterByOid(mobID);
                chr.setKeyDownSkill_Time(0);
                chr.getMap().broadcastMessage(chr, EtcPacket.skillCancel(chr, skillid), false);
                if (mob != null) {
                    boolean success = mob.getStats().getLevel() < chr.getLevel() && mob.getId() < 9000000 && !mob.getStats().isBoss();
                    if (success) {
                        chr.getMap().broadcastMessage(MobPacket.suckMonster(mob.getObjectId(), chr.getId()));
                        chr.getMap().killMonster(mob, chr, false, false, (byte) -1);
                    } else {
                        chr.dropMessage(5, "The monster has too much physical strength, so you cannot catch it.");
                    }
                } else {
                    chr.dropMessage(5, "No monster was sucked. The skill failed.");
                }
                c.getSession().write(MaplePacketCreator.enableActions());
                break;
            case 4341003: //怪物大爆炸
                chr.setKeyDownSkill_Time(0);
                chr.getMap().broadcastMessage(chr, EtcPacket.skillCancel(chr, skillid), false);
            default:
                Point pos = null;
                if (slea.available() == 5 || slea.available() == 7) {
                    pos = slea.readPos();
                }
                ;
                //fallthrough intended
                if (effect.isMagicDoor()) { // Mystic Door
                    if (!FieldLimitType.MysticDoor.check(chr.getMap().getFieldLimit())) {
                        effect.applyTo(c.getPlayer(), pos);
                    } else {
                        c.getSession().write(MaplePacketCreator.enableActions());
                    }
                } else {
                    final int mountid = MapleStatEffect.parseMountInfo(c.getPlayer(), skill.getId());
                    if (mountid != 0 && mountid != GameConstants.getMountItem(skill.getId(), c.getPlayer()) && !c.getPlayer().isIntern() && c.getPlayer().getBuffedValue(MapleBuffStat.MONSTER_RIDING) == null && c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -122) == null) {
                        if (!GameConstants.isMountItemAvailable(mountid, c.getPlayer().getJob())) {
                            c.getSession().write(MaplePacketCreator.enableActions());
                            return;
                        }
                    }
                    effect.applyTo(c.getPlayer(), pos);
                }
                break;
        }
    }

    public static final void closeRangeAttack(final LittleEndianAccessor slea, final MapleClient c, final MapleCharacter chr, final boolean energy) {
        if (chr == null || (energy && chr.getBuffedValue(MapleBuffStat.ENERGY_CHARGE) == null && chr.getBuffedValue(MapleBuffStat.BODY_PRESSURE) == null && chr.getBuffedValue(MapleBuffStat.DARK_AURA) == null && chr.getBuffedValue(MapleBuffStat.TORNADO) == null && chr.getBuffedValue(MapleBuffStat.SUMMON) == null && chr.getBuffedValue(MapleBuffStat.RAINING_MINES) == null && chr.getBuffedValue(MapleBuffStat.TELEPORT_MASTERY) == null && chr.getBuffedValue(MapleBuffStat.GIANT_POTION) == null)) {
            return;
        }
        if (chr.hasBlockedInventory() || chr.getMap() == null) {
            return;
        }
        AttackInfo attack = DamageParse.parseDmgM(slea, chr);
        if (attack == null) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        final boolean mirror = chr.getBuffedValue(MapleBuffStat.SHADOWPARTNER) != null; //쉐파
        double maxdamage = chr.getStat().getCurrentMaxBaseDamage();
        final Item shield = c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem((short) -10);
        int attackCount = (shield != null && shield.getItemId() / 10000 == 134 ? 2 : 1);
        int skillLevel = 0;
        MapleStatEffect effect = null;
        Skill skill = null;

        if (attack.skill != 0) {
            skill = SkillFactory.getSkill(GameConstants.getLinkedAranSkill(attack.skill));
            if (SkillFactory.getSkill(attack.skill) == null) {
                skillLevel = 1;
            } else {
                skillLevel = chr.getSkillLevel(skill);
            }
            if (attack.skill == 31121010) { //데몬 익스플로젼 막타
                effect = attack.getAttackEffect(chr, chr.getSkillLevel(31121000), skill);
                DamageParse.applyAttack(attack, skill, c.getPlayer(), attackCount, maxdamage, effect, mirror ? AttackType.NON_RANGED_WITH_MIRROR : AttackType.NON_RANGED);
                return;
            }
            if (skill == null || (GameConstants.isAngel(attack.skill) && (chr.getStat().equippedSummon % 10000) != (attack.skill % 10000))) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            effect = attack.getAttackEffect(chr, skillLevel, skill);
            if (effect == null) {
                return;
            }
            if (GameConstants.isEventMap(chr.getMapId())) {
                for (MapleEventType t : MapleEventType.values()) {
                    final MapleEvent e = ChannelServer.getInstance(chr.getClient().getChannel()).getEvent(t);
                    if (e.isRunning() && !chr.isGM()) {
                        for (int i : e.getType().mapids) {
                            if (chr.getMapId() == i) {
                                chr.dropMessage(5, "You may not use that here.");
                                return; //non-skill cannot use
                            }
                        }
                    }
                }
            }
            maxdamage *= (effect.getDamage() + chr.getStat().getDamageIncrease(attack.skill)) / 100.0;
            attackCount = effect.getAttackCount();

            if (effect.getCooldown(chr) > 0 && !chr.isGM() && !energy) {
                if (chr.skillisCooling(attack.skill)) {
                    c.getSession().write(MaplePacketCreator.enableActions());
                    return;
                }
                c.getSession().write(EtcPacket.skillCooldown(attack.skill, effect.getCooldown(chr)));
                chr.addCooldown(attack.skill, System.currentTimeMillis(), effect.getCooldown(chr) * 1000);
            }
        }

        attack = DamageParse.Modify_AttackCrit(attack, chr, 1, effect);
        attackCount *= (mirror ? 2 : 1);
        if (!energy) {
            if ((chr.getMapId() == 109060000 || chr.getMapId() == 109060002 || chr.getMapId() == 109060004) && attack.skill == 0) {
                MapleSnowballs.hitSnowball(chr);
            }
            // handle combo orbconsume
            int numFinisherOrbs = 0;
            final Integer comboBuff = chr.getBuffedValue(MapleBuffStat.COMBO);

            if (isFinisher(attack.skill) > 0) { // finisher
                if (comboBuff != null) {
                    numFinisherOrbs = comboBuff.intValue() - 1;
                }
                if (numFinisherOrbs <= 0) {
                    return;
                }
                chr.handleOrbconsume(isFinisher(attack.skill));
                if (!GameConstants.GMS) {
                    maxdamage *= numFinisherOrbs;
                }
            }
        }
        chr.checkFollow();
        if (!chr.isHidden()) {
            chr.getMap().broadcastMessage(chr, EtcPacket.closeRangeAttack(chr.getId(), attack.tbyte, attack.skill, skillLevel, attack.display, attack.speed, attack.allDamage, energy, chr.getLevel(), chr.getStat().passive_mastery(), attack.unk, attack.charge), chr.getTruePosition());
        } else {
            chr.getMap().broadcastGMMessage(chr, EtcPacket.closeRangeAttack(chr.getId(), attack.tbyte, attack.skill, skillLevel, attack.display, attack.speed, attack.allDamage, energy, chr.getLevel(), chr.getStat().passive_mastery(), attack.unk, attack.charge), false);
        }

        DamageParse.applyAttack(attack, skill, c.getPlayer(), attackCount, maxdamage, effect, mirror ? AttackType.NON_RANGED_WITH_MIRROR : AttackType.NON_RANGED);
        WeakReference<MapleCharacter>[] clones = chr.getClones();
        for (int i = 0; i < clones.length; i++) {
            if (clones[i].get() != null) {
                final MapleCharacter clone = clones[i].get();
                final Skill skil2 = skill;
                final int skillLevel2 = skillLevel;
                final int attackCount2 = attackCount;
                final double maxdamage2 = maxdamage;
                final MapleStatEffect eff2 = effect;
                final AttackInfo attack2 = DamageParse.DivideAttack(attack, chr.isGM() ? 1 : 4);
                CloneTimer.getInstance().schedule(new Runnable() {

                    public void run() {
                        if (!clone.isHidden()) {
                            clone.getMap().broadcastMessage(EtcPacket.closeRangeAttack(clone.getId(), attack2.tbyte, attack2.skill, skillLevel2, attack2.display, attack2.speed, attack2.allDamage, energy, clone.getLevel(), clone.getStat().passive_mastery(), attack2.unk, attack2.charge));
                        } else {
                            clone.getMap().broadcastGMMessage(clone, EtcPacket.closeRangeAttack(clone.getId(), attack2.tbyte, attack2.skill, skillLevel2, attack2.display, attack2.speed, attack2.allDamage, energy, clone.getLevel(), clone.getStat().passive_mastery(), attack2.unk, attack2.charge), false);
                        }
                        DamageParse.applyAttack(attack2, skil2, chr, attackCount2, maxdamage2, eff2, mirror ? AttackType.NON_RANGED_WITH_MIRROR : AttackType.NON_RANGED);
                    }
                }, 500 * i + 500);
            }
        }
    }

    public static final void rangedAttack(final LittleEndianAccessor slea, final MapleClient c, final MapleCharacter chr) {
        if (chr == null) {
            return;
        }
        if (chr.hasBlockedInventory() || chr.getMap() == null) {
            return;
        }
        AttackInfo attack = DamageParse.parseDmgR(slea, chr);
        if (attack == null) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        int bulletCount = 1, skillLevel = 0;
        MapleStatEffect effect = null;
        Skill skill = null;
        boolean AOE = attack.skill == 4111004;
        boolean noBullet = (chr.getJob() >= 3500 && chr.getJob() <= 3512) || GameConstants.isCannon(chr.getJob()) || GameConstants.isMercedes(chr.getJob());
        if (attack.skill != 0) {
            skill = SkillFactory.getSkill(GameConstants.getLinkedAranSkill(attack.skill));
            if (skill == null || (GameConstants.isAngel(attack.skill) && (chr.getStat().equippedSummon % 10000) != (attack.skill % 10000))) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            skillLevel = chr.getTotalSkillLevel(skill);
            effect = attack.getAttackEffect(chr, skillLevel, skill);
            if (effect == null) {
                return;
            }
            if (GameConstants.isEventMap(chr.getMapId())) {
                for (MapleEventType t : MapleEventType.values()) {
                    final MapleEvent e = ChannelServer.getInstance(chr.getClient().getChannel()).getEvent(t);
                    if (e.isRunning() && !chr.isGM()) {
                        for (int i : e.getType().mapids) {
                            if (chr.getMapId() == i) {
                                chr.dropMessage(5, "You may not use that here.");
                                return; //non-skill cannot use
                            }
                        }
                    }
                }
            }
            switch (attack.skill) {
                case 13101005:
                case 21110004: // Ranged but uses attackcount instead
                case 14101006: // Vampure
                case 21120006:
                case 11101004:
                case 1077:
                case 1078:
                case 1079:
                case 11077:
                case 11078:
                case 11079:
                case 15111006: //스파크
                case 15111007:
                case 13111007: //Wind Shot
                case 33101007:
                case 33101002:
                case 33121002:
                case 33121001:
                case 21100004:
                case 21110011:
                case 21100007:
                case 21000004:
                case 5121002:
                case 4121003:
                case 4221003:
                case 3111004: // arrow rain
                case 13111000: // arrow rain
                case 3211004: // arrow eruption
                    AOE = true;
                    bulletCount = effect.getAttackCount();
                    break;
                case 35121005:
                case 35111004:
                case 35121013:
                    AOE = true;
                    bulletCount = 6;
                    break;
                default:
                    bulletCount = effect.getBulletCount();
                    break;
            }
            if (noBullet && effect.getBulletCount() < effect.getAttackCount()) {
                bulletCount = effect.getAttackCount();
            }
            if (effect.getCooldown(chr) > 0 && ((attack.skill != 35111004 && attack.skill != 35121013) || chr.getBuffSource(MapleBuffStat.MECH_CHANGE) != attack.skill)) {
                //System.out.println("cooldown > 0");
                if (chr.skillisCooling(attack.skill)) {
                    //System.out.println("cooldown > 0 return");
                    c.getSession().write(MaplePacketCreator.enableActions());
                    return;
                }
                c.getSession().write(EtcPacket.skillCooldown(attack.skill, effect.getCooldown(chr)));
                chr.addCooldown(attack.skill, System.currentTimeMillis(), effect.getCooldown(chr) * 1000);
            }
        }

        attack = DamageParse.Modify_AttackCrit(attack, chr, 2, effect);
        final Integer ShadowPartner = chr.getBuffedValue(MapleBuffStat.SHADOWPARTNER);
        if (ShadowPartner != null) {
            bulletCount *= 2;
        }
        int projectile = 0, visProjectile = 0;
        if (!AOE && chr.getBuffedValue(MapleBuffStat.SOULARROW) == null && !noBullet) {
            Item ipp = chr.getInventory(MapleInventoryType.USE).getItem(attack.slot);
            if (ipp == null) {
                return;
            }
            projectile = ipp.getItemId();

            if (attack.csstar > 0) {
                if (chr.getInventory(MapleInventoryType.CASH).getItem(attack.csstar) == null) {
                    return;
                }
                visProjectile = chr.getInventory(MapleInventoryType.CASH).getItem(attack.csstar).getItemId();
            } else {
                visProjectile = projectile;
            }
            // Handle bulletcount
            if (chr.getBuffedValue(MapleBuffStat.SPIRIT_CLAW) == null) {
                int bulletConsume = bulletCount;
                if (effect != null && effect.getBulletConsume() != 0) {
                    bulletConsume = effect.getBulletConsume() * (ShadowPartner != null ? 2 : 1);
                }
                if (chr.getJob() == 412 && bulletConsume > 0 && ipp.getQuantity() < MapleItemInformationProvider.getInstance().getSlotMax(projectile)) {
                    final Skill expert = SkillFactory.getSkill(4120010);
                    if (chr.getTotalSkillLevel(expert) > 0) {
                        final MapleStatEffect eff = expert.getEffect(chr.getTotalSkillLevel(expert));
                        if (eff.makeChanceResult()) {
                            ipp.setQuantity((short) (ipp.getQuantity() + 1));
                            c.getSession().write(InventoryPacket.updateInventorySlot(MapleInventoryType.USE, ipp, false));
                            bulletConsume = 0; //regain a star after using
                            c.getSession().write(InventoryPacket.getInventoryStatus());
                        }
                    }
                }
                if (bulletConsume > 0) {
                    if (!MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, projectile, bulletConsume, false, true)) {
                        chr.dropMessage(5, "You do not have enough arrows/bullets/stars.");
                        return;
                    }
                }
            }
        } else if (chr.getJob() >= 3500 && chr.getJob() <= 3512) {
            visProjectile = 2333000;
        } else if (GameConstants.isCannon(chr.getJob())) {
            visProjectile = 2333001;
        }
        double basedamage;
        int projectileWatk = 0;
        if (projectile != 0) {
            projectileWatk = MapleItemInformationProvider.getInstance().getWatkForProjectile(projectile);
        }
        final PlayerStats statst = chr.getStat();
        switch (attack.skill) {
            case 4001344: // Lucky Seven
            case 4121007: // Triple Throw
            case 14001004: // Lucky seven
            case 14111005: // Triple Throw
                basedamage = Math.max(statst.getCurrentMaxBaseDamage(), (float) ((float) ((statst.getTotalLuk() * 5.0f) * (statst.getTotalWatk() + projectileWatk)) / 100));
                break;
            case 4111004: // Shadow Meso
//		basedamage = ((effect.getMoneyCon() * 10) / 100) * effect.getProb(); // Not sure
                basedamage = 53000;
                break;
            default:
                basedamage = statst.getCurrentMaxBaseDamage();
                switch (attack.skill) {
                    case 3101005: // arrowbomb is hardcore like that
                        basedamage *= effect.getX() / 100.0;
                        break;
                }
                break;
        }
        if (effect != null) {
            basedamage *= (effect.getDamage() + statst.getDamageIncrease(attack.skill)) / 100.0;

            int money = effect.getMoneyCon();
            if (money != 0) {
                if (money > chr.getMeso()) {
                    money = chr.getMeso();
                }
                chr.gainMeso(-money, false);
            }
        }
        chr.checkFollow();
        if (!chr.isHidden()) {
            if (attack.skill == 3211006) {
                chr.getMap().broadcastMessage(chr, EtcPacket.strafeAttack(chr.getId(), attack.tbyte, attack.skill, skillLevel, attack.display, attack.speed, visProjectile, attack.allDamage, attack.position, chr.getLevel(), chr.getStat().passive_mastery(), attack.unk, chr.getTotalSkillLevel(3220010)), chr.getTruePosition());
            } else {
                chr.getMap().broadcastMessage(chr, EtcPacket.rangedAttack(chr.getId(), attack.tbyte, attack.skill, skillLevel, attack.display, attack.speed, visProjectile, attack.allDamage, attack.position, chr.getLevel(), chr.getStat().passive_mastery(), attack.unk), chr.getTruePosition());
            }
        } else {
            if (attack.skill == 3211006) {
                chr.getMap().broadcastGMMessage(chr, EtcPacket.strafeAttack(chr.getId(), attack.tbyte, attack.skill, skillLevel, attack.display, attack.speed, visProjectile, attack.allDamage, attack.position, chr.getLevel(), chr.getStat().passive_mastery(), attack.unk, chr.getTotalSkillLevel(3220010)), false);
            } else {
                chr.getMap().broadcastGMMessage(chr, EtcPacket.rangedAttack(chr.getId(), attack.tbyte, attack.skill, skillLevel, attack.display, attack.speed, visProjectile, attack.allDamage, attack.position, chr.getLevel(), chr.getStat().passive_mastery(), attack.unk), false);
            }
        }
        DamageParse.applyAttack(attack, skill, chr, bulletCount, basedamage, effect, ShadowPartner != null ? AttackType.RANGED_WITH_SHADOWPARTNER : AttackType.RANGED);

        WeakReference<MapleCharacter>[] clones = chr.getClones();
        for (int i = 0; i < clones.length; i++) {
            if (clones[i].get() != null) {
                final MapleCharacter clone = clones[i].get();
                final Skill skil2 = skill;
                final MapleStatEffect eff2 = effect;
                final double basedamage2 = basedamage;
                final int bulletCount2 = bulletCount;
                final int visProjectile2 = visProjectile;
                final int skillLevel2 = skillLevel;
                final AttackInfo attack2 = DamageParse.DivideAttack(attack, chr.isGM() ? 1 : 4);
                CloneTimer.getInstance().schedule(new Runnable() {

                    public void run() {
                        if (!clone.isHidden()) {
                            if (attack2.skill == 3211006) {
                                clone.getMap().broadcastMessage(EtcPacket.strafeAttack(clone.getId(), attack2.tbyte, attack2.skill, skillLevel2, attack2.display, attack2.speed, visProjectile2, attack2.allDamage, attack2.position, clone.getLevel(), clone.getStat().passive_mastery(), attack2.unk, chr.getTotalSkillLevel(3220010)));
                            } else {
                                clone.getMap().broadcastMessage(EtcPacket.rangedAttack(clone.getId(), attack2.tbyte, attack2.skill, skillLevel2, attack2.display, attack2.speed, visProjectile2, attack2.allDamage, attack2.position, clone.getLevel(), clone.getStat().passive_mastery(), attack2.unk));
                            }
                        } else {
                            if (attack2.skill == 3211006) {
                                clone.getMap().broadcastGMMessage(clone, EtcPacket.strafeAttack(clone.getId(), attack2.tbyte, attack2.skill, skillLevel2, attack2.display, attack2.speed, visProjectile2, attack2.allDamage, attack2.position, clone.getLevel(), clone.getStat().passive_mastery(), attack2.unk, chr.getTotalSkillLevel(3220010)), false);
                            } else {
                                clone.getMap().broadcastGMMessage(clone, EtcPacket.rangedAttack(clone.getId(), attack2.tbyte, attack2.skill, skillLevel2, attack2.display, attack2.speed, visProjectile2, attack2.allDamage, attack2.position, clone.getLevel(), clone.getStat().passive_mastery(), attack2.unk), false);
                            }
                        }
                        DamageParse.applyAttack(attack2, skil2, chr, bulletCount2, basedamage2, eff2, AttackType.RANGED);
                    }
                }, 500 * i + 500);
            }
        }
    }

    public static final void MagicDamage(final LittleEndianAccessor slea, final MapleClient c, final MapleCharacter chr) {
        if (chr == null || chr.hasBlockedInventory() || chr.getMap() == null) {
            return;
        }
        AttackInfo attack = DamageParse.parseDmgMa(slea, chr);
        if (attack == null) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        final Skill skill = SkillFactory.getSkill(GameConstants.getLinkedAranSkill(attack.skill));
        if (skill == null || (GameConstants.isAngel(attack.skill) && (chr.getStat().equippedSummon % 10000) != (attack.skill % 10000))) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        final int skillLevel = chr.getTotalSkillLevel(skill);
        final MapleStatEffect effect = attack.getAttackEffect(chr, skillLevel, skill);
        if (effect == null) {
            return;
        }
        attack = DamageParse.Modify_AttackCrit(attack, chr, 3, effect);
        if (GameConstants.isEventMap(chr.getMapId())) {
            for (MapleEventType t : MapleEventType.values()) {
                final MapleEvent e = ChannelServer.getInstance(chr.getClient().getChannel()).getEvent(t);
                if (e.isRunning() && !chr.isGM()) {
                    for (int i : e.getType().mapids) {
                        if (chr.getMapId() == i) {
                            chr.dropMessage(5, "You may not use that here.");
                            return; //non-skill cannot use
                        }
                    }
                }
            }
        }
        double maxdamage = chr.getStat().getCurrentMaxBaseDamage() * (effect.getDamage() + chr.getStat().getDamageIncrease(attack.skill)) / 100.0;
        if (GameConstants.isPyramidSkill(attack.skill)) {
            maxdamage = 1;
        } else if (GameConstants.isBeginnerJob(skill.getId() / 10000) && skill.getId() % 10000 == 1000) {
            maxdamage = 40;
        }
        if (effect.getCooldown(chr) > 0 && !chr.isGM()) {
            if (chr.skillisCooling(attack.skill)) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            c.getSession().write(EtcPacket.skillCooldown(attack.skill, effect.getCooldown(chr)));
            chr.addCooldown(attack.skill, System.currentTimeMillis(), effect.getCooldown(chr) * 1000);
        }
        chr.checkFollow();
        if (!chr.isHidden()) {
            chr.getMap().broadcastMessage(chr, EtcPacket.magicAttack(chr.getId(), attack.tbyte, attack.skill, skillLevel, attack.display, attack.speed, attack.allDamage, attack.charge, chr.getLevel(), attack.unk), chr.getTruePosition());
        } else {
            chr.getMap().broadcastGMMessage(chr, EtcPacket.magicAttack(chr.getId(), attack.tbyte, attack.skill, skillLevel, attack.display, attack.speed, attack.allDamage, attack.charge, chr.getLevel(), attack.unk), false);
        }
        DamageParse.applyAttackMagic(attack, skill, c.getPlayer(), effect, maxdamage);
        WeakReference<MapleCharacter>[] clones = chr.getClones();
        for (int i = 0; i < clones.length; i++) {
            if (clones[i].get() != null) {
                final MapleCharacter clone = clones[i].get();
                final Skill skil2 = skill;
                final MapleStatEffect eff2 = effect;
                final double maxd = maxdamage;
                final int skillLevel2 = skillLevel;
                final AttackInfo attack2 = DamageParse.DivideAttack(attack, chr.isGM() ? 1 : 4);
                CloneTimer.getInstance().schedule(new Runnable() {

                    public void run() {
                        if (!clone.isHidden()) {
                            clone.getMap().broadcastMessage(EtcPacket.magicAttack(clone.getId(), attack2.tbyte, attack2.skill, skillLevel2, attack2.display, attack2.speed, attack2.allDamage, attack2.charge, clone.getLevel(), attack2.unk));
                        } else {
                            clone.getMap().broadcastGMMessage(clone, EtcPacket.magicAttack(clone.getId(), attack2.tbyte, attack2.skill, skillLevel2, attack2.display, attack2.speed, attack2.allDamage, attack2.charge, clone.getLevel(), attack2.unk), false);
                        }
                        DamageParse.applyAttackMagic(attack2, skil2, chr, eff2, maxd);
                    }
                }, 500 * i + 500);
            }
        }
    }

    public static final void DropMeso(final int meso, final MapleCharacter chr, boolean anytime) {
        if (anytime == false) {
            if (!chr.isAlive() || (meso < 10 || meso > 50000) ||(meso > chr.getMeso())) {
                chr.getClient().getSession().write(MaplePacketCreator.enableActions());
                return;
            }
        }
        
        chr.gainMeso(-meso, false, true, true);
        chr.getMap().spawnMesoDrop(meso, chr.getTruePosition(), chr, chr, true, (byte) 0);
        if (anytime == false) {
            chr.getCheatTracker().checkDrop(true);
        }
    }

    public static final void ChangeAndroidEmotion(final int emote, final MapleCharacter chr) {
        if (emote > 0 && chr != null && chr.getMap() != null && !chr.isHidden() && emote <= 17 && chr.getAndroid() != null) { //O_o
            chr.getMap().broadcastMessage(EtcPacket.showAndroidEmotion(chr.getId(), emote));
        }
    }

    public static final void MoveAndroid(final LittleEndianAccessor slea, final MapleClient c, final MapleCharacter chr) {
        slea.skip(8);
        final List<LifeMovementFragment> res = MovementParse.parseMovement(slea, 3);

        if (res != null && chr != null && res.size() != 0 && chr.getMap() != null && chr.getAndroid() != null) { // map crash hack
            final Point pos = new Point(chr.getAndroid().getPos());
            chr.getAndroid().updatePosition(res);
            chr.getMap().broadcastMessage(chr, EtcPacket.moveAndroid(chr.getId(), pos, res), false);
        }
    }

    public static final void ChangeEmotion(final int emote, final MapleCharacter chr) {
        if (emote > 7) {
            final int emoteid = 5159992 + emote;
            final MapleInventoryType type = GameConstants.getInventoryType(emoteid);
            if (chr.getInventory(type).findById(emoteid) == null) {
                chr.getCheatTracker().registerOffense(CheatingOffense.USING_UNAVAILABLE_ITEM, Integer.toString(emoteid));
                return;
            }
        }
        if (emote > 0 && chr != null && chr.getMap() != null && !chr.isHidden()) { //O_o
            chr.getMap().broadcastMessage(chr, EtcPacket.facialExpression(chr, emote), false);
            WeakReference<MapleCharacter>[] clones = chr.getClones();
            for (int i = 0; i < clones.length; i++) {
                if (clones[i].get() != null) {
                    final MapleCharacter clone = clones[i].get();
                    CloneTimer.getInstance().schedule(new Runnable() {

                        public void run() {
                            clone.getMap().broadcastMessage(EtcPacket.facialExpression(clone, emote));
                        }
                    }, 500 * i + 500);
                }
            }
        }
    }

    public static final void Heal(final LittleEndianAccessor slea, final MapleCharacter chr) {
        if (chr == null) {
            return;
        }
        chr.updateTick(slea.readInt());
        if (slea.available() >= 8) {
            slea.skip(slea.available() >= 12 && GameConstants.GMS ? 8 : 4);
        }
        int healHP = slea.readShort();
        int healMP = slea.readShort();

        final PlayerStats stats = chr.getStat();

        if (stats.getHp() <= 0) {
            return;
        }
        final long now = System.currentTimeMillis();
        if (healHP != 0 && chr.canHP(now + 1000)) {
            if (healHP > stats.getHealHP()) {
                //chr.getCheatTracker().registerOffense(CheatingOffense.REGEN_HIGH_HP, String.valueOf(healHP));
                healHP = (int) stats.getHealHP();
            }
            chr.addHP(healHP);
        }
        if (healMP != 0 && !GameConstants.isDemon(chr.getJob()) && chr.canMP(now + 1000)) { //just for lag
            if (healMP > stats.getHealMP()) {
                //chr.getCheatTracker().registerOffense(CheatingOffense.REGEN_HIGH_MP, String.valueOf(healMP));
                healMP = (int) stats.getHealMP();
            }
            chr.addMP(healMP);
        }
        if (GameConstants.isDemon(chr.getJob())) {
            int skilllevel = chr.getSkillLevel(31110009);
            chr.addMP(skilllevel * 2);
        }
    }

    public static final void MovePlayer(final LittleEndianAccessor slea, final MapleClient c, final MapleCharacter chr) {
        //System.out.println("Move Player " + slea.toString());
        slea.skip(1); // portal count
        slea.skip(4); // crc?
        slea.skip(4); // tickcount
        slea.skip(4); // position
        slea.skip(4);
        if (chr == null) {
            return;
        }
        final Point Original_Pos = chr.getPosition(); // 4 bytes Added on v.80 MSEA
        List<LifeMovementFragment> res;
        try {
            res = MovementParse.parseMovement(slea, 1);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("AIOBE Type1:\n" + slea.toString(true));
            return;
        }

        if (res != null && c.getPlayer().getMap() != null) {
            if (slea.available() < 11 || slea.available() > 26) { // estimation, should be exact 18
                return;
            }
            final MapleMap map = c.getPlayer().getMap();

            if (chr.isHidden()) {
                chr.setLastRes(res);
                c.getPlayer().getMap().broadcastGMMessage(chr, EtcPacket.movePlayer(chr.getId(), res, Original_Pos), false);
            } else {
                c.getPlayer().getMap().broadcastMessage(c.getPlayer(), EtcPacket.movePlayer(chr.getId(), res, Original_Pos), false);
            }

            MovementParse.updatePosition(res, chr, 0);
            final Point pos = chr.getTruePosition();
            map.movePlayer(chr, pos);
            if (chr.getFollowId() > 0 && chr.isFollowOn() && chr.isFollowInitiator()) {
                final MapleCharacter fol = map.getCharacterById(chr.getFollowId());
                if (fol != null) {
                    final Point original_pos = fol.getPosition();
                    fol.getClient().getSession().write(EtcPacket.moveFollow(Original_Pos, original_pos, pos, res));
                    MovementParse.updatePosition(res, fol, 0);
                    map.movePlayer(fol, pos);
                    map.broadcastMessage(fol, EtcPacket.movePlayer(fol.getId(), res, original_pos), false);
                } else {
                    chr.checkFollow();
                }
            }
            WeakReference<MapleCharacter>[] clones = chr.getClones();
            for (int i = 0; i < clones.length; i++) {
                if (clones[i].get() != null) {
                    final MapleCharacter clone = clones[i].get();
                    final List<LifeMovementFragment> res3 = res;
                    CloneTimer.getInstance().schedule(new Runnable() {

                        public void run() {
                            try {
                                if (clone.getMap() == map) {
                                    if (clone.isHidden()) {
                                        map.broadcastGMMessage(clone, EtcPacket.movePlayer(clone.getId(), res3, Original_Pos), false);
                                    } else {
                                        map.broadcastMessage(clone, EtcPacket.movePlayer(clone.getId(), res3, Original_Pos), false);
                                    }
                                    MovementParse.updatePosition(res3, clone, 0);
                                    map.movePlayer(clone, pos);
                                }
                            } catch (Exception e) {
                                //very rarely swallowed
                            }
                        }
                    }, 500 * i + 500);
                }
            }
            int count = c.getPlayer().getFallCounter();
            final boolean samepos = pos.y > c.getPlayer().getOldPosition().y && Math.abs(pos.x - c.getPlayer().getOldPosition().x) < 5;
            if (samepos && (pos.y > (map.getBottom() + 250) || map.getFootholds().findBelow(pos) == null)) {
                if (count > 5) {
                    c.getPlayer().changeMap(map, map.getPortal(0));
                    c.getPlayer().setFallCounter(0);
                } else {
                    c.getPlayer().setFallCounter(++count);
                }
            } else if (count > 0) {
                c.getPlayer().setFallCounter(0);
            }
            c.getPlayer().setOldPosition(pos);
            if (!samepos && c.getPlayer().getBuffSource(MapleBuffStat.DARK_AURA) == 32120000) { //dark aura
                c.getPlayer().getStatForBuff(MapleBuffStat.DARK_AURA).applyMonsterBuff(c.getPlayer());
            } else if (!samepos && c.getPlayer().getBuffSource(MapleBuffStat.YELLOW_AURA) == 32120001) { //yellow aura
                c.getPlayer().getStatForBuff(MapleBuffStat.YELLOW_AURA).applyMonsterBuff(c.getPlayer());
            }
            final PokemonMap mapp = BattleConstants.getMap(c.getPlayer().getMapId());
            if (!samepos && c.getPlayer().getBattler(0) != null && mapp != null && !c.getPlayer().isHidden() && !c.getPlayer().hasBlockedInventory() && Randomizer.nextInt(c.getPlayer().getBattler(0).getAbility() == PokemonAbility.Stench ? 20 : (c.getPlayer().getBattler(0).getAbility() == PokemonAbility.Illuminate ? 5 : 10)) == 0) { //1/20 chance of encounter
                LinkedList<Pair<Integer, Integer>> set = BattleConstants.getMobs(mapp);
                if (set == null) { // not loaded
                    return;
                }
                Collections.shuffle(set);
                int resulting = 0;
                for (Pair<Integer, Integer> i : set) {
                    if (Randomizer.nextInt(i.right) == 0) { //higher evolutions have lower chance
                        resulting = i.left;
                        break;
                    }
                }
                if (resulting > 0) {
                    final PokemonBattle wild = new PokemonBattle(c.getPlayer(), resulting, mapp);
                    c.getPlayer().changeMap(wild.getMap(), wild.getMap().getPortal(mapp.portalId));
                    if (c.getPlayer() != null) { //... ugh hate dcs
                        c.getPlayer().setBattle(wild);
                        wild.initiate(c.getPlayer(), mapp);
                    }
                }
            }
        }
    }

    public static final void ChangeMapSpecial(final String portal_name, final MapleClient c, final MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        final MaplePortal portal = chr.getMap().getPortal(portal_name);
//	slea.skip(2);

        if (portal != null && !chr.hasBlockedInventory()) {
            portal.enterPortal(c);
        } else {
            c.getSession().write(MaplePacketCreator.enableActions());
        }
    }

    public static final void ChangeMap(final LittleEndianAccessor slea, final MapleClient c, final MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        if (slea.available() != 0) {
            //slea.skip(6); //D3 75 00 00 00 00
            slea.readByte(); // 1 = from dying 2 = regular portals
            int targetid = slea.readInt(); // FF FF FF FF
            if (GameConstants.GMS) { //todo jump?
                slea.readInt();
            }
            final MaplePortal portal = chr.getMap().getPortal(slea.readMapleAsciiString());
            if (slea.available() >= 7) {
                chr.updateTick(slea.readInt());
            }
            slea.skip(1);
            final boolean wheel = slea.readShort() > 0 && !GameConstants.isEventMap(chr.getMapId()) && chr.haveItem(5510000, 1, false, true) && chr.getMapId() / 1000000 != 925;

            if (targetid != -1 && !chr.isAlive()) {
                chr.setStance(0);
                if (chr.getEventInstance() != null && chr.getEventInstance().revivePlayer(chr) && chr.isAlive()) {
                    return;
                }
                if (chr.getPyramidSubway() != null) {
                    chr.getStat().setHp((short) 50, chr);
                    chr.getPyramidSubway().fail(chr);
                    return;
                }

                if (!wheel) {
                    chr.getStat().setHp((short) 50, chr);

                    final MapleMap to = chr.getMap().getReturnMap();
                    chr.changeMap(to, to.getPortal(0));
                } else {
                    c.getSession().write(EffectPacket.useWheel((byte) (chr.getInventory(MapleInventoryType.CASH).countById(5510000) - 1)));
                    chr.getStat().setHp(((chr.getStat().getMaxHp() / 10) * 4), chr);//比例降低
                    MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, 5510000, 1, true, false);

                    final MapleMap to = chr.getMap();
                    chr.changeMap(to, to.getPortal(0));
                }
            } else if (targetid != -1 && chr.isIntern()) {
                final MapleMap to = ChannelServer.getInstance(c.getChannel()).getMapFactory().getMap(targetid);
                if (to != null) {
                    chr.changeMap(to, to.getPortal(0));
                } else {
                    chr.dropMessage(5, "Map is NULL. Use !warp <mapid> instead.");
                }
            } else if (targetid != -1 && !chr.isIntern()) {
                final int divi = chr.getMapId() / 100;
                boolean unlock = false, warp = false;
                if (divi == 9130401) { // Only allow warp if player is already in Intro map, or else = hack
                    warp = targetid / 100 == 9130400 || targetid / 100 == 9130401; // Cygnus introduction
                    if (targetid / 10000 != 91304) {
                        warp = true;
                        unlock = true;
                        targetid = 130030000;
                    }
                } else if (divi == 9130400) { // Only allow warp if player is already in Intro map, or else = hack
                    warp = targetid / 100 == 9130400 || targetid / 100 == 9130401; // Cygnus introduction
                    if (targetid / 10000 != 91304) {
                        warp = true;
                        unlock = true;
                        targetid = 130030000;
                    }
                } else if (divi == 9140900) { // Aran Introductio
                    warp = targetid == 914090011 || targetid == 914090012 || targetid == 914090013 || targetid == 140090000;
                } else if (divi == 9120601 || (divi == 9120603 || divi == 9120604)) {//必須加括弧，否則只能識別前兩位
                    warp = targetid == 3000100 || targetid == 912060400 || targetid == 912060500;//砲手逃離荒島地圖動畫傳送
                    unlock = true;
                } else if (divi == 9101500) {
                    warp = targetid == 910150006 || targetid == 101050010;
                    unlock = true;
                } else if (divi == 9130500) {//聯盟動畫
                    warp = targetid == 913050001 || targetid == 913050002 || targetid == 913050003 || targetid == 913050010;
                    unlock = true;
                } else if (divi == 9140901 && targetid == 140000000) {
                    unlock = true;
                    warp = true;
                } else if (divi == 9240200 && targetid == 924020000) {
                    unlock = true;
                    warp = true;
                } else if (targetid == 980040000 && divi >= 9800410 && divi <= 9800450) {
                    warp = true;
                } else if (divi == 9140902 && (targetid == 140030000 || targetid == 140000000)) { //thing is. dont really know which one!
                    unlock = true;
                    warp = true;
                } else if (divi == 9000900 && targetid / 100 == 9000900 && targetid > chr.getMapId()) {
                    warp = true;
                } else if (divi / 1000 == 9000 && targetid / 100000 == 9000) {
                    unlock = targetid < 900090000 || targetid > 900090004; //1 movie
                    warp = true;
                } else if (divi / 10 == 1020 && targetid == 1020000) { // Adventurer movie clip Intro
                    unlock = true;
                    warp = true;
                } else if (chr.getMapId() == 900090101 && targetid == 100030100) {
                    unlock = true;
                    warp = true;
                } else if (chr.getMapId() == 2010000 && targetid == 104000000) {
                    //targetid = 123456789;
                    unlock = true;
                    warp = true;
                } else if (chr.getMapId() == 106020001 || chr.getMapId() == 106020502) {
                    if (targetid == (chr.getMapId() - 1)) {
                        unlock = true;
                        warp = true;
                    }
                } else if (chr.getMapId() == 0 && targetid == 10000) {
                   // targetid = 3;
                    unlock = true;
                    warp = true;
                } else if (chr.getMapId() == 931000011 && targetid == 931000012) {
                    unlock = true;
                    warp = true;
                } else if (chr.getMapId() == 931000021 && targetid == 931000030) {
                    unlock = true;
                    warp = true;
                } else if (chr.getMapId() == 931000632 && targetid == 310000000) {//任務23144播放動畫後返回埃德爾斯坦
                    unlock = true;
                    warp = true;
                }
                if (unlock) {
                    c.getSession().write(UIPacket.IntroDisableUI(false));
                    c.getSession().write(UIPacket.IntroLock(false));
                    c.getSession().write(MaplePacketCreator.enableActions());
                }
                if (warp) {
                    if (chr.getMapId() == 2010000) {
                        final MapleMap to = ChannelServer.getInstance(c.getChannel()).getMapFactory().getMap(104000000);
                        chr.changeMap(to, to.getPortal(0));
                    } else {
                        final MapleMap to = ChannelServer.getInstance(c.getChannel()).getMapFactory().getMap(targetid);
                        chr.changeMap(to, to.getPortal(0));
                    }
                }
            } else {
                if (portal != null && !chr.hasBlockedInventory()) {
                    portal.enterPortal(c);
                } else {
                    c.getSession().write(MaplePacketCreator.enableActions());
                }
            }
        }
    }

    public static final void InnerPortal(final LittleEndianAccessor slea, final MapleClient c, final MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        final MaplePortal portal = chr.getMap().getPortal(slea.readMapleAsciiString());
        final int toX = slea.readShort();
        final int toY = slea.readShort();
//	slea.readShort(); // Original X pos
//	slea.readShort(); // Original Y pos

        if (portal == null) {
            return;
        } else if (portal.getPosition().distanceSq(chr.getTruePosition()) > 22500 && !chr.isGM()) {
            chr.getCheatTracker().registerOffense(CheatingOffense.USING_FARAWAY_PORTAL);
            return;
        }
        chr.getMap().movePlayer(chr, new Point(toX, toY));
        chr.checkFollow();
    }

    public static final void snowBall(LittleEndianAccessor slea, MapleClient c) {
        //B2 00
        //01 [team]
        //00 00 [unknown]
        //89 [position]
        //01 [stage]
        c.getSession().write(MaplePacketCreator.enableActions());
        //empty, we do this in closerange
    }

    public static final void leftKnockBack(LittleEndianAccessor slea, final MapleClient c) {
        if (c.getPlayer().getMapId() / 10000 == 10906) { //must be in snowball map or else its like infinite FJ
            c.getSession().write(EtcPacket.leftKnockBack());
            c.getSession().write(MaplePacketCreator.enableActions());
        }
    }

    public static final void ReIssueMedal(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        final MapleQuest q = MapleQuest.getInstance(slea.readShort());
        final int itemid = q.getMedalItem();
        if (itemid != slea.readInt() || itemid <= 0 || q == null || chr.getQuestStatus(q.getId()) != 2) {
            c.getSession().write(UIPacket.reissueMedal(itemid, 4));
            return;
        }
        if (chr.haveItem(itemid, 1, true, true)) {
            c.getSession().write(UIPacket.reissueMedal(itemid, 3));
            return;
        }
        if (!MapleInventoryManipulator.checkSpace(c, itemid, (short) 1, "")) {
            c.getSession().write(UIPacket.reissueMedal(itemid, 2));
            return;
        }
        if (chr.getMeso() < 100) {
            c.getSession().write(UIPacket.reissueMedal(itemid, 1));
            return;
        }
        chr.gainMeso(-100, true, true);
        MapleInventoryManipulator.addById(c, itemid, (short) 1, "Redeemed item through medal quest " + q.getId() + " on " + FileoutputUtil.CurrentReadable_Date());
        c.getSession().write(UIPacket.reissueMedal(itemid, 0));
    }
}
