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

import client.*;
import java.util.Map;
import java.util.LinkedList;
import java.util.List;
import java.util.ArrayList;
import java.awt.Point;

import client.inventory.Equip;
import client.inventory.Equip.ScrollResult;
import client.inventory.Item;
import client.inventory.ItemFlag;
import client.inventory.MaplePet;
import client.inventory.MaplePet.PetFlag;
import client.inventory.MapleMount;
import client.inventory.MapleInventoryType;
import client.inventory.MapleInventory;
import client.MapleTrait.MapleTraitType;
import constants.GameConstants;
import client.anticheat.CheatingOffense;
import database.DatabaseConnection;
import handling.channel.ChannelServer;
import handling.world.MaplePartyCharacter;
import handling.world.World;
import java.awt.Rectangle;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collections;
import java.util.EnumMap;
import java.util.HashMap;
import java.util.Map.Entry;
import java.util.concurrent.locks.Lock;
import java.util.logging.Level;
import java.util.logging.Logger;
import scripting.AbstractPlayerInteraction;
import server.Randomizer;
import server.RandomRewards;
import server.MapleShopFactory;
import server.MapleStatEffect;
import server.MapleItemInformationProvider;
import server.MapleInventoryManipulator;
import server.StructRewardItem;
import server.quest.MapleQuest;
import server.maps.SavedLocationType;
import server.maps.FieldLimitType;
import server.maps.MapleMap;
import server.maps.MapleMapItem;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import server.life.MapleMonster;
import server.life.MapleLifeFactory;
import server.Timer;
import scripting.NPCScriptManager;
import server.StructFamiliar;
import server.StructItemOption;
import server.WheelData;
import server.events.MapleEvent;
import server.events.MapleEventType;
import server.maps.MapleMist;
import server.maps.MapleTVEffect;
import server.shops.AbstractPlayerStore;
import server.shops.HiredMerchant;
import server.shops.IMaplePlayerShop;
import server.shops.MaplePlayerShop;
import tools.FileoutputUtil;
import tools.Pair;
import tools.packet.MTSCSPacket;
import tools.packet.PetPacket;
import tools.data.LittleEndianAccessor;
import tools.packet.EtcPacket.EffectPacket;
import tools.packet.EtcPacket;
import tools.packet.EtcPacket.NPCPacket;
import tools.packet.MaplePacketCreator;
import tools.packet.MaplePacketCreator.InfoPacket;
import tools.packet.MaplePacketCreator.InventoryPacket;
import tools.packet.MobPacket;
import tools.packet.PlayerShopPacket;

public class InventoryHandler {

    public static final void ItemMove(final LittleEndianAccessor slea, final MapleClient c) {
        if (c.getPlayer().hasBlockedInventory()) { //hack
            return;
        }
        c.getPlayer().setScrolledPosition((short) 0);
        c.getPlayer().updateTick(slea.readInt());
        final MapleInventoryType type = MapleInventoryType.getByType(slea.readByte()); //04
        final short src = slea.readShort();                                            //01 00
        final short dst = slea.readShort();                                            //00 00
        final short quantity = slea.readShort();                                       //53 01

        if (src < 0 && dst > 0) {
            MapleInventoryManipulator.unequip(c, src, dst);
        } else if (dst < 0) {
            MapleInventoryManipulator.equip(c, src, dst);
        } else if (dst == 0) {
            MapleInventoryManipulator.drop(c, type, src, quantity);
        } else {
            MapleInventoryManipulator.move(c, type, src, dst);
        }
    }

    public static final void SwitchBag(final LittleEndianAccessor slea, final MapleClient c) {
        if (c.getPlayer().hasBlockedInventory()) { //hack
            return;
        }
        c.getPlayer().setScrolledPosition((short) 0);
        c.getPlayer().updateTick(slea.readInt());
        final short src = (short) slea.readInt();                                       //01 00
        final short dst = (short) slea.readInt();                                            //00 00
        if (src < 100 || dst < 100) {
            return;
        }
        MapleInventoryManipulator.move(c, MapleInventoryType.ETC, src, dst);
    }

    public static final void MoveBag(final LittleEndianAccessor slea, final MapleClient c) {
        if (c.getPlayer().hasBlockedInventory()) { //hack
            return;
        }
        if (slea.available() == 0) {//礦物背包內按兩下道具防止卡屏
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (slea.available() == 11) {//擁有礦物背包時，按兩下能放入背包內的物品防止卡屏
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        c.getPlayer().setScrolledPosition((short) 0);
        c.getPlayer().updateTick(slea.readInt());
        final boolean srcFirst = slea.readInt() > 0;
        short dst = (short) slea.readInt();                                       //01 00
        if (slea.readByte() != 4) { //must be etc) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        short src = slea.readShort();                                            //00 00
        MapleInventoryManipulator.move(c, MapleInventoryType.ETC, srcFirst ? dst : src, srcFirst ? src : dst);
    }

    public static final void ItemSort(final LittleEndianAccessor slea, final MapleClient c) {
        c.getPlayer().updateTick(slea.readInt());
        c.getPlayer().setScrolledPosition((short) 0);
        final MapleInventoryType pInvType = MapleInventoryType.getByType(slea.readByte());
        if (pInvType == MapleInventoryType.UNDEFINED || c.getPlayer().hasBlockedInventory()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        final MapleInventory pInv = c.getPlayer().getInventory(pInvType); //Mode should correspond with MapleInventoryType
        boolean sorted = false;

        while (!sorted) {
            final byte freeSlot = (byte) pInv.getNextFreeSlot();
            if (freeSlot != -1) {
                byte itemSlot = -1;
                for (byte i = (byte) (freeSlot + 1); i <= pInv.getSlotLimit(); i++) {
                    if (pInv.getItem(i) != null) {
                        itemSlot = i;
                        break;
                    }
                }
                if (itemSlot > 0) {
                    MapleInventoryManipulator.move(c, pInvType, itemSlot, freeSlot);
                } else {
                    sorted = true;
                }
            } else {
                sorted = true;
            }
        }
        if (pInvType != MapleInventoryType.CASH && pInvType != MapleInventoryType.ETC) {//CASH防止有寵物時閃退、ETC防止礦物背包刷新
            c.getSession().write(MaplePacketCreator.finishedSort(pInvType.getType()));
        }
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    public static final void ItemGather(final LittleEndianAccessor slea, final MapleClient c) {
        // [41 00] [E5 1D 55 00] [01]
        // [32 00] [01] [01] // Sent after

        c.getPlayer().updateTick(slea.readInt());
        c.getPlayer().setScrolledPosition((short) 0);
        if (c.getPlayer().hasBlockedInventory()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        final byte mode = slea.readByte();
        final MapleInventoryType invType = MapleInventoryType.getByType(mode);
        MapleInventory Inv = c.getPlayer().getInventory(invType);

        final List<Item> itemMap = new LinkedList<Item>();
        for (Item item : Inv.list()) {
            itemMap.add(item.copy()); // clone all  items T___T.
        }
        for (Item itemStats : itemMap) {
            MapleInventoryManipulator.removeFromSlot(c, invType, itemStats.getPosition(), itemStats.getQuantity(), true, false);
        }

        final List<Item> sortedItems = sortItems(itemMap);
        for (Item item : sortedItems) {
            MapleInventoryManipulator.addFromDrop(c, item, false);
        }
        c.getSession().write(MaplePacketCreator.finishedGather(mode));
        c.getSession().write(MaplePacketCreator.enableActions());
        itemMap.clear();
        sortedItems.clear();
    }

    private static final List<Item> sortItems(final List<Item> passedMap) {
        final List<Integer> itemIds = new ArrayList<Integer>(); // empty list.
        for (Item item : passedMap) {
            itemIds.add(item.getItemId()); // adds all item ids to the empty list to be sorted.
        }
        Collections.sort(itemIds); // sorts item ids

        final List<Item> sortedList = new LinkedList<Item>(); // ordered list pl0x <3.

        for (Integer val : itemIds) {
            for (Item item : passedMap) {
                if (val == item.getItemId()) { // Goes through every index and finds the first value that matches
                    sortedList.add(item);
                    passedMap.remove(item);
                    break;
                }
            }
        }
        return sortedList;
    }

    public static final boolean UseRewardItem(final byte slot, final int itemId, final MapleClient c, final MapleCharacter chr) {
        final Item toUse = c.getPlayer().getInventory(GameConstants.getInventoryType(itemId)).getItem(slot);
        c.getSession().write(MaplePacketCreator.enableActions());
        if (toUse != null && toUse.getQuantity() >= 1 && toUse.getItemId() == itemId && !chr.hasBlockedInventory()) {
            if (chr.getInventory(MapleInventoryType.EQUIP).getNextFreeSlot() > -1 && chr.getInventory(MapleInventoryType.USE).getNextFreeSlot() > -1 && chr.getInventory(MapleInventoryType.SETUP).getNextFreeSlot() > -1 && chr.getInventory(MapleInventoryType.ETC).getNextFreeSlot() > -1) {
                final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                final Pair<Integer, List<StructRewardItem>> rewards = ii.getRewardItem(itemId);

                if (itemId == 2028048) {
                    // Set the default amount
                    int defaultAmount = 100000;
                    // Possible additional amounts
                    int[] possibleAmounts = {100000, 100000, 100000, 100000, 100000, 100000, 500000, 1000000, 2000000};

                    // Randomly choose one of the additional amounts or stick with the default
                    int mesosAmount = Randomizer.nextInt() == 0 ? defaultAmount : possibleAmounts[Randomizer.nextInt(possibleAmounts.length)];

                    chr.gainMeso(mesosAmount, true); // Add the mesos to the player
                    chr.dropMessage(5, "You have received " + mesosAmount + " mesos!"); // Notify the player

                    MapleInventoryManipulator.removeById(c, GameConstants.getInventoryType(itemId), itemId, 1, false, false);
                    return true; // Successfully used the item
                }

                if (rewards != null && rewards.getLeft() > 0) {
                    while (true) {
                        for (StructRewardItem reward : rewards.getRight()) {
                            if (reward.prob > 0 && Randomizer.nextInt(rewards.getLeft()) < reward.prob) { // Total prob
                                if (itemId == 2550000) { // Spiegelmann's Badge Box
                                    Equip e = (Equip) MapleItemInformationProvider.getInstance().getEquipById(reward.itemid);

                                    int itemTier = 0; // Default to Bronze

                                    if (reward.itemid == 1182000 || reward.itemid == 1182001) {
                                        itemTier = 1; // Bronze Tier
                                    } else if (reward.itemid == 1182002 || reward.itemid == 1182003) {
                                        itemTier = 2; // Silver Tier
                                    } else if (reward.itemid == 1182004 || reward.itemid == 1182005) {
                                        itemTier = 3; // Gold Tier
                                    }

                                    switch (itemTier) {
                                        case 1: // Bronze stats
                                            if (Randomizer.rand(0, 2) == 1) {
                                                e.setWatk((short) Randomizer.rand(1, 3));
                                            }
                                            if (Randomizer.rand(0, 2) == 1) {
                                                e.setMatk((short) Randomizer.rand(1, 3));
                                            }
                                            if (Randomizer.rand(0, 2) == 1) {
                                                e.setStr((short) Randomizer.rand(1, 3));
                                            }
                                            if (Randomizer.rand(0, 2) == 1) {
                                                e.setDex((short) Randomizer.rand(1, 3));
                                            }
                                            if (Randomizer.rand(0, 2) == 1) {
                                                e.setInt((short) Randomizer.rand(1, 3));
                                            }
                                            if (Randomizer.rand(0, 2) == 1) {
                                                e.setLuk((short) Randomizer.rand(1, 3));
                                            }
                                            if (Randomizer.rand(0, 2) == 1) {
                                                e.setHp((short) (Randomizer.rand(1, 5) * 10));
                                            }
                                            // Set other stats similarly for Bronze
                                            e.setExpiration(7 * 86400 * 1000 + System.currentTimeMillis()); // 7 days expiration for Bronze
                                            break;
                                        case 2: // Silver stats
                                            if (Randomizer.rand(0, 2) == 1) {
                                                e.setWatk((short) Randomizer.rand(3, 5));
                                            }
                                            if (Randomizer.rand(0, 2) == 1) {
                                                e.setMatk((short) Randomizer.rand(3, 5));
                                            }
                                            if (Randomizer.rand(0, 2) == 1) {
                                                e.setStr((short) Randomizer.rand(3, 5));
                                            }
                                            if (Randomizer.rand(0, 2) == 1) {
                                                e.setDex((short) Randomizer.rand(3, 5));
                                            }
                                            if (Randomizer.rand(0, 2) == 1) {
                                                e.setInt((short) Randomizer.rand(3, 5));
                                            }
                                            if (Randomizer.rand(0, 2) == 1) {
                                                e.setLuk((short) Randomizer.rand(3, 5));
                                            }
                                            if (Randomizer.rand(0, 2) == 1) {
                                                e.setHp((short) (Randomizer.rand(5, 10) * 10));
                                            }
                                            // Set other stats similarly for Silver
                                            e.setExpiration(7 * 86400 * 1000 + System.currentTimeMillis()); // 7 days expiration for Silver
                                            break;
                                        case 3: // Gold stats
                                            if (Randomizer.rand(0, 2) == 1) {
                                                e.setWatk((short) Randomizer.rand(5, 7));
                                            }
                                            if (Randomizer.rand(0, 2) == 1) {
                                                e.setMatk((short) Randomizer.rand(5, 7));
                                            }
                                            if (Randomizer.rand(0, 2) == 1) {
                                                e.setStr((short) Randomizer.rand(5, 7));
                                            }
                                            if (Randomizer.rand(0, 2) == 1) {
                                                e.setDex((short) Randomizer.rand(5, 7));
                                            }
                                            if (Randomizer.rand(0, 2) == 1) {
                                                e.setInt((short) Randomizer.rand(5, 7));
                                            }
                                            if (Randomizer.rand(0, 2) == 1) {
                                                e.setLuk((short) Randomizer.rand(5, 7));
                                            }
                                            if (Randomizer.rand(0, 2) == 1) {
                                                e.setHp((short) (Randomizer.rand(10, 15) * 10));
                                            }
                                            // Set other stats similarly for Gold
                                            e.setExpiration(14 * 86400 * 1000 + System.currentTimeMillis()); // 14 days expiration for Gold
                                            break;
                                    }

                                    MapleInventoryManipulator.addFromDrop(c, e, false);
                                    c.getPlayer().GmText(7, GameConstants.getKorType(reward.itemid) + " Received items (" + MapleItemInformationProvider.getInstance().getName(reward.itemid) + ")");
                                } else if (GameConstants.getInventoryType(reward.itemid) == MapleInventoryType.EQUIP) {
                                    final Item item = ii.getEquipById(reward.itemid);
                                    if (reward.period > 0) {
                                        item.setExpiration(System.currentTimeMillis() + (reward.period * 60 * 60 * 10));
                                    }
                                    item.setGMLog("Reward item: " + itemId + " on " + FileoutputUtil.CurrentReadable_Date());
                                    c.getPlayer().GmText(7, GameConstants.getKorType(reward.itemid) + " Recieved items (" + MapleItemInformationProvider.getInstance().getName(reward.itemid) + ")");
                                    MapleInventoryManipulator.addbyItem(c, item);
                                } else {
                                    c.getPlayer().GmText(7, GameConstants.getKorType(reward.itemid) + " Recieved items (" + MapleItemInformationProvider.getInstance().getName(reward.itemid) + ")");
                                    MapleInventoryManipulator.addById(c, reward.itemid, reward.quantity, "Reward item: " + itemId + " on " + FileoutputUtil.CurrentReadable_Date());
                                }
                                MapleInventoryManipulator.removeById(c, GameConstants.getInventoryType(itemId), itemId, 1, false, false);

                                c.getSession().write(EffectPacket.showRewardItemAnimation(reward.itemid, reward.effect));
                                chr.getMap().broadcastMessage(chr, EffectPacket.showRewardItemAnimation(reward.itemid, reward.effect, chr.getId()), false);
                                return true;
                            }
                        }
                    }
                } else {
                    chr.dropMessage(6, "Unknown error.");
                }
            } else {
                chr.dropMessage(5, "Please reserve a certain amount of backpack space.");
            }
        }
        return false;
    }

    
    public static final void UseItem(final LittleEndianAccessor slea, final MapleClient c, final MapleCharacter chr) {
        if (chr == null || !chr.isAlive() || chr.getMapId() == 749040100 || chr.getMap() == null || chr.hasDisease(MapleDisease.POTION) || chr.hasBlockedInventory() || chr.inPVP()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        final long time = System.currentTimeMillis();
        if (chr.getNextConsume() > time) {
            chr.dropMessage(5, "You may not use this item yet.");
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        c.getPlayer().updateTick(slea.readInt());
        final byte slot = (byte) slea.readShort();
        final int itemId = slea.readInt();
        final Item toUse = chr.getInventory(MapleInventoryType.USE).getItem(slot);

        if (toUse == null || toUse.getQuantity() < 1 || toUse.getItemId() != itemId) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (!FieldLimitType.PotionUse.check(chr.getMap().getFieldLimit())) { //cwk quick hack
            if (MapleItemInformationProvider.getInstance().getItemEffect(toUse.getItemId()).applyTo(chr)) {
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, false);
                if (chr.getMap().getConsumeItemCoolTime() > 0) {
                    chr.setNextConsume(time + (chr.getMap().getConsumeItemCoolTime() * 1000));
                }
            }

        } else {
            c.getSession().write(MaplePacketCreator.enableActions());
        }
    }

    public static final void UseCosmetic(final LittleEndianAccessor slea, final MapleClient c, final MapleCharacter chr) {
        if (chr == null || !chr.isAlive() || chr.getMap() == null || chr.hasBlockedInventory() || chr.inPVP()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        final byte slot = (byte) slea.readShort();
        final int itemId = slea.readInt();
        final Item toUse = chr.getInventory(MapleInventoryType.USE).getItem(slot);

        if (toUse == null || toUse.getQuantity() < 1 || toUse.getItemId() != itemId || itemId / 10000 != 254 || (itemId / 1000) % 10 != chr.getGender()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (MapleItemInformationProvider.getInstance().getItemEffect(toUse.getItemId()).applyTo(chr)) {
            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, false);
        }
    }

    public static final void UseReturnScroll(final LittleEndianAccessor slea, final MapleClient c, final MapleCharacter chr) {
        if (!chr.isAlive() || chr.getMapId() == 749040100 || chr.hasBlockedInventory() || chr.isInBlockedMap() || chr.inPVP()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        c.getPlayer().updateTick(slea.readInt());
        final byte slot = (byte) slea.readShort();
        final int itemId = slea.readInt();
        final Item toUse = chr.getInventory(MapleInventoryType.USE).getItem(slot);

        if (toUse == null || toUse.getQuantity() < 1 || toUse.getItemId() != itemId) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (!FieldLimitType.PotionUse.check(chr.getMap().getFieldLimit())) {
            if (MapleItemInformationProvider.getInstance().getItemEffect(toUse.getItemId()).applyReturnScroll(chr)) {
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, false);
            } else {
                c.getSession().write(MaplePacketCreator.enableActions());
            }
        } else {
            c.getSession().write(MaplePacketCreator.enableActions());
        }
    }

    public static final void UseAPResetScroll(final LittleEndianAccessor slea, final MapleClient c) {
        final MapleCharacter chr = c.getPlayer();
        c.getPlayer().updateTick(slea.readInt());
        final short slot = slea.readShort();
        if (slot < 1 && slot > 96) {//hmm
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        final Item item = chr.getInventory(MapleInventoryType.USE).getItem((byte) slot);
        final int itemId = slea.readInt();
        if (itemId / 1000 != 2501 || item == null || item.getItemId() != itemId) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, (byte) slot, (short) 1, true);
        //final int jobId = chr.getJob().getId();
        int newAp = chr.getStat().getStr() - 4;
        newAp += chr.getStat().getDex() - 4;
        newAp += chr.getStat().getInt() - 4;
        newAp += chr.getStat().getLuk() - 4;
        chr.getStat().setStr((short) 4, chr);
        chr.getStat().setDex((short) 4, chr);
        chr.getStat().setInt((short) 4, chr);
        chr.getStat().setLuk((short) 4, chr);
        chr.setRemainingAp((short) newAp);
        Map<MapleStat, Integer> stat = new EnumMap<MapleStat, Integer>(MapleStat.class);
        stat.put(MapleStat.STR, 4);
        stat.put(MapleStat.DEX, 4);
        stat.put(MapleStat.INT, 4);
        stat.put(MapleStat.LUK, 4);
        stat.put(MapleStat.AVAILABLEAP, newAp);
        c.getSession().write(MaplePacketCreator.updatePlayerStats(stat, false, chr));

    }

    public static final void UseSPResetScroll(final LittleEndianAccessor slea, final MapleClient c) {
        final MapleCharacter chr = c.getPlayer();
        c.getPlayer().updateTick(slea.readInt());
        final short slot = slea.readShort();
        if (slot < 1 && slot > 96) {//hmm
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        final Item item = chr.getInventory(MapleInventoryType.USE).getItem((byte) slot);
        final int itemId = slea.readInt();
        if (item.getItemId() / 1000 != 2500 || item == null || item.getItemId() != itemId || GameConstants.isBeginnerJob(chr.getJob())) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        final int[] spToGive = chr.getRemainingSps();
        int skillshit = 0;
        int skillLevel;
        final List<Skill> toRemove = new ArrayList<Skill>();
        for (Skill skill : chr.getSkills().keySet()) {
            if (!skill.isBeginnerSkill() && skill.getId() / 10000000 != 9) {
                skillLevel = chr.getSkillLevel(skill);
                if (skillLevel > 0) {
                    skillshit = skillLevel;
                }
                spToGive[GameConstants.getSkillBookForSkill(skill.getId())] += skillLevel;
                toRemove.add(skill);
            }
        }
        for (Skill skill : toRemove) {
            chr.changeSingleSkillLevel(skill, -1, (byte) -1, -1);
        }
        if (skillshit == 0 && spToGive[0] == 0 && chr.getLevel() > 10) {
            if (GameConstants.isExtendedSPJob(chr.getJob())) {
                chr.dropMessage(1, "This job is unable to initialize SP.");
            } else {
                int sp = 1;
                sp += (chr.getLevel() - (chr.getJob() / 100 % 10 == 2 ? 8 : 10)) * 3;
                if (sp < 0) {
                    c.getSession().write(MaplePacketCreator.enableActions());
                    return;
                }
                sp += (chr.getJob() % 100 != 0 && chr.getJob() % 100 != 1) ? ((chr.getJob() % 10) + 1) : 0;
                if (chr.getJob() % 10 >= 2) {
                    sp += 2;
                }
                spToGive[0] = sp;
            }
        }
        chr.baseSkills();
        for (int i = 0; i < spToGive.length; i++) {
            chr.setRemainingSp(spToGive[i], i);
        }
        chr.updateSingleStat(MapleStat.AVAILABLESP, 0);//lol
        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, (byte) slot, (short) 1, true);
    }

    public static final void UseAlienSocket(final LittleEndianAccessor slea, final MapleClient c) {
        c.getPlayer().updateTick(slea.readInt());
        c.getPlayer().setScrolledPosition((short) 0);
        final Item alienSocket = c.getPlayer().getInventory(MapleInventoryType.USE).getItem((byte) slea.readShort());
        final int alienSocketId = slea.readInt();
        final Item toMount = c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem((byte) slea.readShort());
        if (alienSocket == null || alienSocketId != alienSocket.getItemId() || toMount == null || c.getPlayer().hasBlockedInventory()) {
            c.getSession().write(InventoryPacket.getInventoryFull());
            return;
        }
        final Equip eqq = (Equip) toMount;
        if (eqq.getSocketState() != 0) { // Used before
            c.getPlayer().dropMessage(1, "This item already has a socket.");
        } else {
            eqq.setSocket1(0); // First socket, GMS removed the other 2
            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, alienSocket.getPosition(), (short) 1, false);
            Timer.MapTimer.getInstance().schedule(new Runnable() {
                public void run() {

                    c.getPlayer().forceReAddItem(toMount, MapleInventoryType.EQUIP);
                }
            }, 3000);//延遲3秒，防止報錯
        }
        c.getSession().write(MTSCSPacket.useAlienSocket(true));
    }

    public static final void UseNebulite(final LittleEndianAccessor slea, final MapleClient c) {
        c.getPlayer().updateTick(slea.readInt());
        c.getPlayer().setScrolledPosition((short) 0);
        final Item nebulite = c.getPlayer().getInventory(MapleInventoryType.SETUP).getItem((byte) slea.readShort());
        final int nebuliteId = slea.readInt();
        final Item toMount = c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem((byte) slea.readShort());
        if (nebulite == null || nebuliteId != nebulite.getItemId() || toMount == null || c.getPlayer().hasBlockedInventory()) {
            c.getSession().write(InventoryPacket.getInventoryFull());
            return;
        }
        final Equip eqq = (Equip) toMount;
        final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        boolean success = false;
        if (eqq.getSocket1() == 0 || eqq.getSocket2() == 0 || eqq.getSocket3() == 0) { // GMS removed 2nd and 3rd sockets, we can put into npc. // d
            final StructItemOption pot = ii.getSocketInfo(nebuliteId);
            if (pot != null && GameConstants.optionTypeFits(pot.optionType, eqq.getItemId())) {
                if (eqq.getSocket1() == 0) { // priority comes first
                    eqq.setSocket1(pot.opID);
                } else if (eqq.getSocket1() != 0 && eqq.getSocket2() == 0) { // priority comes first
                    eqq.setSocket2(pot.opID);
                } else if (eqq.getSocket1() != 0 && eqq.getSocket2() != 0 && eqq.getSocket3() == 0) { // priority comes first
                    eqq.setSocket3(pot.opID);
                }
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.SETUP, nebulite.getPosition(), (short) 1, false);
                c.getPlayer().forceReAddItem(toMount, MapleInventoryType.EQUIP);
                success = true;
            }
        }
        c.getPlayer().getMap().broadcastMessage(EtcPacket.showNebuliteEffect(c.getPlayer().getId(), success));
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    public static final void UseNebuliteFusion(final LittleEndianAccessor slea, final MapleClient c) {
        c.getPlayer().updateTick(slea.readInt());
        c.getPlayer().setScrolledPosition((short) 0);
        final int nebuliteId1 = slea.readInt();
        final Item nebulite1 = c.getPlayer().getInventory(MapleInventoryType.SETUP).getItem((byte) slea.readShort());
        final int nebuliteId2 = slea.readInt();
        final Item nebulite2 = c.getPlayer().getInventory(MapleInventoryType.SETUP).getItem((byte) slea.readShort());
        final int mesos = slea.readInt();
        final int premiumQuantity = slea.readInt();
        if (nebulite1 == null || nebulite2 == null || nebuliteId1 != nebulite1.getItemId() || nebuliteId2 != nebulite2.getItemId() || (mesos == 0 && premiumQuantity == 0) || (mesos != 0 && premiumQuantity != 0) || mesos < 0 || premiumQuantity < 0 || c.getPlayer().hasBlockedInventory()) {
            c.getPlayer().dropMessage(1, "Failed to fuse Nebulite.");
            c.getSession().write(InventoryPacket.getInventoryFull());
            return;
        }
        final int grade1 = GameConstants.getNebuliteGrade(nebuliteId1);
        final int grade2 = GameConstants.getNebuliteGrade(nebuliteId2);
        final int highestRank = grade1 > grade2 ? grade1 : grade2;
        if (grade1 == -1 || grade2 == -1 || (highestRank == 3 && premiumQuantity != 2) || (highestRank == 2 && premiumQuantity != 1)
                || (highestRank == 1 && mesos != 5000) || (highestRank == 0 && mesos != 3000) || (mesos > 0 && c.getPlayer().getMeso() < mesos)
                || (premiumQuantity > 0 && c.getPlayer().getItemQuantity(4420000, false) < premiumQuantity) || grade1 >= 4 || grade2 >= 4
                || (c.getPlayer().getInventory(MapleInventoryType.SETUP).getNumFreeSlot() < 1)) { // 4000 + = S, 3000 + = A, 2000 + = B, 1000 + = C, else = D
            c.getSession().write(EtcPacket.useNebuliteFusion(c.getPlayer().getId(), 0, false));
            return; // Most of them were done in client, so we just send the unsuccessfull packet, as it is only here when they packet edit.
        }
        final int avg = (grade1 + grade2) / 2; // have to revise more about grades.
        final int rank = Randomizer.nextInt(100) < 4 ? (Randomizer.nextInt(100) < 70 ? (avg != 3 ? (avg + 1) : avg) : (avg != 0 ? (avg - 1) : 0)) : avg;
        // 4 % chance to up/down 1 grade, (70% to up, 30% to down), cannot up to S grade. =)
        final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        final List<StructItemOption> pots = new LinkedList<StructItemOption>(ii.getAllSocketInfo(rank).values());
        int newId = 0;
        while (newId == 0) {
            StructItemOption pot = pots.get(Randomizer.nextInt(pots.size()));
            if (pot != null) {
                newId = pot.opID;
            }
        }
        if (mesos > 0) {
            c.getPlayer().gainMeso(-mesos, true);
        } else if (premiumQuantity > 0) {
            MapleInventoryManipulator.removeById(c, MapleInventoryType.ETC, 4420000, premiumQuantity, false, false);
        }
        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.SETUP, nebulite1.getPosition(), (short) 1, false);
        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.SETUP, nebulite2.getPosition(), (short) 1, false);
        MapleInventoryManipulator.addById(c, newId, (short) 1, "Fused from " + nebuliteId1 + " and " + nebuliteId2 + " on " + FileoutputUtil.CurrentReadable_Date());
        c.getSession().write(EtcPacket.useNebuliteFusion(c.getPlayer().getId(), newId, true));
    }

    public static final void UseMagnify(final LittleEndianAccessor slea, final MapleClient c) {
        c.getPlayer().updateTick(slea.readInt());
        c.getPlayer().setScrolledPosition((short) 0);
        final byte src = (byte) slea.readShort();
        final boolean insight = src == 127 && c.getPlayer().getTrait(MapleTraitType.sense).getLevel() >= 30;
        final Item magnify = c.getPlayer().getInventory(MapleInventoryType.USE).getItem(src);
        final Item toReveal = c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem((byte) slea.readShort());
        if ((magnify == null && !insight) || toReveal == null || c.getPlayer().hasBlockedInventory()) {
            c.getSession().write(InventoryPacket.getInventoryFull());
            return;
        }
        final Equip eqq = (Equip) toReveal;
        final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        final int reqLevel = ii.getReqLevel(eqq.getItemId()) / 10;
        if (eqq.getState() == 1 && (insight || magnify.getItemId() == 2460003 || (magnify.getItemId() == 2460002 && reqLevel <= 12) || (magnify.getItemId() == 2460001 && reqLevel <= 7) || (magnify.getItemId() == 2460000 && reqLevel <= 3))) {
            final List<List<StructItemOption>> pots = new LinkedList<List<StructItemOption>>(ii.getAllPotentialInfo().values());
            int new_state = Math.abs(eqq.getPotential1());
            if (new_state > 20 || new_state < 17) { // incase overflow
                new_state = 17;
            }
            int lines = 2; // default
            if (eqq.getPotential2() != 0) {
                lines++;
            }
            if (eqq.getPotential3() != 0) {
                lines++;
            }
            while (eqq.getState() != new_state) {
                //31001 = haste, 31002 = door, 31003 = se, 31004 = hb, 41005 = combat orders, 41006 = advanced blessing, 41007 = speed infusion
                for (int i = 0; i < lines; i++) { // minimum 2 lines, max 5
                    boolean rewarded = false;
                    while (!rewarded) {
                        StructItemOption pot = pots.get(Randomizer.nextInt(pots.size())).get(reqLevel);
                        if (pot != null && pot.reqLevel / 10 <= reqLevel && GameConstants.optionTypeFits(pot.optionType, eqq.getItemId()) && GameConstants.potentialIDFits(pot.opID, new_state, i)) { //optionType
                            //have to research optionType before making this truely official-like
                            if (i == 0) {
                                eqq.setPotential1(pot.opID);
                            } else if (i == 1) {
                                eqq.setPotential2(pot.opID);
                            } else if (i == 2) {
                                eqq.setPotential3(pot.opID);
                            }
                            rewarded = true;
                        }
                    }
                }
            }
            c.getPlayer().getTrait(MapleTraitType.insight).addExp((insight ? 10 : ((magnify.getItemId() + 2) - 2460000)) * 2, c.getPlayer());
            c.getPlayer().getMap().broadcastMessage(EtcPacket.showMagnifyingEffect(c.getPlayer().getId(), eqq.getPosition()));
            if (!insight) {
                c.getSession().write(InventoryPacket.scrolledItem(magnify, toReveal, false, true));
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, magnify.getPosition(), (short) 1, false);
            } else {
                c.getPlayer().forceReAddItem(toReveal, MapleInventoryType.EQUIP);
            }
            c.getSession().write(MaplePacketCreator.enableActions());
        } else {
            c.getSession().write(InventoryPacket.getInventoryFull());
            return;
        }
    }

    public static final void addToScrollLog(int accountID, int charID, int scrollID, int itemID, byte oldSlots, byte newSlots, byte viciousHammer, String result, boolean ws, boolean ls, int vega) {
        Connection con = null;
        PreparedStatement ps = null;
        try {
            con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("INSERT INTO scroll_log VALUES(DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            ps.setInt(1, accountID);
            ps.setInt(2, charID);
            ps.setInt(3, scrollID);
            ps.setInt(4, itemID);
            ps.setByte(5, oldSlots);
            ps.setByte(6, newSlots);
            ps.setByte(7, viciousHammer);
            ps.setString(8, result);
            ps.setByte(9, (byte) (ws ? 1 : 0));
            ps.setByte(10, (byte) (ls ? 1 : 0));
            ps.setInt(11, vega);
            ps.execute();
        } catch (SQLException e) {
            FileoutputUtil.outputFileError(FileoutputUtil.PacketEx_Log, e);
        } finally {
            if (ps != null) {
                try {
                    ps.close();
                } catch (Exception e) {
                }
            }
        }
    }

    public static void UseProtectShield(LittleEndianAccessor slea, MapleClient c) {
        byte slot = (byte) slea.readShort();
        byte dst = (byte) slea.readShort();
        slea.skip(1);
        boolean use = false;
        boolean legendarySpirit = false; //장인의혼 사용여부
        Equip toScroll;
        Equip.ScrollResult scrollSuccess = Equip.ScrollResult.SUCCESS; //무조건 성공
        if (dst < 0) {
            toScroll = (Equip) c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(dst);
        } else {
            legendarySpirit = true;
            toScroll = (Equip) c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem(dst);
        }
        Item scroll = c.getPlayer().getInventory(MapleInventoryType.CASH).getItem(slot);
        if (scroll == null || !GameConstants.isSpecialCSScroll(scroll.getItemId())) {
            scroll = c.getPlayer().getInventory(MapleInventoryType.USE).getItem(slot);
            use = true;
        }
        if (!use) {
            if (scroll.getItemId() == 5064000) {
                short flag = toScroll.getFlag();
                flag |= ItemFlag.PROTECT.getValue();
                toScroll.setFlag(flag);
                c.getSession().write(InventoryPacket.updateSpecialItemUse(toScroll, toScroll.getType(), c.getPlayer()));
            } else if (scroll.getItemId() == 5064100) {
                short flag = toScroll.getFlag();
                flag |= ItemFlag.SAFETY.getValue();
                toScroll.setFlag(flag);
                c.getSession().write(InventoryPacket.updateSpecialItemUse(toScroll, toScroll.getType(), c.getPlayer()));
            } else if (scroll.getItemId() == 5064300) {
                short flag = toScroll.getFlag();
                flag |= ItemFlag.RECOVERY.getValue();
                toScroll.setFlag(flag);
                c.getSession().write(InventoryPacket.updateSpecialItemUse(toScroll, toScroll.getType(), c.getPlayer()));
            } else if (scroll.getItemId() == 5063000) {
                short flag = toScroll.getFlag();
                flag |= ItemFlag.LUKCYDAY.getValue();
                toScroll.setFlag(flag);
                c.getSession().write(InventoryPacket.updateSpecialItemUse(toScroll, toScroll.getType(), c.getPlayer()));
            } else if (scroll.getItemId() == 5063100) {
                short flag = toScroll.getFlag();
                if (!ItemFlag.LUKCYDAY.check(flag) && !ItemFlag.PROTECT.check(flag)) {
                    flag |= ItemFlag.LUKCYDAY.getValue();
                    flag |= ItemFlag.PROTECT.getValue();
                    toScroll.setFlag(flag);
                    c.getSession().write(InventoryPacket.updateSpecialItemUse(toScroll, toScroll.getType(), c.getPlayer()));
                } else {
                    c.getSession().write(MaplePacketCreator.enableActions());
                    return;
                }
            }
            c.getPlayer().getInventory(MapleInventoryType.CASH).removeItem(scroll.getPosition(), (short) 1, false);
        } else {
            if (scroll.getItemId() == 2531000) {
                short flag = toScroll.getFlag();
                flag |= ItemFlag.PROTECT.getValue();
                toScroll.setFlag(flag);
                c.getSession().write(InventoryPacket.updateSpecialItemUse(toScroll, toScroll.getType(), c.getPlayer()));
            } else if (scroll.getItemId() == 5064200 || scroll.getItemId() == 2049600 || scroll.getItemId() == 2049601 || scroll.getItemId() == 2049604) {
                    Equip origin = (Equip) MapleItemInformationProvider.getInstance().getEquipById(toScroll.getItemId());
                    origin.setDurability(toScroll.getDurability());
                    origin.setExpiration(toScroll.getExpiration());
                    origin.setFlag(toScroll.getFlag());
                    origin.setPotential1(toScroll.getPotential1());
                    origin.setPotential2(toScroll.getPotential2());
                    origin.setPotential3(toScroll.getPotential3());
                    origin.setPotential4(toScroll.getPotential4());
                    origin.setPotential5(toScroll.getPotential5());
                    toScroll = origin;
                c.getSession().write(InventoryPacket.updateSpecialItemUse(toScroll, toScroll.getType(), c.getPlayer()));
            } else  if (scroll.getItemId() == 2532000) {
                short flag = toScroll.getFlag();
                flag |= ItemFlag.SAFETY.getValue();
                toScroll.setFlag(flag);
                c.getSession().write(InventoryPacket.updateSpecialItemUse(toScroll, toScroll.getType(), c.getPlayer()));
            } else if (scroll.getItemId() == 2530000 || scroll.getItemId() == 2530001 || scroll.getItemId() == 2530002) {
                short flag = toScroll.getFlag();
                flag |= ItemFlag.LUKCYDAY.getValue();
                toScroll.setFlag(flag);
                c.getSession().write(InventoryPacket.updateSpecialItemUse(toScroll, toScroll.getType(), c.getPlayer()));
            }
            c.getPlayer().getInventory(MapleInventoryType.USE).removeItem(scroll.getPosition(), (short) 1, false);
        }
        c.getSession().write(InventoryPacket.scrolledItem(scroll, toScroll, false, false));
        c.getPlayer().getMap().broadcastMessage(EtcPacket.getScrollEffect(c.getPlayer().getId(), scrollSuccess, legendarySpirit, false));
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    public static final boolean UseUpgradeScroll(final short slot, final short dst, final short ws, final MapleClient c, final MapleCharacter chr, final boolean legendarySpirit, final boolean cash) {
        return UseUpgradeScroll(slot, dst, ws, c, chr, 0, legendarySpirit, cash);
    }

    public static final boolean UseUpgradeScroll(final short slot, final short dst, final short ws, final MapleClient c, final MapleCharacter chr, final int vegas, final boolean legendarySpirit, final boolean cash) {
        boolean whiteScroll = false; // white scroll being used?
        final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        chr.setScrolledPosition((short) 0);
        if ((ws & 2) == 2) {
            whiteScroll = true;
        }
        Equip toScroll = null;
        if (dst < 0) {
            toScroll = (Equip) chr.getInventory(MapleInventoryType.EQUIPPED).getItem(dst);
        } else if (legendarySpirit) {
            toScroll = (Equip) chr.getInventory(MapleInventoryType.EQUIP).getItem(dst);
        }
        if (toScroll == null || c.getPlayer().hasBlockedInventory()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            System.out.println("test1");
            return false;
        }
        final byte oldLevel = toScroll.getLevel();
        final byte oldEnhance = toScroll.getEnhance();
        final byte oldState = toScroll.getState();
        final short oldFlag = toScroll.getFlag();
        final byte oldSlots = toScroll.getUpgradeSlots();
        boolean SAFETY = false;
        boolean RECOVERY = false;
        Item scroll = cash ? chr.getInventory(MapleInventoryType.CASH).getItem(slot) : chr.getInventory(MapleInventoryType.USE).getItem(slot);
        if (scroll == null) {
            scroll = cash ? chr.getInventory(MapleInventoryType.USE).getItem(slot) : chr.getInventory(MapleInventoryType.CASH).getItem(slot);
            if (scroll == null) {
                c.getSession().write(InventoryPacket.getInventoryFull());
                c.getSession().write(MaplePacketCreator.enableActions());
                System.out.println("test2");
                return false;
            }
        }
        if (scroll.getItemId() == 5064200 || scroll.getItemId() == 2049600 || scroll.getItemId() == 2049601 || scroll.getItemId() == 2049604) {
            int success = ii.getScrollSuccess(scroll.getItemId());
            if (scroll.getItemId() == 5064200) {
                success = 100;
            }
            if (Randomizer.nextInt(100) < success) {
                Equip template = (Equip) ii.getEquipById(toScroll.getItemId());
                toScroll.setStr(template.getStr());
                toScroll.setDex(template.getDex());
                toScroll.setInt(template.getInt());
                toScroll.setLuk(template.getLuk());
                toScroll.setAcc(template.getAcc());
                toScroll.setAvoid(template.getAvoid());
                toScroll.setSpeed(template.getSpeed());
                toScroll.setJump(template.getJump());
                toScroll.setEnhance(template.getEnhance());
                toScroll.setItemEXP(template.getItemEXP());
                toScroll.setHp(template.getHp());
                toScroll.setMp(template.getMp());
                toScroll.setLevel(template.getLevel());
                toScroll.setWatk(template.getWatk());
                toScroll.setMatk(template.getMatk());
                toScroll.setWdef(template.getWdef());
                toScroll.setMdef(template.getMdef());
                toScroll.setUpgradeSlots(template.getUpgradeSlots());
                toScroll.setViciousHammer(template.getViciousHammer());
                toScroll.setIncSkill(template.getIncSkill());
                if (ItemFlag.PROTECT.check(oldFlag)) { //裝備保護
                    toScroll.setFlag((short) (toScroll.getFlag() - ItemFlag.PROTECT.getValue()));
                }
                if (ItemFlag.RECOVERY.check(oldFlag)) { //卷軸保護
                    toScroll.setFlag((short) (toScroll.getFlag() - ItemFlag.RECOVERY.getValue()));
                }
                if (scroll.getItemId() != 5064200) {
                    MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, scroll.getPosition(), (short) 1, false, false);    
                }
                c.getSession().write(InventoryPacket.scrolledItem(scroll, toScroll, false, false));
                chr.getMap().broadcastMessage(chr, EtcPacket.getScrollEffect(c.getPlayer().getId(), ScrollResult.SUCCESS, legendarySpirit ? true : false, false), true);//回真成功
                c.getSession().write(MaplePacketCreator.enableActions());
                return false;
            } else {
                    if (scroll.getItemId() != 5064200) {
                    if (ItemFlag.RECOVERY.check(oldFlag)) { //卷軸保護
                        toScroll.setFlag((short) (toScroll.getFlag() - ItemFlag.RECOVERY.getValue()));
                        chr.dropMessage(5, "Due to the protective effect of the scroll, the scroll" + ii.getName(scroll.getItemId()) + "No damage.");
                    } else {
                        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, scroll.getPosition(), (short) 1, false, false);
                    }
                }
                if (Randomizer.nextInt(100) < (100 - success)) {
                    if (ItemFlag.PROTECT.check(oldFlag)) {//裝備保護
                        toScroll.setFlag((short) (toScroll.getFlag() - ItemFlag.PROTECT.getValue()));
                        c.getSession().write(InventoryPacket.scrolledItem(scroll, toScroll, false, false));
                        chr.getMap().broadcastMessage(chr, EtcPacket.getScrollEffect(c.getPlayer().getId(), ScrollResult.FAIL, legendarySpirit ? true : false, false), true);//回真失敗
                    } else {
                        c.getSession().write(InventoryPacket.scrolledItem(scroll, toScroll, true, false));
                        if (dst < 0) {
                            chr.getInventory(MapleInventoryType.EQUIPPED).removeItem(toScroll.getPosition());
                        } else {
                            chr.getInventory(MapleInventoryType.EQUIP).removeItem(toScroll.getPosition());
                        }
                        chr.getMap().broadcastMessage(chr, EtcPacket.getScrollEffect(c.getPlayer().getId(), ScrollResult.CURSE, legendarySpirit ? true : false, false), true);//裝備被破壞
                    }
                } else {
                    if (ItemFlag.PROTECT.check(oldFlag)) {//裝備保護
                            toScroll.setFlag((short) (toScroll.getFlag() - ItemFlag.PROTECT.getValue()));
                    }
                    c.getSession().write(InventoryPacket.scrolledItem(scroll, toScroll, false, false));
                    chr.getMap().broadcastMessage(chr, EtcPacket.getScrollEffect(c.getPlayer().getId(), ScrollResult.FAIL, legendarySpirit ? true : false, false), true);//回真失敗
                }
            }
            c.getSession().write(MaplePacketCreator.enableActions());
            return false;
        }
        if (scroll.getItemId() == 2049615 || scroll.getItemId() == 2049616 || scroll.getItemId() == 2049618) {                
                c.getSession().write(MaplePacketCreator.enableActions());
                return false;            
        }
        if (!GameConstants.isSpecialScroll(scroll.getItemId()) && !GameConstants.isCleanSlate(scroll.getItemId()) && !GameConstants.isEquipScroll(scroll.getItemId()) && !GameConstants.isPotentialScroll(scroll.getItemId())) {
            if (toScroll.getUpgradeSlots() < 1) {
                if (legendarySpirit) {
                    c.getPlayer().getMap().broadcastMessage(EtcPacket.getScrollEffect(c.getPlayer().getId(), Equip.ScrollResult.FAIL, legendarySpirit, false));
                }
                c.getSession().write(InventoryPacket.getInventoryFull());
                c.getSession().write(MaplePacketCreator.enableActions());
                System.out.println("test3");
                return false;
            }
        } else if (GameConstants.isEquipScroll(scroll.getItemId())) {
            if (toScroll.getUpgradeSlots() >= 1 || toScroll.getEnhance() >= 100 || vegas > 0 || ii.isCash(toScroll.getItemId())) {
                c.getSession().write(InventoryPacket.getInventoryFull());
                c.getSession().write(MaplePacketCreator.enableActions());
                System.out.println("test4");
                return false;
            }
        } else if (GameConstants.isPotentialScroll(scroll.getItemId())) {
            final boolean isEpic = scroll.getItemId() / 100 == 20497;
            if ((!isEpic && toScroll.getState() >= 1) || (isEpic && toScroll.getState() >= 18) || (toScroll.getLevel() == 0 && toScroll.getUpgradeSlots() == 0 && toScroll.getItemId() / 10000 != 135 && !isEpic) || vegas > 0 || ii.isCash(toScroll.getItemId())) {
                c.getSession().write(InventoryPacket.getInventoryFull());
                c.getSession().write(MaplePacketCreator.enableActions());
                System.out.println("test5");
                return false;
            }
        } else if (GameConstants.isSpecialScroll(scroll.getItemId())) {
            if (ii.isCash(toScroll.getItemId()) || toScroll.getEnhance() >= 10) {
                c.getSession().write(InventoryPacket.getInventoryFull());
                c.getSession().write(MaplePacketCreator.enableActions());
                System.out.println("test6");
                return false;
            }
        }
        if (!GameConstants.canScroll(toScroll.getItemId()) && !GameConstants.isChaosScroll(toScroll.getItemId())) {
            c.getSession().write(InventoryPacket.getInventoryFull());
            c.getSession().write(MaplePacketCreator.enableActions());
            System.out.println("test7");
            return false;
        }
        if ((GameConstants.isCleanSlate(scroll.getItemId()) || GameConstants.isTablet(scroll.getItemId()) || GameConstants.isGeneralScroll(scroll.getItemId()) || GameConstants.isChaosScroll(scroll.getItemId())) && (vegas > 0 || ii.isCash(toScroll.getItemId()))) {
            c.getSession().write(InventoryPacket.getInventoryFull());
            c.getSession().write(MaplePacketCreator.enableActions());
            System.out.println("test8");
            return false;
        }
        if (GameConstants.isTablet(scroll.getItemId()) && toScroll.getDurability() < 0) { //not a durability item
            c.getSession().write(InventoryPacket.getInventoryFull());
            c.getSession().write(MaplePacketCreator.enableActions());
            System.out.println("test9");
            return false;
        } else if ((!GameConstants.isTablet(scroll.getItemId()) && !GameConstants.isPotentialScroll(scroll.getItemId()) && !GameConstants.isEquipScroll(scroll.getItemId()) && !GameConstants.isCleanSlate(scroll.getItemId()) && !GameConstants.isSpecialScroll(scroll.getItemId()) && !GameConstants.isChaosScroll(scroll.getItemId())) && toScroll.getDurability() >= 0) {
            c.getSession().write(InventoryPacket.getInventoryFull());
            c.getSession().write(MaplePacketCreator.enableActions());
            System.out.println("test10");
            return false;
        }
        Item wscroll = null;

        // Anti cheat and validation
        List<Integer> scrollReqs = ii.getScrollReqs(scroll.getItemId());
        if (scrollReqs != null && scrollReqs.size() > 0 && !scrollReqs.contains(toScroll.getItemId())) {
            c.getSession().write(InventoryPacket.getInventoryFull());
            c.getSession().write(MaplePacketCreator.enableActions());
            System.out.println("test11");
            return false;
        }

        if (whiteScroll) {
            wscroll = chr.getInventory(MapleInventoryType.USE).findById(2340000);
            if (wscroll == null) {
                whiteScroll = false;
            }
        }
        if ((GameConstants.isTablet(scroll.getItemId()) || GameConstants.isGeneralScroll(scroll.getItemId())) && !(toScroll.getItemId() / 10000 == 166)) {
            switch (scroll.getItemId() % 1000 / 100) {
                case 0: //1h
                    if (GameConstants.isTwoHandeds(toScroll.getItemId()) || !GameConstants.isWeapon(toScroll.getItemId())) {
                        c.getSession().write(MaplePacketCreator.enableActions());
                        System.out.println("test12");
                        return false;
                    }
                    break;
                case 1: //2h
                    if (!GameConstants.isTwoHandeds(toScroll.getItemId()) || !GameConstants.isWeapon(toScroll.getItemId())) {
                        c.getSession().write(MaplePacketCreator.enableActions());
                        System.out.println("test13");
                        return false;
                    }
                    break;
                case 2: //armor
                    if (GameConstants.isAccessory(toScroll.getItemId()) || GameConstants.isWeapon(toScroll.getItemId())) {
                        c.getSession().write(MaplePacketCreator.enableActions());
                        System.out.println("test14");
                        return false;
                    }
                    break;
                case 3: //accessory
                    if (!GameConstants.isAccessory(toScroll.getItemId()) || GameConstants.isWeapon(toScroll.getItemId())) {
                        c.getSession().write(MaplePacketCreator.enableActions());
                        System.out.println("test15");
                        return false;
                    }
                    break;
            }
        } else if (!GameConstants.isAccessoryScroll(scroll.getItemId()) && !GameConstants.isChaosScroll(scroll.getItemId()) && !GameConstants.isCleanSlate(scroll.getItemId()) && !GameConstants.isEquipScroll(scroll.getItemId()) && !GameConstants.isPotentialScroll(scroll.getItemId()) && !GameConstants.isSpecialScroll(scroll.getItemId())) {
            if (!ii.canScroll(scroll.getItemId(), toScroll.getItemId())) {
                if (toScroll.getAndroid2() == false) {
                    c.getSession().write(MaplePacketCreator.enableActions());
                    System.out.println("test16");
                    return false;
                }
            }
        }
        if (GameConstants.isAccessoryScroll(scroll.getItemId()) && !GameConstants.isAccessory(toScroll.getItemId())) {
            c.getSession().write(MaplePacketCreator.enableActions());
            System.out.println("test17");
            return false;
        }
        if (scroll.getQuantity() <= 0) {
            c.getSession().write(MaplePacketCreator.enableActions());
            System.out.println("test18");
            return false;
        }

        if (legendarySpirit && vegas == 0) {
            if (chr.getSkillLevel(SkillFactory.getSkill(chr.getStat().getSkillByJob(1003, chr.getJob()))) <= 0) {
                c.getSession().write(MaplePacketCreator.enableActions());
                System.out.println("test19");
                return false;
            }
        }
        // Scroll Success/ Failure/ Curse
        Equip scrolled = (Equip) ii.scrollEquipWithId(toScroll, scroll, whiteScroll, chr, vegas);
        ScrollResult scrollSuccess;
        if (scrolled == null) {
            scrollSuccess = Equip.ScrollResult.CURSE;
            if (ItemFlag.RECOVERY.check(toScroll.getFlag())) {//卷軸保護
                RECOVERY = true;
            }
        } else if (scrolled.getLevel() > oldLevel || scrolled.getEnhance() > oldEnhance || scrolled.getState() > oldState || scrolled.getFlag() > oldFlag) {
            scrollSuccess = Equip.ScrollResult.SUCCESS;
        } else if ((GameConstants.isCleanSlate(scroll.getItemId()) && scrolled.getUpgradeSlots() > oldSlots)) {
            scrollSuccess = Equip.ScrollResult.SUCCESS;
        } else {
            scrollSuccess = Equip.ScrollResult.FAIL;
            if (ItemFlag.RECOVERY.check(toScroll.getFlag())) {
                RECOVERY = true;
            }
        }
        // Update
        if (RECOVERY) {
            chr.dropMessage(5, "Due to the protective effect of the scroll, the scroll" + ii.getName(scroll.getItemId()) + "No damage.");
        } else {
            chr.getInventory(GameConstants.getInventoryType(scroll.getItemId())).removeItem(scroll.getPosition(), (short) 1, false);
        }
        if (whiteScroll) {
            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, wscroll.getPosition(), (short) 1, false, false);
        } else if (scrollSuccess == Equip.ScrollResult.FAIL && scrolled.getUpgradeSlots() < oldSlots && c.getPlayer().getInventory(MapleInventoryType.CASH).findById(5640000) != null) {
            chr.setScrolledPosition(scrolled.getPosition());
            if (vegas == 0) {
                c.getSession().write(MaplePacketCreator.pamSongUI());
            }
        }
        if (ItemFlag.PROTECT.check(oldFlag)) {
            toScroll.setFlag((short) (toScroll.getFlag() - ItemFlag.PROTECT.getValue()));
        }
        if (ItemFlag.SAFETY.check(oldFlag)) {
            toScroll.setFlag((short) (toScroll.getFlag() - ItemFlag.SAFETY.getValue()));
        }
        if (ItemFlag.RECOVERY.check(oldFlag)) {
            toScroll.setFlag((short) (toScroll.getFlag() - ItemFlag.RECOVERY.getValue()));
        }
        if (scrollSuccess == Equip.ScrollResult.CURSE) {
            c.getSession().write(InventoryPacket.scrolledItem(scroll, toScroll, true, false));
            if (dst < 0) {
                chr.getInventory(MapleInventoryType.EQUIPPED).removeItem(toScroll.getPosition());
            } else {
                chr.getInventory(MapleInventoryType.EQUIP).removeItem(toScroll.getPosition());
            }
        } else if (vegas == 0) {
            c.getSession().write(InventoryPacket.scrolledItem(scroll, scrolled, false, false));
        }

        chr.getMap().broadcastMessage(chr, EtcPacket.getScrollEffect(c.getPlayer().getId(), scrollSuccess, legendarySpirit, whiteScroll), vegas == 0);
        //addToScrollLog(chr.getAccountID(), chr.getId(), scroll.getItemId(), itemID, oldSlots, (byte)(scrolled == null ? -1 : scrolled.getUpgradeSlots()), oldVH, scrollSuccess.name(), whiteScroll, legendarySpirit, vegas);
        // equipped item was scrolled and changed
        if (dst < 0 && (scrollSuccess == Equip.ScrollResult.SUCCESS || scrollSuccess == Equip.ScrollResult.CURSE) && vegas == 0) {
            chr.equipChanged();
        }
        return true;
    }

    public static void UseMagicWheel(LittleEndianAccessor slea, MapleClient c) {
        byte action = slea.readByte();
        if (action == 0x02) { //시작
            int ivtype = slea.readInt();
            byte slot = (byte) slea.readInt();
            int itemid = slea.readInt();
            int type = itemid == 4400001 ? 1 : itemid == 4400002 ? 2 : 0;

            // Check if inventory is full before proceeding
            if (c.getPlayer().getInventory(MapleInventoryType.USE).getNextFreeSlot() < 1
                    || c.getPlayer().getInventory(MapleInventoryType.EQUIP).getNextFreeSlot() < 1
                    || c.getPlayer().getInventory(MapleInventoryType.SETUP).getNextFreeSlot() < 1
                    || c.getPlayer().getInventory(MapleInventoryType.CASH).getNextFreeSlot() < 1
                    || c.getPlayer().getInventory(MapleInventoryType.ETC).getNextFreeSlot() < 1) {
                // If any inventory is full, notify the player and stop
                c.getSession().write(MaplePacketCreator.magicWheelMessage((byte) 7));
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }

            if (itemid == 4400000 || itemid == 4400001 || itemid == 4400002) { //支援道具ID：4400000
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.ETC, (byte) slot, (short) 1, false);

                List<Integer> items = new ArrayList<Integer>();
                Connection con = null;
                PreparedStatement ps = null;
                ResultSet rs = null;
                try {
                    con = DatabaseConnection.getConnection();
                    ps = con.prepareStatement("SELECT * FROM `wheeldata` WHERE `type` = ? ORDER BY RAND() LIMIT 10");
                    ps.setInt(1, type);
                    rs = ps.executeQuery();
                    while (rs.next()) {
                        items.add(rs.getInt("itemid"));
                    }
                } catch (SQLException ex) {
                    ex.printStackTrace();
                } finally {
                    if (ps != null) {
                        try {
                            ps.close();
                        } catch (Exception e) {
                        }
                    }
                    if (rs != null) {
                        try {
                            rs.close();
                        } catch (Exception e) {
                        }
                    }
                }
                MagicWheel mw = new MagicWheel(items);
                c.getPlayer().setMagicWheel(mw);
                c.getSession().write(MaplePacketCreator.magicWheelStart(items, mw.getUniqueId(), mw.getRandom()));
            } else {
                c.getSession().write(MaplePacketCreator.magicWheelMessage((byte) 7));
                c.getSession().write(MaplePacketCreator.enableActions());
            }
        } else if (action == 0x04) { //종료
            String uniqueid = slea.readMapleAsciiString();
            MagicWheel mw = c.getPlayer().getMagicWheel();
            MapleInventoryManipulator.addById(c, mw.getItemId(mw.getRandom()), (short) 1, "");
            c.getSession().write(MaplePacketCreator.magicWheelMessage((byte) 5));
            c.getPlayer().setMagicWheel(null);
        }
    }


    public static final boolean UseSkillBook(final byte slot, final int itemId, final MapleClient c, final MapleCharacter chr) {
        final Item toUse = chr.getInventory(GameConstants.getInventoryType(itemId)).getItem(slot);

        if (toUse == null || toUse.getQuantity() < 1 || toUse.getItemId() != itemId || chr.hasBlockedInventory()) {
            return false;
        }
        final Map<String, Integer> skilldata = MapleItemInformationProvider.getInstance().getEquipStats(toUse.getItemId());
        if (skilldata == null) { // Hacking or used an unknown item
            return false;
        }
        boolean canuse = false, success = false;
        int skill = 0, maxlevel = 0;

        final Integer SuccessRate = skilldata.get("success");
        final Integer ReqSkillLevel = skilldata.get("reqSkillLevel");
        final Integer MasterLevel = skilldata.get("masterLevel");

        byte i = 0;
        Integer CurrentLoopedSkillId;
        while (true) {
            CurrentLoopedSkillId = skilldata.get("skillid" + i);
            i++;
            if (CurrentLoopedSkillId == null || MasterLevel == null) {
                break; // End of data
            }
            final Skill CurrSkillData = SkillFactory.getSkill(CurrentLoopedSkillId);
            if (CurrSkillData != null && CurrSkillData.canBeLearnedBy(chr.getJob()) && (ReqSkillLevel == null || chr.getSkillLevel(CurrSkillData) >= ReqSkillLevel) && chr.getMasterLevel(CurrSkillData) < MasterLevel) {
                canuse = true;
                if (SuccessRate == null || Randomizer.nextInt(100) <= SuccessRate) {
                    success = true;
                    chr.changeSingleSkillLevel(CurrSkillData, chr.getSkillLevel(CurrSkillData), (byte) (int) MasterLevel);
                } else {
                    success = false;
                }
                MapleInventoryManipulator.removeFromSlot(c, GameConstants.getInventoryType(itemId), slot, (short) 1, false);
                break;
            }
        }
        c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.useSkillBook(chr, skill, maxlevel, canuse, success));
        c.getSession().write(MaplePacketCreator.enableActions());
        return canuse;
    }

    public static final void UseCatchItem(final LittleEndianAccessor slea, final MapleClient c, final MapleCharacter chr) {
        c.getPlayer().updateTick(slea.readInt());
        c.getPlayer().setScrolledPosition((short) 0);
        final byte slot = (byte) slea.readShort();
        final int itemid = slea.readInt();
        final MapleMonster mob = chr.getMap().getMonsterByOid(slea.readInt());
        final Item toUse = chr.getInventory(MapleInventoryType.USE).getItem(slot);
        final MapleMap map = chr.getMap();

        if (toUse != null && toUse.getQuantity() > 0 && toUse.getItemId() == itemid && mob != null && !chr.hasBlockedInventory() && itemid / 10000 == 227 && MapleItemInformationProvider.getInstance().getCardMobId(itemid) == mob.getId()) {
            if (!MapleItemInformationProvider.getInstance().isMobHP(itemid) || mob.getHp() <= mob.getMobMaxHp() / 2) {
                map.broadcastMessage(MobPacket.catchMonster(mob.getObjectId(), itemid, (byte) 1));
                map.killMonster(mob, chr, true, false, (byte) 1);
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, false, false);
                if (MapleItemInformationProvider.getInstance().getCreateId(itemid) > 0) {
                    MapleInventoryManipulator.addById(c, MapleItemInformationProvider.getInstance().getCreateId(itemid), (short) 1, "Catch item " + itemid + " on " + FileoutputUtil.CurrentReadable_Date());
                }
            } else {
                //map.broadcastMessage(MobPacket.catchMonster(mob.getObjectId(), itemid, (byte) 0));//注釋掉 版本不支援0 特效
                map.broadcastMessage(MobPacket.getMobCoolEffect(mob.getObjectId(), itemid));//添加COOL 特效
                c.getSession().write(MaplePacketCreator.catchMob(mob.getId(), itemid, (byte) 0));
            }
        }
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    public static final void UseMountFood(final LittleEndianAccessor slea, final MapleClient c, final MapleCharacter chr) {
        c.getPlayer().updateTick(slea.readInt());
        final byte slot = (byte) slea.readShort();
        final int itemid = slea.readInt(); //2260000 usually
        final Item toUse = chr.getInventory(MapleInventoryType.USE).getItem(slot);
        final MapleMount mount = chr.getMount();

        if (itemid / 10000 == 226 && toUse != null && toUse.getQuantity() > 0 && toUse.getItemId() == itemid && mount != null && !c.getPlayer().hasBlockedInventory()) {
            final int fatigue = mount.getFatigue();

            boolean levelup = false;
            mount.setFatigue((byte) -30);

            if (fatigue > 0) {
                mount.increaseExp();
                final int level = mount.getLevel();
                if (level < 30 && mount.getExp() >= GameConstants.getMountExpNeededForLevel(level + 1)) {
                    mount.setLevel((byte) (level + 1));
                    levelup = true;
                }
            }
            chr.getMap().broadcastMessage(MaplePacketCreator.updateMount(chr, levelup));
            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, false);
        }
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    public static final void UseScriptedNPCItem(final LittleEndianAccessor slea, final MapleClient c, final MapleCharacter chr) {
        c.getPlayer().updateTick(slea.readInt());
        final byte slot = (byte) slea.readShort();
        final int itemId = slea.readInt();
        final Item toUse = chr.getInventory(GameConstants.getInventoryType(itemId)).getItem(slot);
        long expiration_days = 0;
        int mountid = 0;
        int npc = 9010000;
        String item = "" + itemId;

        if (toUse != null && toUse.getQuantity() >= 1 && toUse.getItemId() == itemId && !chr.hasBlockedInventory() && !chr.inPVP()) {
            switch (toUse.getItemId()) {
                case 2430692: //星岩箱子
                    if (c.getPlayer().getInventory(MapleInventoryType.SETUP).getNumFreeSlot() >= 1) {
                        if (c.getPlayer().getInventory(MapleInventoryType.USE).countById(2430692) >= 1) {
                            final int rank = Randomizer.nextInt(100) < 30 ? (Randomizer.nextInt(100) < 4 ? 2 : 1) : 0;
                            final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                            final List<StructItemOption> pots = new LinkedList<StructItemOption>(ii.getAllSocketInfo(rank).values());
                            int newId = 0;
                            while (newId == 0) {
                                StructItemOption pot = pots.get(Randomizer.nextInt(pots.size()));
                                if (pot != null) {
                                    newId = pot.opID;
                                }
                            }
                            if (MapleInventoryManipulator.checkSpace(c, newId, 1, "") && MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, toUse.getItemId(), 1, true, false)) {
                                MapleInventoryManipulator.addById(c, newId, (short) 1, "Scripted item: " + toUse.getItemId() + " on " + FileoutputUtil.CurrentReadable_Date());
                                c.getSession().write(InfoPacket.getShowItemGain(newId, (short) 1, true));
                            } else {
                                c.getPlayer().dropMessage(5, "Please make some space.");
                            }
                        } else {
                            c.getPlayer().dropMessage(5, "You do not have a Nebulite Box.");
                        }
                    } else {
                        c.getPlayer().dropMessage(5, "Please make some space.");
                    }
                    break;
                case 2430144: //秘密的技能書
                    final int itemid = Randomizer.nextInt(373) + 2290000;
                    if (MapleItemInformationProvider.getInstance().itemExists(itemid) && !MapleItemInformationProvider.getInstance().getName(itemid).contains("Special") && !MapleItemInformationProvider.getInstance().getName(itemid).contains("Event")) {
                        MapleInventoryManipulator.addById(c, itemid, (short) 1, "Reward item: " + toUse.getItemId() + " on " + FileoutputUtil.CurrentReadable_Date());
                        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (byte) 1, false);
                    }
                    break;
                case 2430370: //秘密配方
                    final int scroll = Randomizer.nextInt(2293) + 2510000;
                    if (MapleItemInformationProvider.getInstance().itemExists(scroll) && !MapleItemInformationProvider.getInstance().getName(scroll).contains("Special") && !MapleItemInformationProvider.getInstance().getName(scroll).contains("Event")) {
                        MapleInventoryManipulator.addById(c, scroll, (short) 1, "Reward item: " + toUse.getItemId() + " on " + FileoutputUtil.CurrentReadable_Date());
                        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (byte) 1, false);
                    }
                    break;
                case 2430327: //pachinko
                    mountid = 1130;
                    expiration_days = -1;
                    break;
                case 2430328: //pachinko
                    mountid = 1130;
                    expiration_days = 90;
                    break;
                default:
                    NPCScriptManager.getInstance().startItemScript(c, npc, item); //maple admin as default npc
                    break;
            }
        }
        if (mountid > 0) {
            mountid = c.getPlayer().getStat().getSkillByJob(mountid, c.getPlayer().getJob());
            final int fk = GameConstants.getMountItem(mountid, c.getPlayer());
            if (GameConstants.GMS && fk > 0 && mountid < 80001000) { //TODO JUMP
                for (int i = 80001001; i < 80001999; i++) {
                    final Skill skill = SkillFactory.getSkill(i);
                    if (skill != null && GameConstants.getMountItem(skill.getId(), c.getPlayer()) == fk) {
                        mountid = i;
                        break;
                    }
                }
            }
            if (c.getPlayer().getSkillLevel(mountid) > 0) {
                c.getPlayer().dropMessage(5, "You already have this skill.");
            } else if (SkillFactory.getSkill(mountid) == null || GameConstants.getMountItem(mountid, c.getPlayer()) == 0) {
                c.getPlayer().dropMessage(5, "The skill could not be gained.");
            } else if (expiration_days > 0) {
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (byte) 1, false);
                c.getPlayer().changeSingleSkillLevel(SkillFactory.getSkill(mountid), (byte) 1, (byte) 1, System.currentTimeMillis() + (long) (expiration_days * 24 * 60 * 60 * 1000));
                c.getPlayer().dropMessage(5, "The skill has been attained.");
            }
        }
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    public static final void UseSummonBag(final LittleEndianAccessor slea, final MapleClient c, final MapleCharacter chr) {
        if (!chr.isAlive() || chr.hasBlockedInventory() || chr.inPVP()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        c.getPlayer().updateTick(slea.readInt());
        final byte slot = (byte) slea.readShort();
        final int itemId = slea.readInt();
        final Item toUse = chr.getInventory(MapleInventoryType.USE).getItem(slot);

        if (toUse != null && toUse.getQuantity() >= 1 && toUse.getItemId() == itemId && (c.getPlayer().getMapId() < 910000000 || c.getPlayer().getMapId() > 910000022)) {
            final Map<String, Integer> toSpawn = MapleItemInformationProvider.getInstance().getEquipStats(itemId);

            if (toSpawn == null) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            MapleMonster ht = null;
            int type = 0;
            for (Entry<String, Integer> i : toSpawn.entrySet()) {
                if (i.getKey().startsWith("mob") && Randomizer.nextInt(99) <= i.getValue()) {
                    ht = MapleLifeFactory.getMonster(Integer.parseInt(i.getKey().substring(3)));
                    chr.getMap().spawnMonster_sSack(ht, chr.getPosition(), type);
                }
            }
            if (ht == null) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }

            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, false);
        }
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    public static final void UseTreasureChest(final LittleEndianAccessor slea, final MapleClient c, final MapleCharacter chr) {
        final short slot = slea.readShort();
        final int itemid = slea.readInt();

        final Item toUse = chr.getInventory(MapleInventoryType.ETC).getItem((byte) slot);
        if (toUse == null || toUse.getQuantity() <= 0 || toUse.getItemId() != itemid || chr.hasBlockedInventory()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        int reward;
        int keyIDforRemoval = 0;
        String box;

        switch (toUse.getItemId()) {
            case 4280000: // Gold box
                reward = RandomRewards.getGoldBoxReward();
                keyIDforRemoval = 5490000;
                box = "Gold";
                break;
            case 4280001: // Silver box
                reward = RandomRewards.getSilverBoxReward();
                keyIDforRemoval = 5490001;
                box = "Silver";
                break;
            default: // Up to no good
                return;
        }

        // Get the quantity
        int amount = 1;
        switch (reward) {
            case 2000004:
                amount = 200; // Elixir
                break;
            case 2000005:
                amount = 100; // Power Elixir
                break;
        }
        if (chr.getInventory(MapleInventoryType.CASH).countById(keyIDforRemoval) > 0) {
            final Item item = MapleInventoryManipulator.addbyId_Gachapon(c, reward, (short) amount);

            if (item == null) {
                chr.dropMessage(5, "Please check your item inventory and see if you have a Master Key, or if the inventory is full.");
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.ETC, (byte) slot, (short) 1, true);
            MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, keyIDforRemoval, 1, true, false);
            c.getSession().write(InfoPacket.getShowItemGain(reward, (short) amount, true));

            if (GameConstants.gachaponRareItem(item.getItemId()) > 0) {
                World.Broadcast.broadcastSmega(MaplePacketCreator.getGachaponMega(c.getPlayer().getName(), " : got a(n)", item, (byte) 2, "[" + box + " Chest]"));
            }
        } else {
            chr.dropMessage(5, "Please check your item inventory and see if you have a Master Key, or if the inventory is full.");
            c.getSession().write(MaplePacketCreator.enableActions());
        }
    }

    public static final void UseCashItem(final LittleEndianAccessor slea, final MapleClient c) {
        if (c.getPlayer() == null || c.getPlayer().getMap() == null || c.getPlayer().inPVP()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        c.getPlayer().updateTick(slea.readInt());
        c.getPlayer().setScrolledPosition((short) 0);
        final byte slot = (byte) slea.readShort();
        final int itemId = slea.readInt();

        final Item toUse = c.getPlayer().getInventory(MapleInventoryType.CASH).getItem(slot);
        if (toUse == null || toUse.getItemId() != itemId || toUse.getQuantity() < 1 || c.getPlayer().hasBlockedInventory()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }

        boolean used = false, cc = false;

        switch (itemId) {
            case 5330000: //퀵배송
            {
                if (!c.getPlayer().hasBlockedInventory()) {
                    c.getPlayer().setConversation(2);
                    c.getSession().write(EtcPacket.sendDuey((byte) 0x1B, null, null));
                }
                break;
            }
            case 5155000: // 카르타의 진주
                c.getPlayer().changeElf();
                break;
            case 5043001: // NPC Teleport Rock
            case 5043000: { // NPC Teleport Rock
                final short questid = slea.readShort();
                final int npcid = slea.readInt();
                final MapleQuest quest = MapleQuest.getInstance(questid);

                if (c.getPlayer().getQuest(quest).getStatus() == 1 && quest.canComplete(c.getPlayer(), npcid)) {
                    final int mapId = MapleLifeFactory.getNPCLocation(npcid);
                    if (mapId != -1) {
                        final MapleMap map = c.getChannelServer().getMapFactory().getMap(mapId);
                        if (map.containsNPC(npcid) && !FieldLimitType.VipRock.check(c.getPlayer().getMap().getFieldLimit()) && !FieldLimitType.VipRock.check(map.getFieldLimit()) && !c.getPlayer().isInBlockedMap()) {
                            c.getPlayer().changeMap(map, map.getPortal(0));
                        }
                        used = true;
                    } else {
                        c.getPlayer().dropMessage(1, "Unknown error has occurred.");
                    }
                }
                break;
            }
            case 5040004: {
                used = UseHyperTeleRock(slea, c, itemId);
                break;
            }
            case 5041001:
            case 5040003:
            case 5040002:
            case 2320000: // The Teleport Rock
            case 5041000: // VIP Teleport Rock
            case 5040000: // The Teleport Rock
            case 5040001: { // Teleport Coke
                used = UseTeleRock(slea, c, itemId);
                break;
            }
            case 5450005: {
                c.getPlayer().setConversation(4);
                c.getPlayer().getStorage().sendStorage(c, 1022005);
                break;
            }
            /*case 2501000:
            case 2501001:{
                c.getPlayer().resetStats(4, 4, 4, 4);
            }*/
            case 5050000: { // AP Reset
                Map<MapleStat, Integer> statupdate = new EnumMap<MapleStat, Integer>(MapleStat.class);
                final int apto = GameConstants.GMS ? (int) slea.readLong() : slea.readInt();
                final int apfrom = GameConstants.GMS ? (int) slea.readLong() : slea.readInt();

                if (apto == apfrom) {
                    break; // Hack
                }
                final int job = c.getPlayer().getJob();
                final PlayerStats playerst = c.getPlayer().getStat();
                used = true;

                switch (apto) { // AP to
                    case 64: // str
                        if (playerst.getStr() >= 999) {
                            used = false;
                        }
                        break;
                    case 128: // dex
                        if (playerst.getDex() >= 999) {
                            used = false;
                        }
                        break;
                    case 256: // int
                        if (playerst.getInt() >= 999) {
                            used = false;
                        }
                        break;
                    case 512: // luk
                        if (playerst.getLuk() >= 999) {
                            used = false;
                        }
                        break;
                    case 2048: // hp
                        if (playerst.getMaxHp() >= 99999) {
                            used = false;
                        }
                        break;
                    case 8192: // mp
                        if (playerst.getMaxMp() >= 99999) {
                            used = false;
                        }
                        break;
                }
                switch (apfrom) { // AP to
                    case 64: // str
                        if (playerst.getStr() <= 4 || (c.getPlayer().getJob() % 1000 / 100 == 1 && playerst.getStr() <= 35)) {
                            used = false;
                        }
                        break;
                    case 128: // dex
                        if (playerst.getDex() <= 4 || (c.getPlayer().getJob() % 1000 / 100 == 3 && playerst.getDex() <= 25) || (c.getPlayer().getJob() % 1000 / 100 == 4 && playerst.getDex() <= 25) || (c.getPlayer().getJob() % 1000 / 100 == 5 && playerst.getDex() <= 20)) {
                            used = false;
                        }
                        break;
                    case 256: // int
                        if (playerst.getInt() <= 4 || (c.getPlayer().getJob() % 1000 / 100 == 2 && playerst.getInt() <= 20)) {
                            used = false;
                        }
                        break;
                    case 512: // luk
                        if (playerst.getLuk() <= 4) {
                            used = false;
                        }
                        break;
                    case 2048: // hp
                        if (/*playerst.getMaxMp() < ((c.getPlayer().getLevel() * 14) + 134) || */c.getPlayer().getHpApUsed() <= 0 || c.getPlayer().getHpApUsed() >= 10000) {
                            used = false;
                            c.getPlayer().dropMessage(1, "You need points in HP or MP in order to take points out.");
                        }
                        break;
                    case 8192: // mp
                        if (/*playerst.getMaxMp() < ((c.getPlayer().getLevel() * 14) + 134) || */c.getPlayer().getHpApUsed() <= 0 || c.getPlayer().getHpApUsed() >= 10000) {
                            used = false;
                            c.getPlayer().dropMessage(1, "You need points in HP or MP in order to take points out.");
                        }
                        break;
                }
                if (used) {
                    switch (apto) { // AP to
                        case 64: { // str
                            final int toSet = playerst.getStr() + 1;
                            playerst.setStr((short) toSet, c.getPlayer());
                            statupdate.put(MapleStat.STR, toSet);
                            break;
                        }
                        case 128: { // dex
                            final int toSet = playerst.getDex() + 1;
                            playerst.setDex((short) toSet, c.getPlayer());
                            statupdate.put(MapleStat.DEX, toSet);
                            break;
                        }
                        case 256: { // int
                            final int toSet = playerst.getInt() + 1;
                            playerst.setInt((short) toSet, c.getPlayer());
                            statupdate.put(MapleStat.INT, toSet);
                            break;
                        }
                        case 512: { // luk
                            final int toSet = playerst.getLuk() + 1;
                            playerst.setLuk((short) toSet, c.getPlayer());
                            statupdate.put(MapleStat.LUK, toSet);
                            break;
                        }
                        case 2048: // hp
                            int maxhp = playerst.getMaxHp();
                            if (GameConstants.isBeginnerJob(job)) { // Beginner
                                maxhp += Randomizer.rand(4, 8);
                            } else if ((job >= 100 && job <= 132) || (job >= 3200 && job <= 3212) || (job >= 1100 && job <= 1112) || (job >= 3100 && job <= 3112)) { // Warrior
                                maxhp += Randomizer.rand(36, 42);
                            } else if ((job >= 200 && job <= 232) || (GameConstants.isEvan(job)) || (job >= 1200 && job <= 1212)) { // Magician
                                maxhp += Randomizer.rand(10, 12);
                            } else if ((job >= 300 && job <= 322) || (job >= 400 && job <= 434) || (job >= 1300 && job <= 1312) || (job >= 1400 && job <= 1412) || (job >= 3300 && job <= 3312) || (job >= 2300 && job <= 2312)) { // Bowman
                                maxhp += Randomizer.rand(14, 18);
                            } else if ((job >= 510 && job <= 512) || (job >= 1510 && job <= 1512)) {
                                maxhp += Randomizer.rand(24, 28);
                            } else if ((job >= 500 && job <= 532) || (job >= 3500 && job <= 3512) || job == 1500) { // Pirate
                                maxhp += Randomizer.rand(16, 20);
                            } else if (job >= 2000 && job <= 2112) { // Aran
                                maxhp += Randomizer.rand(34, 38);
                            } else { // GameMaster
                                maxhp += Randomizer.rand(50, 100);
                            }
                            maxhp = Math.min(99999, Math.abs(maxhp));
                            c.getPlayer().setHpApUsed((short) (c.getPlayer().getHpApUsed() + 1));
                            playerst.setMaxHp(maxhp, c.getPlayer());
                            statupdate.put(MapleStat.MAXHP, (int) maxhp);
                            break;

                        case 8192: // mp
                            int maxmp = playerst.getMaxMp();

                            if (GameConstants.isBeginnerJob(job)) { // Beginner
                                maxmp += Randomizer.rand(6, 8);
                            } else if (job >= 3100 && job <= 3112) {
                                break;
                            } else if ((job >= 100 && job <= 132) || (job >= 1100 && job <= 1112) || (job >= 2000 && job <= 2112)) { // Warrior
                                maxmp += Randomizer.rand(4, 9);
                            } else if ((job >= 200 && job <= 232) || (GameConstants.isEvan(job)) || (job >= 3200 && job <= 3212) || (job >= 1200 && job <= 1212)) { // Magician
                                maxmp += Randomizer.rand(32, 36);
                            } else if ((job >= 300 && job <= 322) || (job >= 400 && job <= 434) || (job >= 500 && job <= 532) || (job >= 3200 && job <= 3212) || (job >= 3500 && job <= 3512) || (job >= 1300 && job <= 1312) || (job >= 1400 && job <= 1412) || (job >= 1500 && job <= 1512) || (job >= 2300 && job <= 2312)) { // Bowman
                                maxmp += Randomizer.rand(8, 10);
                            } else { // GameMaster
                                maxmp += Randomizer.rand(50, 100);
                            }
                            maxmp = Math.min(99999, Math.abs(maxmp));
                            c.getPlayer().setHpApUsed((short) (c.getPlayer().getHpApUsed() + 1));
                            playerst.setMaxMp(maxmp, c.getPlayer());
                            statupdate.put(MapleStat.MAXMP, (int) maxmp);
                            break;
                    }
                    switch (apfrom) { // AP from
                        case 64: { // str
                            final int toSet = playerst.getStr() - 1;
                            playerst.setStr((short) toSet, c.getPlayer());
                            statupdate.put(MapleStat.STR, toSet);
                            break;
                        }
                        case 128: { // dex
                            final int toSet = playerst.getDex() - 1;
                            playerst.setDex((short) toSet, c.getPlayer());
                            statupdate.put(MapleStat.DEX, toSet);
                            break;
                        }
                        case 256: { // int
                            final int toSet = playerst.getInt() - 1;
                            playerst.setInt((short) toSet, c.getPlayer());
                            statupdate.put(MapleStat.INT, toSet);
                            break;
                        }
                        case 512: { // luk
                            final int toSet = playerst.getLuk() - 1;
                            playerst.setLuk((short) toSet, c.getPlayer());
                            statupdate.put(MapleStat.LUK, toSet);
                            break;
                        }
                        case 2048: // HP
                            int maxhp = playerst.getMaxHp();
                            if (GameConstants.isBeginnerJob(job)) { // Beginner
                                maxhp -= 12;
                            } else if ((job >= 200 && job <= 232) || (job >= 1200 && job <= 1212)) { // Magician
                                maxhp -= 10;
                            } else if ((job >= 300 && job <= 322) || (job >= 400 && job <= 434) || (job >= 1300 && job <= 1312) || (job >= 1400 && job <= 1412) || (job >= 3300 && job <= 3312) || (job >= 3500 && job <= 3512) || (job >= 2300 && job <= 2312)) { // Bowman, Thief
                                maxhp -= 15;
                            } else if ((job >= 500 && job <= 532) || (job >= 1500 && job <= 1512)) { // Pirate
                                maxhp -= 22;
                            } else if (((job >= 100 && job <= 132) || job >= 1100 && job <= 1112) || (job >= 3100 && job <= 3112)) { // Soul Master
                                maxhp -= 32;
                            } else if ((job >= 2000 && job <= 2112) || (job >= 3200 && job <= 3212)) { // Aran
                                maxhp -= 40;
                            } else { // GameMaster
                                maxhp -= 20;
                            }
                            c.getPlayer().setHpApUsed((short) (c.getPlayer().getHpApUsed() - 1));
                            playerst.setMaxHp(maxhp, c.getPlayer());
                            statupdate.put(MapleStat.MAXHP, (int) maxhp);
                            break;
                        case 8192: // MP
                            int maxmp = playerst.getMaxMp();
                            if (GameConstants.isBeginnerJob(job)) { // Beginner
                                maxmp -= 8;
                            } else if (job >= 3100 && job <= 3112) {
                                break;
                            } else if ((job >= 100 && job <= 132) || (job >= 1100 && job <= 1112)) { // Warrior
                                maxmp -= 4;
                            } else if ((job >= 200 && job <= 232) || (job >= 1200 && job <= 1212)) { // Magician
                                maxmp -= 30;
                            } else if ((job >= 500 && job <= 532) || (job >= 300 && job <= 322) || (job >= 400 && job <= 434) || (job >= 1300 && job <= 1312) || (job >= 1400 && job <= 1412) || (job >= 1500 && job <= 1512) || (job >= 3300 && job <= 3312) || (job >= 3500 && job <= 3512) || (job >= 2300 && job <= 2312)) { // Pirate, Bowman. Thief
                                maxmp -= 10;
                            } else if (job >= 2000 && job <= 2112) { // Aran
                                maxmp -= 5;
                            } else { // GameMaster
                                maxmp -= 20;
                            }
                            c.getPlayer().setHpApUsed((short) (c.getPlayer().getHpApUsed() - 1));
                            playerst.setMaxMp(maxmp, c.getPlayer());
                            statupdate.put(MapleStat.MAXMP, (int) maxmp);
                            break;
                    }
                    c.getSession().write(MaplePacketCreator.updatePlayerStats(statupdate, true, c.getPlayer()));
                }
                break;
            }
            case 5220083: {//starter pack
                used = true;
                for (Entry<Integer, StructFamiliar> f : MapleItemInformationProvider.getInstance().getFamiliars().entrySet()) {
                    if (f.getValue().itemid == 2870055 || f.getValue().itemid == 2871002 || f.getValue().itemid == 2870235 || f.getValue().itemid == 2870019) {
                        MonsterFamiliar mf = c.getPlayer().getFamiliars().get(f.getKey());
                        if (mf != null) {
                            if (mf.getVitality() >= 3) {
                                mf.setExpiry((long) Math.min(System.currentTimeMillis() + 90 * 24 * 60 * 60000L, mf.getExpiry() + 30 * 24 * 60 * 60000L));
                            } else {
                                mf.setVitality(mf.getVitality() + 1);
                                mf.setExpiry((long) (mf.getExpiry() + 30 * 24 * 60 * 60000L));
                            }
                        } else {
                            mf = new MonsterFamiliar(c.getPlayer().getId(), f.getKey(), (long) (System.currentTimeMillis() + 30 * 24 * 60 * 60000L));
                            c.getPlayer().getFamiliars().put(f.getKey(), mf);
                        }
                        c.getSession().write(EtcPacket.registerFamiliar(mf));
                    }
                }
                break;
            }
            case 5220084: {//booster pack
                if (c.getPlayer().getInventory(MapleInventoryType.USE).getNumFreeSlot() < 3) {
                    c.getPlayer().dropMessage(5, "Make 3 USE space.");
                    break;
                }
                used = true;
                int[] familiars = new int[3];
                while (true) {
                    for (int i = 0; i < familiars.length; i++) {
                        if (familiars[i] > 0) {
                            continue;
                        }
                        for (Map.Entry<Integer, StructFamiliar> f : MapleItemInformationProvider.getInstance().getFamiliars().entrySet()) {
                            if (Randomizer.nextInt(500) == 0 && ((i < 2 && f.getValue().grade == 0 || (i == 2 && f.getValue().grade != 0)))) {
                                MapleInventoryManipulator.addById(c, f.getValue().itemid, (short) 1, "Booster Pack");
                                //c.getSession().write(CField.getBoosterFamiliar(c.getPlayer().getId(), f.getKey(), 0));
                                familiars[i] = f.getValue().itemid;
                                break;
                            }
                        }
                    }
                    if (familiars[0] > 0 && familiars[1] > 0 && familiars[2] > 0) {
                        break;
                    }
                }
                c.getSession().write(MTSCSPacket.getBoosterPack(familiars[0], familiars[1], familiars[2]));
                c.getSession().write(MTSCSPacket.getBoosterPackClick());
                c.getSession().write(MTSCSPacket.getBoosterPackReveal());
                break;
            }
            case 5050001: // SP Reset (1st job)
            case 5050002: // SP Reset (2nd job)
            case 5050003: // SP Reset (3rd job)
            case 5050004:  // SP Reset (4th job)
            case 5050005: //evan sp resets
            case 5050006:
            case 5050007:
            case 5050008:
            case 5050009: {
                if (itemId >= 5050005 && !GameConstants.isEvan(c.getPlayer().getJob())) {
                    c.getPlayer().dropMessage(1, "This reset is only for Evans.");
                    break;
                } //well i dont really care other than this o.o
                if (itemId < 5050005 && GameConstants.isEvan(c.getPlayer().getJob())) {
                    c.getPlayer().dropMessage(1, "This reset is only for non-Evans.");
                    break;
                } //well i dont really care other than this o.o
                int skill1 = slea.readInt();
                int skill2 = slea.readInt();
                for (int i : GameConstants.blockedSkills) {
                    if (skill1 == i) {
                        c.getPlayer().dropMessage(1, "You may not add this skill.");
                        return;
                    }
                }

                Skill skillSPTo = SkillFactory.getSkill(skill1);
                Skill skillSPFrom = SkillFactory.getSkill(skill2);

                if (skillSPTo.isBeginnerSkill() || skillSPFrom.isBeginnerSkill()) {
                    c.getPlayer().dropMessage(1, "You may not add beginner skills.");
                    break;
                }
                if (GameConstants.getSkillBookForSkill(skill1) != GameConstants.getSkillBookForSkill(skill2)) { //resistance evan
                    c.getPlayer().dropMessage(1, "You may not add different job skills.");
                    break;
                }
                //if (GameConstants.getJobNumber(skill1 / 10000) > GameConstants.getJobNumber(skill2 / 10000)) { //putting 3rd job skillpoints into 4th job for example
                //    c.getPlayer().dropMessage(1, "You may not add skillpoints to a higher job.");
                //    break;
                //}
                if ((c.getPlayer().getSkillLevel(skillSPTo) + 1 <= skillSPTo.getMaxLevel()) && c.getPlayer().getSkillLevel(skillSPFrom) > 0 && skillSPTo.canBeLearnedBy(c.getPlayer().getJob())) {
                    if (skillSPTo.isFourthJob() && (c.getPlayer().getSkillLevel(skillSPTo) + 1 > c.getPlayer().getMasterLevel(skillSPTo))) {
                        c.getPlayer().dropMessage(1, "You will exceed the master level.");
                        break;
                    }
                    if (itemId >= 5050005) {
                        if (GameConstants.getSkillBookForSkill(skill1) != (itemId - 5050005) * 2 && GameConstants.getSkillBookForSkill(skill1) != (itemId - 5050005) * 2 + 1) {
                            c.getPlayer().dropMessage(1, "You may not add this job SP using this reset.");
                            break;
                        }
                    } else {
                        int theJob = GameConstants.getJobNumber(skill2 / 10000);
                        switch (skill2 / 10000) {
                            case 430:
                                theJob = 1;
                                break;
                            case 432:
                            case 431:
                                theJob = 2;
                                break;
                            case 433:
                                theJob = 3;
                                break;
                            case 434:
                                theJob = 4;
                                break;
                        }
                        if (theJob != itemId - 5050000) { //you may only subtract from the skill if the ID matches Sp reset
                            c.getPlayer().dropMessage(1, "You may not subtract from this skill. Use the appropriate SP reset.");
                            break;
                        }
                    }
                    final Map<Skill, SkillEntry> sa = new HashMap<Skill, SkillEntry>();
                    sa.put(skillSPFrom, new SkillEntry((byte) (c.getPlayer().getSkillLevel(skillSPFrom) - 1), c.getPlayer().getMasterLevel(skillSPFrom), SkillFactory.getDefaultSExpiry(skillSPFrom)));
                    sa.put(skillSPTo, new SkillEntry((byte) (c.getPlayer().getSkillLevel(skillSPTo) + 1), c.getPlayer().getMasterLevel(skillSPTo), SkillFactory.getDefaultSExpiry(skillSPTo)));
                    c.getPlayer().changeSkillsLevel(sa);
                    used = true;
                }
                break;
            }
            case 5500000: { // Magic Hourglass 1 day
                final Item item = c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(slea.readShort());
                final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                final int days = 1;
                if (item != null && !GameConstants.isAccessory(item.getItemId()) && item.getExpiration() > -1 && !ii.isCash(item.getItemId()) && System.currentTimeMillis() + (400 * 24 * 60 * 60 * 1000L) > item.getExpiration() + (days * 24 * 60 * 60 * 1000L)) {
                    boolean change = true;
                    for (String z : GameConstants.RESERVED) {
                        if (c.getPlayer().getName().indexOf(z) != -1 || item.getOwner().indexOf(z) != -1) {
                            change = false;
                        }
                    }
                    if (change) {
                        item.setExpiration(item.getExpiration() + (days * 24 * 60 * 60 * 1000));
                        c.getPlayer().forceReAddItem(item, MapleInventoryType.EQUIPPED);
                        used = true;
                    } else {
                        c.getPlayer().dropMessage(1, "It may not be used on this item.");
                    }
                }
                break;
            }
            case 5500001: { // Magic Hourglass 7 day
                final Item item = c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(slea.readShort());
                final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                final int days = 7;
                if (item != null && !GameConstants.isAccessory(item.getItemId()) && item.getExpiration() > -1 && !ii.isCash(item.getItemId()) && System.currentTimeMillis() + (400 * 24 * 60 * 60 * 1000L) > item.getExpiration() + (days * 24 * 60 * 60 * 1000L)) {
                    boolean change = true;
                    for (String z : GameConstants.RESERVED) {
                        if (c.getPlayer().getName().indexOf(z) != -1 || item.getOwner().indexOf(z) != -1) {
                            change = false;
                        }
                    }
                    if (change) {
                        item.setExpiration(item.getExpiration() + (days * 24 * 60 * 60 * 1000));
                        c.getPlayer().forceReAddItem(item, MapleInventoryType.EQUIPPED);
                        used = true;
                    } else {
                        c.getPlayer().dropMessage(1, "It may not be used on this item.");
                    }
                }
                break;
            }
            case 5500002: { // Magic Hourglass 20 day
                final Item item = c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(slea.readShort());
                final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                final int days = 20;
                if (item != null && !GameConstants.isAccessory(item.getItemId()) && item.getExpiration() > -1 && !ii.isCash(item.getItemId()) && System.currentTimeMillis() + (400 * 24 * 60 * 60 * 1000L) > item.getExpiration() + (days * 24 * 60 * 60 * 1000L)) {
                    boolean change = true;
                    for (String z : GameConstants.RESERVED) {
                        if (c.getPlayer().getName().indexOf(z) != -1 || item.getOwner().indexOf(z) != -1) {
                            change = false;
                        }
                    }
                    if (change) {
                        item.setExpiration(item.getExpiration() + (days * 24 * 60 * 60 * 1000));
                        c.getPlayer().forceReAddItem(item, MapleInventoryType.EQUIPPED);
                        used = true;
                    } else {
                        c.getPlayer().dropMessage(1, "It may not be used on this item.");
                    }
                }
                break;
            }
            case 5500005: { // Magic Hourglass 50 day
                final Item item = c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(slea.readShort());
                final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                final int days = 50;
                if (item != null && !GameConstants.isAccessory(item.getItemId()) && item.getExpiration() > -1 && !ii.isCash(item.getItemId()) && System.currentTimeMillis() + (400 * 24 * 60 * 60 * 1000L) > item.getExpiration() + (days * 24 * 60 * 60 * 1000L)) {
                    boolean change = true;
                    for (String z : GameConstants.RESERVED) {
                        if (c.getPlayer().getName().indexOf(z) != -1 || item.getOwner().indexOf(z) != -1) {
                            change = false;
                        }
                    }
                    if (change) {
                        item.setExpiration(item.getExpiration() + (days * 24 * 60 * 60 * 1000L));//載入時間超過24天需要添加L
                        c.getPlayer().forceReAddItem(item, MapleInventoryType.EQUIPPED);
                        used = true;
                    } else {
                        c.getPlayer().dropMessage(1, "It may not be used on this item.");
                    }
                }
                break;
            }
            case 5500006: { // Magic Hourglass 99 day
                final Item item = c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(slea.readShort());
                final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                final int days = 99;
                if (item != null && !GameConstants.isAccessory(item.getItemId()) && item.getExpiration() > -1 && !ii.isCash(item.getItemId()) && System.currentTimeMillis() + (400 * 24 * 60 * 60 * 1000L) > item.getExpiration() + (days * 24 * 60 * 60 * 1000L)) {
                    boolean change = true;
                    for (String z : GameConstants.RESERVED) {
                        if (c.getPlayer().getName().indexOf(z) != -1 || item.getOwner().indexOf(z) != -1) {
                            change = false;
                        }
                    }
                    if (change) {
                        item.setExpiration(item.getExpiration() + (days * 24 * 60 * 60 * 1000L));//載入時間超過24天需要添加L
                        c.getPlayer().forceReAddItem(item, MapleInventoryType.EQUIPPED);
                        used = true;
                    } else {
                        c.getPlayer().dropMessage(1, "It may not be used on this item.");
                    }
                }
                break;
            }
            case 5060000: { // Item Tag
                final Item item = c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(slea.readShort());

                if (item != null && item.getOwner().equals("")) {
                    boolean change = true;
                    for (String z : GameConstants.RESERVED) {
                        if (c.getPlayer().getName().indexOf(z) != -1) {
                            change = false;
                        }
                    }
                    if (change) {
                        item.setOwner(c.getPlayer().getName());
                        c.getPlayer().forceReAddItem(item, MapleInventoryType.EQUIPPED);
                        used = true;
                    }
                }
                break;
            }
            case 5680015: {
                if (c.getPlayer().getFatigue() > 0) {
                    c.getPlayer().setFatigue(0);
                    used = true;
                }
                break;
            }
            case 5534000: { //tims lab
                final Item item = c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem((byte) slea.readInt());
                if (item != null) {
                    final Equip eq = (Equip) item;
                    if (eq.getState() == 0) {
                        eq.resetPotential();
                        c.getPlayer().getMap().broadcastMessage(EtcPacket.showPotentialReset(false, c.getPlayer().getId(), true, itemId));
                        c.getSession().write(InventoryPacket.scrolledItem(toUse, item, false, true));
                        c.getPlayer().forceReAddItem_NoUpdate(item, MapleInventoryType.EQUIP);
                        used = true;
                    } else {
                        c.getPlayer().dropMessage(5, "This item's Potential cannot be reset.");
                    }
                } else {
                    c.getPlayer().getMap().broadcastMessage(EtcPacket.showPotentialReset(false, c.getPlayer().getId(), false, itemId));
                }
                break;
            }
            case 5062000: { //miracle cube
                if (c.getPlayer().getLevel() < 10) {
                    c.getPlayer().dropMessage(1, "You may not use this until level 10.");
                } else {
                    final Item item = c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem((byte) slea.readInt());
                    if (item != null && c.getPlayer().getInventory(MapleInventoryType.USE).getNumFreeSlot() >= 1) {
                        final Equip eq = (Equip) item;
                        if (eq.getState() >= 17 && eq.getState() != 20) {
                            eq.renewPotential(0);
                            c.getPlayer().getMap().broadcastMessage(EtcPacket.showPotentialReset(false, c.getPlayer().getId(), true, itemId));
                            c.getSession().write(InventoryPacket.scrolledItem(toUse, item, false, true));
                            c.getPlayer().forceReAddItem_NoUpdate(item, MapleInventoryType.EQUIP);
                            MapleInventoryManipulator.addById(c, 2430112, (short) 1, "Cube" + " on " + FileoutputUtil.CurrentReadable_Date());
                            used = true;
                            Reveal(item, c, false, 0);
                        } else {
                            c.getPlayer().dropMessage(5, "This item's Potential cannot be reset.");
                        }
                    } else {
                        c.getPlayer().getMap().broadcastMessage(EtcPacket.showPotentialReset(false, c.getPlayer().getId(), false, itemId));
                    }
                }
                break;
            }
            case 5062100:
            case 5062001: { //premium cube
                if (c.getPlayer().getLevel() < 10) {
                    c.getPlayer().dropMessage(1, "You may not use this until level 10.");
                } else {
                    final Item item = c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem((byte) slea.readInt());
                    if (item != null && c.getPlayer().getInventory(MapleInventoryType.USE).getNumFreeSlot() >= 1) {
                        final Equip eq = (Equip) item;
                        if (eq.getState() >= 17 && eq.getState() != 20) {
                            eq.renewPotential(1);
                            c.getPlayer().getMap().broadcastMessage(EtcPacket.showPotentialReset(false, c.getPlayer().getId(), true, itemId));
                            c.getSession().write(InventoryPacket.scrolledItem(toUse, item, false, true));
                            c.getPlayer().forceReAddItem_NoUpdate(item, MapleInventoryType.EQUIP);
                            MapleInventoryManipulator.addById(c, 2430112, (short) 1, "Cube" + " on " + FileoutputUtil.CurrentReadable_Date());
                            used = true;
                            Reveal(item, c, false, 1);
                        } else {
                            c.getPlayer().dropMessage(5, "This item's Potential cannot be reset.");
                        }
                    } else {
                        c.getPlayer().getMap().broadcastMessage(EtcPacket.showPotentialReset(false, c.getPlayer().getId(), false, itemId));
                    }
                }
                break;
            }
            case 5062002: { //super miracle cube
                if (c.getPlayer().getLevel() < 10) {
                    c.getPlayer().dropMessage(1, "You may not use this until level 10.");
                } else {
                    final Item item = c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem((byte) slea.readInt());
                    if (item != null && c.getPlayer().getInventory(MapleInventoryType.USE).getNumFreeSlot() >= 1) {
                        final Equip eq = (Equip) item;
                        if (eq.getState() >= 17) {
                            eq.renewPotential(3);
                            //eq.renewPotential(3);
                            c.getPlayer().getMap().broadcastMessage(EtcPacket.showPotentialReset(false, c.getPlayer().getId(), true, itemId));
                            c.getSession().write(InventoryPacket.scrolledItem(toUse, item, false, true));
                            c.getPlayer().forceReAddItem_NoUpdate(item, MapleInventoryType.EQUIP);
                            MapleInventoryManipulator.addById(c, 2430481, (short) 1, "Cube" + " on " + FileoutputUtil.CurrentReadable_Date());
                            used = true;
                            Reveal(item, c, false, 2);
                        } else {
                            c.getPlayer().dropMessage(5, "This item's Potential cannot be reset.");
                        }
                    } else {
                        c.getPlayer().getMap().broadcastMessage(EtcPacket.showPotentialReset(false, c.getPlayer().getId(), false, itemId));
                    }
                }
                break;
            }
            case 5750000: { //에일리언 큐브
                if (c.getPlayer().getLevel() < 10) {
                    c.getPlayer().dropMessage(1, "You may not use this until level 10.");
                } else {
                    final Item item = c.getPlayer().getInventory(MapleInventoryType.SETUP).getItem((byte) slea.readInt());
                    if (item != null && c.getPlayer().getInventory(MapleInventoryType.USE).getNumFreeSlot() >= 1 && c.getPlayer().getInventory(MapleInventoryType.SETUP).getNumFreeSlot() >= 1) {
                        final int grade = GameConstants.getNebuliteGrade(item.getItemId());
                        if (grade != -1 && grade < 5) {
                            final int rank = Randomizer.nextInt(100) < 7 ? (Randomizer.nextInt(100) < 2 ? (grade + 1) : (grade != 3 ? (grade + 1) : grade)) : grade;
                            final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                            final List<StructItemOption> pots = new LinkedList<StructItemOption>(ii.getAllSocketInfo(rank).values());
                            int newId = 0;
                            while (newId == 0) {
                                StructItemOption pot = pots.get(Randomizer.nextInt(pots.size()));
                                if (pot != null) {
                                    newId = pot.opID;
                                }
                            }
                            final int newgrade = GameConstants.getNebuliteGrade(item.getItemId());
                            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.SETUP, item.getPosition(), (short) 1, false);
                            MapleInventoryManipulator.addById(c, newId, (short) 1, "Upgraded from alien cube on " + FileoutputUtil.CurrentReadable_Date());
                            MapleInventoryManipulator.addById(c, 2430691, (short) 1, "Alien Cube" + " on " + FileoutputUtil.CurrentReadable_Date());
                            used = true;
                        } else {
                            c.getPlayer().dropMessage(1, "Grade S Nebulite cannot be added.");
                        }
                    } else {
                        c.getPlayer().dropMessage(5, "You do not have sufficient inventory slot.");
                    }
                }
                break;
            }
            case 5750001: { // 소켓
                if (c.getPlayer().getLevel() < 10) {
                    c.getPlayer().dropMessage(1, "You may not use this until level 10.");
                } else {
                    final Item item = c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem((byte) slea.readInt());
                    if (item != null) {
                        final Equip eq = (Equip) item;
                        if (eq.getSocket1() > 0) { // first slot only.
                            eq.setSocket1(0);
                            c.getSession().write(InventoryPacket.scrolledItem(toUse, item, false, true));
                            c.getPlayer().forceReAddItem_NoUpdate(item, MapleInventoryType.EQUIP);
                            used = true;
                        } else {
                            c.getPlayer().dropMessage(5, "This item do not have a socket.");
                        }
                    } else {
                        c.getPlayer().dropMessage(5, "This item's nebulite cannot be removed.");
                    }
                }
                break;
            }
            case 5521000: { // Karma
                final MapleInventoryType type = MapleInventoryType.getByType((byte) slea.readInt());
                final Item item = c.getPlayer().getInventory(type).getItem((byte) slea.readInt());

                if (item != null && !ItemFlag.KARMA_ACC.check(item.getFlag()) && !ItemFlag.KARMA_ACC_USE.check(item.getFlag())) {
                    if (MapleItemInformationProvider.getInstance().isShareTagEnabled(item.getItemId())) {
                        short flag = item.getFlag();
                        if (ItemFlag.UNTRADEABLE.check(flag)) {
                            flag -= ItemFlag.UNTRADEABLE.getValue();
                        } else if (type == MapleInventoryType.EQUIP) {
                            flag |= ItemFlag.KARMA_ACC.getValue();
                        } else {
                            flag |= ItemFlag.KARMA_ACC_USE.getValue();
                        }
                        item.setFlag(flag);
                        c.getPlayer().forceReAddItem_NoUpdate(item, type);
                        c.getSession().write(InventoryPacket.updateSpecialItemUse(item, type.getType(), item.getPosition(), true, c.getPlayer()));
                        used = true;
                    }
                }
                break;
            }
            case 5520001: //p.karma
            case 5520000: { // Karma
                final MapleInventoryType type = MapleInventoryType.getByType((byte) slea.readInt());
                final Item item = c.getPlayer().getInventory(type).getItem((byte) slea.readInt());

                if (item != null && !ItemFlag.KARMA_EQ.check(item.getFlag()) && !ItemFlag.KARMA_USE.check(item.getFlag())) {
                    if ((itemId == 5520000 && MapleItemInformationProvider.getInstance().isKarmaEnabled(item.getItemId())) || (itemId == 5520001 && MapleItemInformationProvider.getInstance().isPKarmaEnabled(item.getItemId()))) {
                        short flag = item.getFlag();
                        if (ItemFlag.UNTRADEABLE.check(flag)) {
                            flag -= ItemFlag.UNTRADEABLE.getValue();
                        } else if (type == MapleInventoryType.EQUIP) {
                            flag |= ItemFlag.KARMA_EQ.getValue();
                        } else {
                            flag |= ItemFlag.KARMA_USE.getValue();
                        }
                        item.setFlag(flag);
                        c.getPlayer().forceReAddItem_NoUpdate(item, type);
                        c.getSession().write(InventoryPacket.updateSpecialItemUse(item, type.getType(), item.getPosition(), true, c.getPlayer()));
                        used = true;
                    }
                }
                break;
            }
            case 5570000: { // Vicious Hammer
                slea.readInt(); // Inventory type, Hammered eq is always EQ.
                final Equip item = (Equip) c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem((byte) slea.readInt());
                // another int here, D3 49 DC 00
                if (item != null) {
                    if (GameConstants.canHammer(item.getItemId()) && MapleItemInformationProvider.getInstance().getSlots(item.getItemId()) > 0 && item.getViciousHammer() < 2) {
                        item.setViciousHammer((byte) (item.getViciousHammer() + 1));
                        item.setUpgradeSlots((byte) (item.getUpgradeSlots() + 1));
                        c.getPlayer().forceReAddItem(item, MapleInventoryType.EQUIP);
                        c.getSession().write(MTSCSPacket.ViciousHammer(true, (byte) item.getViciousHammer()));
                        used = true;
                    } else {
                        c.getPlayer().dropMessage(5, "You may not use it on this item.");
                        c.getSession().write(MTSCSPacket.ViciousHammer(true, (byte) 0));
                    }
                }

                break;
            }
            case 5610001:
            case 5610000: { // Vega 30
                slea.readInt(); // Inventory type, always eq
                final short dst = (short) slea.readInt();
                slea.readInt(); // Inventory type, always use
                final short src = (short) slea.readInt();
                used = UseUpgradeScroll(src, dst, (short) 2, c, c.getPlayer(), itemId, true, false); //cannot use ws with vega but we dont care
                cc = used;
                break;
            }
            case 5060001: { // Sealing Lock
                final MapleInventoryType type = MapleInventoryType.getByType((byte) slea.readInt());
                final Item item = c.getPlayer().getInventory(type).getItem((byte) slea.readInt());
                // another int here, lock = 5A E5 F2 0A, 7 day = D2 30 F3 0A
                if (item != null && item.getExpiration() == -1) {
                    short flag = item.getFlag();
                    flag |= ItemFlag.LOCK.getValue();
                    item.setFlag(flag);

                    c.getPlayer().forceReAddItem_Flag(item, type);
                    used = true;
                }
                break;
            }
            case 5061000: { // Sealing Lock 7 days
                final MapleInventoryType type = MapleInventoryType.getByType((byte) slea.readInt());
                final Item item = c.getPlayer().getInventory(type).getItem((byte) slea.readInt());
                // another int here, lock = 5A E5 F2 0A, 7 day = D2 30 F3 0A
                if (item != null && item.getExpiration() == -1) {
                    short flag = item.getFlag();
                    flag |= ItemFlag.LOCK.getValue();
                    item.setFlag(flag);
                    item.setExpiration(System.currentTimeMillis() + (7 * 24 * 60 * 60 * 1000));

                    c.getPlayer().forceReAddItem_Flag(item, type);
                    used = true;
                }
                break;
            }
            case 5061001: { // Sealing Lock 30 days
                final MapleInventoryType type = MapleInventoryType.getByType((byte) slea.readInt());
                final Item item = c.getPlayer().getInventory(type).getItem((byte) slea.readInt());
                // another int here, lock = 5A E5 F2 0A, 7 day = D2 30 F3 0A
                if (item != null && item.getExpiration() == -1) {
                    short flag = item.getFlag();
                    flag |= ItemFlag.LOCK.getValue();
                    item.setFlag(flag);

                    item.setExpiration(System.currentTimeMillis() + (long) (30L * 24 * 60 * 60 * 1000));//載入時間超過24天需要添加L

                    c.getPlayer().forceReAddItem_Flag(item, type);
                    used = true;
                }
                break;
            }
            case 5061002: { // Sealing Lock 90 days
                final MapleInventoryType type = MapleInventoryType.getByType((byte) slea.readInt());
                final Item item = c.getPlayer().getInventory(type).getItem((byte) slea.readInt());
                // another int here, lock = 5A E5 F2 0A, 7 day = D2 30 F3 0A
                if (item != null && item.getExpiration() == -1) {
                    short flag = item.getFlag();
                    flag |= ItemFlag.LOCK.getValue();
                    item.setFlag(flag);

                    item.setExpiration(System.currentTimeMillis() + (long) (90L * 24 * 60 * 60 * 1000));//載入時間超過24天需要添加L

                    c.getPlayer().forceReAddItem_Flag(item, type);
                    used = true;
                }
                break;
            }
            case 5061003: { // Sealing Lock 365 days
                final MapleInventoryType type = MapleInventoryType.getByType((byte) slea.readInt());
                final Item item = c.getPlayer().getInventory(type).getItem((byte) slea.readInt());
                // another int here, lock = 5A E5 F2 0A, 7 day = D2 30 F3 0A
                if (item != null && item.getExpiration() == -1) {
                    short flag = item.getFlag();
                    flag |= ItemFlag.LOCK.getValue();
                    item.setFlag(flag);

                    item.setExpiration(System.currentTimeMillis() + (long) (365L * 24 * 60 * 60 * 1000));//載入時間超過24天需要添加L

                    c.getPlayer().forceReAddItem_Flag(item, type);
                    used = true;
                }
                break;
            }
            case 5063000: {
                final MapleInventoryType type = MapleInventoryType.getByType((byte) slea.readInt());
                final Item item = c.getPlayer().getInventory(type).getItem((byte) slea.readInt());
                // another int here, lock = 5A E5 F2 0A, 7 day = D2 30 F3 0A
                if (item != null && item.getType() == 1) { //equip
                    short flag = item.getFlag();
                    flag |= ItemFlag.LUKCYDAY.getValue();
                    item.setFlag(flag);

                    c.getPlayer().forceReAddItem_Flag(item, type);
                    used = true;
                } else {
                    return;
                }
                break;
            }
            case 5064100:
            case 5064300:
            case 5064000: {
                byte a = slea.readByte();
                byte b = slea.readByte();
                if (a > 0) {
                    if (b == 0) {
                        b = 1;
                    }
                }
                final MapleInventoryType type = MapleInventoryType.getByType(b);
                final Item item = c.getPlayer().getInventory(type).getItem(a);
                // another int here, lock = 5A E5 F2 0A, 7 day = D2 30 F3 0A
                if (item != null && item.getType() == 1) { //equip
                    if (((Equip) item).getEnhance() >= 8) {
                        break; //cannot be used
                    }
                    short flag = item.getFlag();
                    if (itemId == 5064000) {
                        flag |= ItemFlag.PROTECT.getValue();
                    } else if (itemId == 5064100) {
                        flag |= ItemFlag.SAFETY.getValue();
                    } else if (itemId == 5064300) {
                        flag |= ItemFlag.RECOVERY.getValue();
                    }
                    item.setFlag(flag);
                    c.getSession().write(InventoryPacket.scrolledItem(toUse, item, false, false));
                    c.getPlayer().getMap().broadcastMessage(EtcPacket.getScrollEffect(c.getPlayer().getId(), Equip.ScrollResult.SUCCESS, MapleInventoryType.EQUIP == MapleInventoryType.getByType(b) ? true : false, false));
                    used = true;
                }
                break;
            }
            case 5060004:
            case 5060003: {//peanut
                Item item = c.getPlayer().getInventory(MapleInventoryType.ETC).findById(itemId == 5060003 ? 4170023 : 4170024);
                if (item == null || item.getQuantity() <= 0) { // hacking{
                    return;
                }
                if (getIncubatedItems(c, itemId)) {
                    MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.ETC, item.getPosition(), (short) 1, false);
                    used = true;
                }
                break;
            }
            case 5152100:
            case 5152101:
            case 5152102:
            case 5152103:
            case 5152104:
            case 5152105:
            case 5152106:
            case 5152107: {
                if (c.getPlayer().getLevel() < 30) {
                    c.getPlayer().dropMessage(1, "You may not use this until level 30.");
                    break;
                }
                int teye = (itemId - 5152100) * 100;
                if (teye >= 0) {
                    c.getPlayer().setFace(c.getPlayer().getGender() == 0 ? teye + 20000 : teye + 21000);
                    c.getPlayer().updateSingleStat(MapleStat.FACE, c.getPlayer().getFace());
                    c.getPlayer().equipChanged();
                    used = true;
                } else {
                    c.getPlayer().dropMessage(1, "An error occurred when using daily contact lenses.");
                }
                break;
            }
            case 5070000: { // Megaphone
                if (c.getPlayer().getLevel() < 10) {
                    c.getPlayer().dropMessage(1, "You may not use this until level 10.");
                    break;
                }
                if (c.getPlayer().getMapId() == GameConstants.JAIL) {
                    c.getPlayer().dropMessage(1, "Cannot be used here.");
                    break;
                }
                if (!c.getPlayer().getCheatTracker().canSmega()) {
                    c.getPlayer().dropMessage(5, "You may only use this every 15 seconds.");
                    break;
                }
                if (!c.getChannelServer().getMegaphoneMuteState()) {
                    final String message = (slea.readMapleAsciiString());

                    if (message.length() > 65) {
                        break;
                    }
                    final StringBuilder sb = new StringBuilder();
                    addMedalString(c.getPlayer(), sb);
                    sb.append(c.getPlayer().getName());
                    sb.append(" : ");
                    sb.append(message);

                    c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.serverNotice(2, sb.toString()));
                    used = true;
                } else {
                    c.getPlayer().dropMessage(5, "The usage of Megaphone is currently disabled.");
                }
                break;
            }
            case 5071000: { // Megaphone
                if (c.getPlayer().getLevel() < 10) {
                    c.getPlayer().dropMessage(1, "You may not use this until level 10.");
                    break;
                }
                if (c.getPlayer().getMapId() == GameConstants.JAIL) {
                    c.getPlayer().dropMessage(1, "Cannot be used here.");
                    break;
                }
                if (!c.getPlayer().getCheatTracker().canSmega()) {
                    c.getPlayer().dropMessage(5, "You may only use this every 15 seconds.");
                    break;
                }
                if (!c.getChannelServer().getMegaphoneMuteState()) {
                    final String message = (slea.readMapleAsciiString());

                    if (message.length() > 65) {
                        break;
                    }
                    final StringBuilder sb = new StringBuilder();
                    addMedalString(c.getPlayer(), sb);
                    sb.append(c.getPlayer().getName());
                    sb.append(" : ");
                    sb.append(message);

                    c.getChannelServer().broadcastSmegaPacket(MaplePacketCreator.serverNotice(2, sb.toString()));
                    used = true;
                } else {
                    c.getPlayer().dropMessage(5, "The usage of Megaphone is currently disabled.");
                }
                break;
            }
            case 5077000: { // 3 line Megaphone
                if (c.getPlayer().getLevel() < 10) {
                    c.getPlayer().dropMessage(1, "You may not use this until level 10.");
                    break;
                }
                if (c.getPlayer().getMapId() == GameConstants.JAIL) {
                    c.getPlayer().dropMessage(1, "Cannot be used here.");
                    break;
                }
                if (!c.getPlayer().getCheatTracker().canSmega()) {
                    c.getPlayer().dropMessage(5, "You may only use this every 15 seconds.");
                    break;
                }
                if (!c.getChannelServer().getMegaphoneMuteState()) {
                    final byte numLines = slea.readByte();
                    if (numLines > 3) {
                        return;
                    }
                    final List<String> messages = new LinkedList<String>();
                    String message;
                    for (int i = 0; i < numLines; i++) {
                        message = (slea.readMapleAsciiString());
                        if (message.length() > 65) {
                            break;
                        }
                        messages.add(c.getPlayer().getName() + " : " + message);
                    }
                    final boolean ear = slea.readByte() > 0;

                    World.Broadcast.broadcastSmega(MaplePacketCreator.tripleSmega(messages, ear, c.getChannel()));
                    used = true;
                } else {
                    c.getPlayer().dropMessage(5, "The usage of Megaphone is currently disabled.");
                }
                break;
            }
            case 5079004: { // Heart Megaphone
                if (c.getPlayer().getLevel() < 10) {
                    c.getPlayer().dropMessage(1, "You may not use this until level 10.");
                    break;
                }
                if (c.getPlayer().getMapId() == GameConstants.JAIL) {
                    c.getPlayer().dropMessage(1, "Cannot be used here.");
                    break;
                }
                if (!c.getPlayer().getCheatTracker().canSmega()) {
                    c.getPlayer().dropMessage(5, "You may only use this every 15 seconds.");
                    break;
                }
                if (!c.getChannelServer().getMegaphoneMuteState()) {
                    final String message = (slea.readMapleAsciiString());

                    if (message.length() > 65) {
                        break;
                    }
                    World.Broadcast.broadcastSmega(MaplePacketCreator.echoMegaphone(c.getPlayer().getName(), message));
                    used = true;
                } else {
                    c.getPlayer().dropMessage(5, "The usage of Megaphone is currently disabled.");
                }
                break;
            }
            case 5073000: { // Heart Megaphone
                if (c.getPlayer().getLevel() < 10) {
                    c.getPlayer().dropMessage(1, "You may not use this until level 10.");
                    break;
                }
                if (c.getPlayer().getMapId() == GameConstants.JAIL) {
                    c.getPlayer().dropMessage(1, "Cannot be used here.");
                    break;
                }
                if (!c.getPlayer().getCheatTracker().canSmega()) {
                    c.getPlayer().dropMessage(5, "You may only use this every 15 seconds.");
                    break;
                }
                if (!c.getChannelServer().getMegaphoneMuteState()) {
                    final String message = (slea.readMapleAsciiString());

                    if (message.length() > 65) {
                        break;
                    }
                    final StringBuilder sb = new StringBuilder();
                    addMedalString(c.getPlayer(), sb);
                    sb.append(c.getPlayer().getName());
                    sb.append(" : ");
                    sb.append(message);

                    final boolean ear = slea.readByte() != 0;
                    World.Broadcast.broadcastSmega(MaplePacketCreator.serverNotice(9, c.getChannel(), sb.toString(), ear));
                    used = true;
                } else {
                    c.getPlayer().dropMessage(5, "The usage of Megaphone is currently disabled.");
                }
                break;
            }
            case 5074000: { // Skull Megaphone
                if (c.getPlayer().getLevel() < 10) {
                    c.getPlayer().dropMessage(1, "You may not use this until level 10.");
                    break;
                }
                if (c.getPlayer().getMapId() == GameConstants.JAIL) {
                    c.getPlayer().dropMessage(1, "Cannot be used here.");
                    break;
                }
                if (!c.getPlayer().getCheatTracker().canSmega()) {
                    c.getPlayer().dropMessage(5, "You may only use this every 15 seconds.");
                    break;
                }
                if (!c.getChannelServer().getMegaphoneMuteState()) {
                    final String message = (slea.readMapleAsciiString());

                    if (message.length() > 65) {
                        break;
                    }
                    final StringBuilder sb = new StringBuilder();
                    addMedalString(c.getPlayer(), sb);
                    sb.append(c.getPlayer().getName());
                    sb.append(" : ");
                    sb.append(message);

                    final boolean ear = slea.readByte() != 0;

                    World.Broadcast.broadcastSmega(MaplePacketCreator.serverNotice(22, c.getChannel(), sb.toString(), ear));
                    used = true;
                } else {
                    c.getPlayer().dropMessage(5, "The usage of Megaphone is currently disabled.");
                }
                break;
            }
            case 5072000: { // Super Megaphone
                if (c.getPlayer().getLevel() < 10) {
                    c.getPlayer().dropMessage(1, "You may not use this until level 10.");
                    break;
                }
                if (c.getPlayer().getMapId() == GameConstants.JAIL) {
                    c.getPlayer().dropMessage(1, "Cannot be used here.");
                    break;
                }
                if (!c.getPlayer().getCheatTracker().canSmega()) {
                    c.getPlayer().dropMessage(5, "You may only use this every 15 seconds.");
                    break;
                }
                if (!c.getChannelServer().getMegaphoneMuteState()) {
                    final String message = (slea.readMapleAsciiString());

                    if (message.length() > 65) {
                        break;
                    }
                    final StringBuilder sb = new StringBuilder();
                    addMedalString(c.getPlayer(), sb);
                    sb.append(c.getPlayer().getName());
                    sb.append(" : ");
                    sb.append(message);

                    final boolean ear = slea.readByte() != 0;

                    World.Broadcast.broadcastSmega(MaplePacketCreator.serverNotice(3, c.getChannel(), sb.toString(), ear));
                    used = true;
                } else {
                    c.getPlayer().dropMessage(5, "The usage of Megaphone is currently disabled.");
                }
                break;
            }
            case 5076000: { // Item Megaphone
                if (c.getPlayer().getLevel() < 10) {
                    c.getPlayer().dropMessage(1, "You may not use this until level 10.");
                    break;
                }
                if (c.getPlayer().getMapId() == GameConstants.JAIL) {
                    c.getPlayer().dropMessage(1, "Cannot be used here.");
                    break;
                }
                if (!c.getPlayer().getCheatTracker().canSmega()) {
                    c.getPlayer().dropMessage(5, "You may only use this every 15 seconds.");
                    break;
                }
                if (!c.getChannelServer().getMegaphoneMuteState()) {
                    final String message = slea.readMapleAsciiString();

                    if (message.length() > 65) {
                        break;
                    }
                    final StringBuilder sb = new StringBuilder();
                    addMedalString(c.getPlayer(), sb);
                    sb.append(c.getPlayer().getName());
                    sb.append(" : ");
                    sb.append(message);

                    final boolean ear = slea.readByte() > 0;

                    Item item = null;
                    if (slea.readByte() == 1) { //item
                        byte invType = (byte) slea.readInt();
                        byte pos = (byte) slea.readInt();
                        if (pos <= 0) {
                            invType = -1;
                        }
                        item = c.getPlayer().getInventory(MapleInventoryType.getByType(invType)).getItem(pos);
                    }
                    World.Broadcast.broadcastSmega(MaplePacketCreator.itemMegaphone(sb.toString(), ear, c.getChannel(), item));
                    used = true;
                } else {
                    c.getPlayer().dropMessage(5, "The usage of Megaphone is currently disabled.");
                }
                break;
            }
            case 5075000: // MapleTV Messenger
            case 5075001: // MapleTV Star Messenger
            case 5075002: // MapleTV Heart Messenger
            case 5075003:
            case 5075004:
            case 5075005: {
                final int tvType = itemId % 10;
                boolean megassenger = false;
                boolean ear = false;
                MapleCharacter victim = null;
                if (tvType != 1) {
                    if (tvType >= 3) {
                        megassenger = true;
                        if (tvType == 3) {
                            slea.readByte();
                        }
                        ear = (1 == slea.readByte());
                    } else if (tvType != 2) {
                        slea.readByte();
                    }
                    if (tvType != 4) {
                        victim = c.getChannelServer().getPlayerStorage().getCharacterByName(slea.readMapleAsciiString());
                    }
                }
                final List<String> tvMessages = (List<String>) new LinkedList();
                final StringBuilder builder = new StringBuilder();
                for (int i = 0; i < 5; i++) {
                    final String message = slea.readMapleAsciiString();
                    if (megassenger) {
                        builder.append(" ").append(message);
                    }
                    tvMessages.add(message);
                }
                if (megassenger) {
                    World.Broadcast.broadcastSmega(MaplePacketCreator.serverNotice(3, c.getChannel(), new StringBuilder().append(c.getPlayer().getName()).append(" : ").append(builder.toString()).toString(), ear));
                }
                if (!MapleTVEffect.isActive()) {
                    final MapleTVEffect mapleTVEffect = new MapleTVEffect(c.getPlayer(), victim, tvMessages, tvType);
                    mapleTVEffect.stratMapleTV();
                    used = true;
                    break;
                }
                c.getPlayer().dropMessage(1, "Maple TV is in full use.");
                return;
            }
            case 5090100: // Wedding Invitation Card
            case 5090000: { // Note
                final String sendTo = slea.readMapleAsciiString();
                final String msg = slea.readMapleAsciiString();
                if (MapleCharacterUtil.canCreateChar(sendTo, false)) { // Name does not exist 
                    c.getSession().write(MTSCSPacket.OnMemoResult((byte) 5, (byte) 1));
                } else {
                    int ch = World.Find.findChannel(sendTo);
                    if (ch <= 0) { // offline 
                        c.getPlayer().sendNote(sendTo, msg);
                        c.getSession().write(MTSCSPacket.OnMemoResult((byte) 4, (byte) 0));
                        used = true;
                    } else {
                        c.getSession().write(MTSCSPacket.OnMemoResult((byte) 5, (byte) 0));
                    }
                }
                break;
            }
            case 5100000: { // Congratulatory Song
                c.getPlayer().getMap().broadcastMessage(EtcPacket.musicChange("Jukebox/Congratulation"));
                used = true;
                break;
            }
            case 5190001:
            case 5190002:
            case 5190003:
            case 5190004:
            case 5190005:
            case 5190006:
            case 5190007:
            case 5190008:
            case 5190000: { // Pet Flags
                final int uniqueid = (int) slea.readLong();
                MaplePet pet = c.getPlayer().getPet(0);
                int slo = 0;

                if (pet == null) {
                    break;
                }
                if (pet.getUniqueId() != uniqueid) {
                    pet = c.getPlayer().getPet(1);
                    slo = 1;
                    if (pet != null) {
                        if (pet.getUniqueId() != uniqueid) {
                            pet = c.getPlayer().getPet(2);
                            slo = 2;
                            if (pet != null) {
                                if (pet.getUniqueId() != uniqueid) {
                                    break;
                                }
                            } else {
                                break;
                            }
                        }
                    } else {
                        break;
                    }
                }
                PetFlag zz = PetFlag.getByAddId(itemId);
                if (zz != null && !zz.check(pet.getFlags())) {
                    pet.setFlags(pet.getFlags() | zz.getValue());
                    c.getSession().write(PetPacket.updatePet(pet, c.getPlayer().getInventory(MapleInventoryType.CASH).getItem((byte) pet.getInventoryPosition()), true));
                    c.getSession().write(MaplePacketCreator.enableActions());
                    c.getSession().write(MTSCSPacket.changePetFlag(uniqueid, true, zz.getValue()));
                    used = true;
                }
                break;
            }
            case 5191001:
            case 5191002:
            case 5191003:
            case 5191004:
            case 5191000: { // Pet Flags
                final int uniqueid = (int) slea.readLong();
                MaplePet pet = c.getPlayer().getPet(0);
                int slo = 0;

                if (pet == null) {
                    break;
                }
                if (pet.getUniqueId() != uniqueid) {
                    pet = c.getPlayer().getPet(1);
                    slo = 1;
                    if (pet != null) {
                        if (pet.getUniqueId() != uniqueid) {
                            pet = c.getPlayer().getPet(2);
                            slo = 2;
                            if (pet != null) {
                                if (pet.getUniqueId() != uniqueid) {
                                    break;
                                }
                            } else {
                                break;
                            }
                        }
                    } else {
                        break;
                    }
                }
                PetFlag zz = PetFlag.getByDelId(itemId);
                if (zz != null && zz.check(pet.getFlags())) {
                    pet.setFlags(pet.getFlags() - zz.getValue());
                    c.getSession().write(PetPacket.updatePet(pet, c.getPlayer().getInventory(MapleInventoryType.CASH).getItem((byte) pet.getInventoryPosition()), true));
                    c.getSession().write(MaplePacketCreator.enableActions());
                    c.getSession().write(MTSCSPacket.changePetFlag(uniqueid, false, zz.getValue()));
                    used = true;
                }
                break;
            }
            case 5501001:
            case 5501002: { //expiry mount
                final Skill skil = SkillFactory.getSkill(slea.readInt());
                if (skil == null || skil.getId() / 10000 != 8000 || c.getPlayer().getSkillLevel(skil) <= 0 || !skil.isTimeLimited() || GameConstants.getMountItem(skil.getId(), c.getPlayer()) <= 0) {
                    break;
                }
                final long toAdd = (itemId == 5501001 ? 30 : 60) * 24 * 60 * 60 * 1000L;
                final long expire = c.getPlayer().getSkillExpiry(skil);
                if (expire < System.currentTimeMillis() || (long) (expire + toAdd) >= System.currentTimeMillis() + (365 * 24 * 60 * 60 * 1000L)) {
                    break;
                }
                c.getPlayer().changeSingleSkillLevel(skil, c.getPlayer().getSkillLevel(skil), c.getPlayer().getMasterLevel(skil), (long) (expire + toAdd));
                used = true;
                break;
            }
            case 5170000: { // Pet name change                
                MaplePet pet = c.getPlayer().getPet(0);

                if (pet == null) {
                    break;
                }
                String nName = slea.readMapleAsciiString();
                for (String z : GameConstants.RESERVED) {
                    if (pet.getName().indexOf(z) != -1 || nName.indexOf(z) != -1) {
                        break;
                    }
                }
                if (MapleCharacterUtil.canChangePetName(nName)) {
                    pet.setName(nName);
                    c.getSession().write(PetPacket.updatePet(pet, c.getPlayer().getInventory(MapleInventoryType.CASH).getItem((byte) pet.getInventoryPosition()), true));
                    c.getSession().write(MaplePacketCreator.enableActions());
                    c.getPlayer().getMap().broadcastMessage(MTSCSPacket.changePetName(c.getPlayer(), nName, 0));
                    used = true;
                }
                break;
            }
            case 5700000: {
                slea.skip(8);
                if (c.getPlayer().getAndroid() == null) {
                    break;
                }
                String nName = slea.readMapleAsciiString();
                for (String z : GameConstants.RESERVED) {
                    if (c.getPlayer().getAndroid().getName().indexOf(z) != -1 || nName.indexOf(z) != -1) {
                        break;
                    }
                }
                if (MapleCharacterUtil.canChangePetName(nName)) {
                    c.getPlayer().getAndroid().setName(nName);
                    c.getPlayer().setAndroid(c.getPlayer().getAndroid()); //respawn it    
                    c.getPlayer().getAndroid().saveToDb();
                    used = true;
                }
                break;
            }
            case 5240000:
            case 5240001:
            case 5240002:
            case 5240003:
            case 5240004:
            case 5240005:
            case 5240006:
            case 5240007:
            case 5240008:
            case 5240009:
            case 5240010:
            case 5240011:
            case 5240012:
            case 5240013:
            case 5240014:
            case 5240015:
            case 5240016:
            case 5240017:
            case 5240018:
            case 5240019:
            case 5240020:
            case 5240021:
            case 5240022:
            case 5240023:
            case 5240024:
            case 5240025:
            case 5240026:
            case 5240027:
            case 5240029:
            case 5240030:
            case 5240031:
            case 5240032:
            case 5240033:
            case 5240034:
            case 5240035:
            case 5240036:
            case 5240037:
            case 5240038:
            case 5240039:
            case 5240040:
            case 5240041:
            case 5240042:
            case 5240043:
            case 5240044:
            case 5240045:
            case 5240047:
            case 5240048:
            case 5240050:
            case 5240051:
            case 5240052:
            case 5240054:
            case 5240055:
            case 5240056:
            case 5240028: { // Pet food
                MaplePet pet = c.getPlayer().getPet(0);

                if (pet == null) {
                    break;
                }
                if (!pet.canConsume(itemId)) {
                    pet = c.getPlayer().getPet(1);
                    if (pet != null) {
                        if (!pet.canConsume(itemId)) {
                            pet = c.getPlayer().getPet(2);
                            if (pet != null) {
                                if (!pet.canConsume(itemId)) {
                                    break;
                                }
                            } else {
                                break;
                            }
                        }
                    } else {
                        break;
                    }
                }
                final byte petindex = c.getPlayer().getPetIndex(pet);
                pet.setFullness(100);
                if (pet.getCloseness() < 30000) {
                    if (pet.getCloseness() + (100 * c.getChannelServer().getTraitRate()) > 30000) {
                        pet.setCloseness(30000);
                    } else {
                        pet.setCloseness(pet.getCloseness() + (100 * c.getChannelServer().getTraitRate()));
                    }
                    if (pet.getCloseness() >= GameConstants.getClosenessNeededForLevel(pet.getLevel() + 1)) {
                        pet.setLevel(pet.getLevel() + 1);
                        c.getSession().write(EffectPacket.showOwnPetLevelUp(c.getPlayer().getPetIndex(pet)));
                        c.getPlayer().getMap().broadcastMessage(PetPacket.showPetLevelUp(c.getPlayer(), petindex));
                    }
                }
                c.getSession().write(PetPacket.updatePet(pet, c.getPlayer().getInventory(MapleInventoryType.CASH).getItem(pet.getInventoryPosition()), true));
                c.getPlayer().getMap().broadcastMessage(c.getPlayer(), PetPacket.commandResponse(c.getPlayer().getId(), (byte) 1, petindex, true, true), true);
                used = true;
                break;
            }
            case 5230001:
            case 5230000: {// Owl of minerva
                final int itemSearch = slea.readInt();
                final List<HiredMerchant> hms = c.getChannelServer().searchMerchant(itemSearch);
                if (hms.size() > 0) {
                    c.getSession().write(MaplePacketCreator.getOwlSearched(itemSearch, hms));
                    used = true;
                } else {
                    c.getPlayer().dropMessage(1, "Unable to find the item.");
                }
                break;
            }
            case 5281001: //idk, but probably
            case 5280001: // Gas Skill
            case 5281000: { // Passed gas
                Rectangle bounds = new Rectangle((int) c.getPlayer().getPosition().getX(), (int) c.getPlayer().getPosition().getY(), 1, 1);
                MapleMist mist = new MapleMist(bounds, c.getPlayer());
                c.getPlayer().getMap().spawnMist(mist, 10000, true);
                c.getSession().write(MaplePacketCreator.enableActions());
                used = true;
                break;
            }
            case 5370002:
            case 5370001:
            case 5370000: { // Chalkboard
                for (MapleEventType t : MapleEventType.values()) {
                    final MapleEvent e = ChannelServer.getInstance(c.getChannel()).getEvent(t);
                    if (e.isRunning()) {
                        for (int i : e.getType().mapids) {
                            if (c.getPlayer().getMapId() == i) {
                                c.getPlayer().dropMessage(5, "You may not use that here.");
                                c.getSession().write(MaplePacketCreator.enableActions());
                                return;
                            }
                        }
                    }
                }
                c.getPlayer().setChalkboard(slea.readMapleAsciiString());
                break;
            }
            case 5079000:
            case 5079001:
            case 5390007:
            case 5390008:
            case 5390009:
            case 5390000: // Diablo Messenger
            case 5390001: // Cloud 9 Messenger
            case 5390002: // Loveholic Messenger
            case 5390003: // New Year Megassenger 1
            case 5390004: // New Year Megassenger 2
            case 5390005: // Cute Tiger Messenger
            case 5390006: { // Tiger Roar's Messenger
                if (c.getPlayer().getLevel() < 10) {
                    c.getPlayer().dropMessage(5, "Must be level 10 or higher.");
                    break;
                }
                if (c.getPlayer().getMapId() == GameConstants.JAIL) {
                    c.getPlayer().dropMessage(5, "Cannot be used here.");
                    break;
                }
                if (!c.getPlayer().getCheatTracker().canAvatarSmega()) {
                    c.getPlayer().dropMessage(5, "You may only use this every 5 minutes.");
                    break;
                }
                if (!c.getChannelServer().getMegaphoneMuteState()) {
                    final List<String> lines = new LinkedList<String>();
                    for (int i = 0; i < 4; i++) {
                        final String text = slea.readMapleAsciiString();
                        if (text.length() > 55) {
                            continue;
                        }
                        lines.add(text);
                    }
                    final boolean ear = slea.readByte() != 0;
                    World.Broadcast.broadcastSmega(MaplePacketCreator.getAvatarMega(c.getPlayer(), c.getChannel(), itemId, lines, ear));
                    used = true;
                } else {
                    c.getPlayer().dropMessage(5, "The usage of Megaphone is currently disabled.");
                }
                break;
            }
            case 5450000:
            case 5450004: //30 Day
            case 5450003: //Rookie
            case 5450006: // 1 Day
            case 5450007: { // Mu Mu the Travelling Merchant
                for (int i : GameConstants.blockedMaps) {
                    if (c.getPlayer().getMapId() == i) {
                        c.getPlayer().dropMessage(5, "You may not use this command here.");
                        c.getSession().write(MaplePacketCreator.enableActions());
                        return;
                    }
                }
                if (c.getPlayer().getLevel() < 10) {
                    c.getPlayer().dropMessage(5, "You must be over level 10 to use this command.");
                } else if (c.getPlayer().hasBlockedInventory() || c.getPlayer().getMap().getSquadByMap() != null || c.getPlayer().getEventInstance() != null || c.getPlayer().getMap().getEMByMap() != null || c.getPlayer().getMapId() >= 990000000) {
                    c.getPlayer().dropMessage(5, "You may not use this command here.");
                } else if ((c.getPlayer().getMapId() >= 680000210 && c.getPlayer().getMapId() <= 680000502) || (c.getPlayer().getMapId() / 1000 == 980000 && c.getPlayer().getMapId() != 980000000) || (c.getPlayer().getMapId() / 100 == 1030008) || (c.getPlayer().getMapId() / 100 == 922010) || (c.getPlayer().getMapId() / 10 == 13003000)) {
                    c.getPlayer().dropMessage(5, "You may not use this command here.");
                } else {
                    MapleShopFactory.getInstance().getShop(9090000).sendShop(c);
                }
                //used = true; // Comment this out or remove it to prevent the item from being consumed.
                break;
            }

            case 5300000:
            case 5300001:
            case 5300002: { // Cash morphs
                final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                ii.getItemEffect(itemId).applyTo(c.getPlayer());
                used = true;
                break;
            }
            case 5064200: { // 完美回真卡
                slea.readInt();
                final byte dst = (byte) slea.readShort();
                Item item = c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(dst);
                slea.readByte();
                short src = (short) c.getPlayer().getInventory(MapleInventoryType.CASH).findPostionById(5064200);
                if (item != null && item.getType() == 1) {
                    used = UseUpgradeScroll(src, dst, (byte) 0, c, c.getPlayer(), false, true);
                }
                used = true;
                break;
            }
            case 5530132: { // Legends Awards Coins
                if (c.getPlayer().getInventory(MapleInventoryType.ETC).getNumFreeSlot() < 1) {
                    c.getPlayer().dropMessage(5, "Please make space in your ETC inventory.");
                    break;
                }
                c.getPlayer().gainItem(4310027, (short) 30);
                used = true;
                break;
            }
            case 5530133: { // Legends Awards Coins
                if (c.getPlayer().getInventory(MapleInventoryType.ETC).getNumFreeSlot() < 1) {
                    c.getPlayer().dropMessage(5, "Please make space in your ETC inventory.");
                    break;
                }
                c.getPlayer().gainItem(4310027, (short) 3);
                used = true;
                break;
            }
            case 5530138: { // Legends Awards Coins
                if (c.getPlayer().getInventory(MapleInventoryType.ETC).getNumFreeSlot() < 1) {
                    c.getPlayer().dropMessage(5, "Please make space in your ETC inventory.");
                    break;
                }
                c.getPlayer().gainItem(4310027, (short) 5);
                used = true;
                break;
            }
            case 5530139: { // Legends Awards Coins
                if (c.getPlayer().getInventory(MapleInventoryType.ETC).getNumFreeSlot() < 1) {
                    c.getPlayer().dropMessage(5, "Please make space in your ETC inventory.");
                    break;
                }
                c.getPlayer().gainItem(4310027, (short) 10);
                used = true;
                break;
            }
            default:
                if (itemId / 10000 == 512) {
                    final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                    String msg = ii.getMsg(itemId);
                    final String ourMsg = slea.readMapleAsciiString();
                    if (!msg.contains("%s")) {
                        msg = ourMsg;
                    } else {
                        msg = msg.replaceFirst("%s", c.getPlayer().getName());
                        if (!msg.contains("%s")) {
                            msg = ii.getMsg(itemId).replaceFirst("%s", ourMsg);
                        } else {
                            try {
                                msg = msg.replaceFirst("%s", ourMsg);
                            } catch (Exception e) {
                                msg = ii.getMsg(itemId).replaceFirst("%s", ourMsg);
                            }
                        }
                    }
                    c.getPlayer().getMap().startMapEffect(msg, itemId);

                    final int buff = ii.getStateChangeItem(itemId);
                    if (buff != 0) {
                        for (MapleCharacter mChar : c.getPlayer().getMap().getCharactersThreadsafe()) {
                            ii.getItemEffect(buff).applyTo(mChar);
                        }
                    }
                    used = true;
                } else if (itemId / 10000 == 510) {
                    c.getPlayer().getMap().startJukebox(c.getPlayer().getName(), itemId);
                    used = true;
                } else if (itemId / 10000 == 520) {
                    final int mesars = MapleItemInformationProvider.getInstance().getMeso(itemId);
                    if (mesars > 0 && c.getPlayer().getMeso() < (Integer.MAX_VALUE - mesars)) {
                        used = true;
                        if (Math.random() > 0.1) {
                            final int gainmes = Randomizer.nextInt(mesars);
                            c.getPlayer().gainMeso(gainmes, false);
                            c.getSession().write(MTSCSPacket.sendMesobagSuccess(gainmes));
                        } else {
                            c.getSession().write(MTSCSPacket.sendMesobagFailed(false)); // not random
                        }
                    }
                } else if (itemId / 10000 == 562) {
                    if (UseSkillBook(slot, itemId, c, c.getPlayer())) {
                        c.getPlayer().gainSP(1);
                    } //this should handle removing
                } else if (itemId / 10000 == 553) {
                    UseRewardItem(slot, itemId, c, c.getPlayer());// this too
                } else if (itemId / 10000 != 519) {
                    System.out.println("Unhandled CS item : " + itemId);
                    System.out.println(slea.toString(true));
                }
                break;
        }

        if (used) {
            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.CASH, slot, (short) 1, false, true);
        }
        c.getSession().write(MaplePacketCreator.enableActions());
        if (cc) {
            if (!c.getPlayer().isAlive() || c.getPlayer().getEventInstance() != null || FieldLimitType.ChannelSwitch.check(c.getPlayer().getMap().getFieldLimit())) {
                c.getPlayer().dropMessage(1, "Auto relog failed.");
                return;
            }
            c.getPlayer().dropMessage(5, "Auto relogging. Please wait.");
            c.getPlayer().fakeRelog();
            if (c.getPlayer().getScrolledPosition() != 0) {
                c.getSession().write(MaplePacketCreator.pamSongUI());
            }
        }
    }

    public static final void Pickup_Player(final LittleEndianAccessor slea, MapleClient c, final MapleCharacter chr) {
        if (c.getPlayer().hasBlockedInventory()) { //hack
            return;
        }
        chr.updateTick(slea.readInt());
        c.getPlayer().setScrolledPosition((short) 0);
        slea.skip(1); // or is this before tick?
        final Point Client_Reportedpos = slea.readPos();
        if (chr == null || chr.getMap() == null) {
            return;
        }
        final MapleMapObject ob = chr.getMap().getMapObject(slea.readInt(), MapleMapObjectType.ITEM);

        if (ob == null) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        final MapleMapItem mapitem = (MapleMapItem) ob;
        final Lock lock = mapitem.getLock();
        lock.lock();
        try {
            if (mapitem.isPickedUp()) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            if (mapitem.getQuest() > 0 && chr.getQuestStatus(mapitem.getQuest()) != 1) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            if (mapitem.getOwner() != chr.getId() && ((!mapitem.isPlayerDrop() && mapitem.getDropType() == 0) || (mapitem.isPlayerDrop() && chr.getMap().getEverlast()))) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            if (!mapitem.isPlayerDrop() && mapitem.getDropType() == 1 && mapitem.getOwner() != chr.getId() && (chr.getParty() == null || chr.getParty().getMemberById(mapitem.getOwner()) == null)) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            final double Distance = Client_Reportedpos.distanceSq(mapitem.getPosition());
            if (Distance > 5000 && (mapitem.getMeso() > 0 || mapitem.getItemId() != 4001025)) {
                chr.getCheatTracker().registerOffense(CheatingOffense.ITEMVAC_CLIENT, String.valueOf(Distance));
            } else if (chr.getPosition().distanceSq(mapitem.getPosition()) > 640000.0) {
                chr.getCheatTracker().registerOffense(CheatingOffense.ITEMVAC_SERVER);
            }
            if (mapitem.getMeso() > 0) {
                if (chr.getParty() != null && mapitem.getOwner() != chr.getId()) {
                    final List<MapleCharacter> toGive = new LinkedList<MapleCharacter>();
                    final int splitMeso = mapitem.getMeso() * 40 / 100;
                    for (MaplePartyCharacter z : chr.getParty().getMembers()) {
                        MapleCharacter m = chr.getMap().getCharacterById(z.getId());
                        if (m != null && m.getId() != chr.getId()) {
                            toGive.add(m);
                        }
                    }
                    for (final MapleCharacter m : toGive) {
                        int mesos = splitMeso / toGive.size() + (m.getStat().hasPartyBonus ? (int) (mapitem.getMeso() / 20.0) : 0);
                        if (mapitem.getDropper() instanceof MapleMonster && m.getStat().incMesoProp > 0) {
                            mesos += Math.floor((m.getStat().incMesoProp * mesos) / 100.0f);
                        }
                        m.gainMeso(mesos, true);
                        c.getSession().write(MaplePacketCreator.enableActions());    
                    }
                    int mesos = mapitem.getMeso() - splitMeso;
                    if (mapitem.getDropper() instanceof MapleMonster && chr.getStat().incMesoProp > 0) {
                        mesos += Math.floor((chr.getStat().incMesoProp * mesos) / 100.0f);
                    }
                    chr.gainMeso(mesos, true);
                    c.getSession().write(MaplePacketCreator.enableActions());    
                } else {
                    int mesos = mapitem.getMeso();
                    if (mapitem.getDropper() instanceof MapleMonster && chr.getStat().incMesoProp > 0) {
                        mesos += Math.floor((chr.getStat().incMesoProp * mesos) / 100.0f);
                    }
                    chr.gainMeso(mesos, true);
                    c.getSession().write(MaplePacketCreator.enableActions());    
                }
                removeItem(chr, mapitem, ob);
            } else {
                if (MapleItemInformationProvider.getInstance().isPickupBlocked(mapitem.getItemId())) {
                    c.getSession().write(MaplePacketCreator.enableActions());
                    c.getPlayer().dropMessage(5, "This item cannot be picked up.");
                } else if (c.getPlayer().inPVP() && Integer.parseInt(c.getPlayer().getEventInstance().getProperty("ice")) == c.getPlayer().getId()) {
                    c.getSession().write(InventoryPacket.getInventoryFull());
                    c.getSession().write(InventoryPacket.getShowInventoryFull());
                    c.getSession().write(MaplePacketCreator.enableActions());
                } else if (useItem(c, mapitem.getItemId())) {
                    removeItem(c.getPlayer(), mapitem, ob);
                    //another hack
                    if (mapitem.getItemId() / 10000 == 291) {
                        c.getPlayer().getMap().broadcastMessage(EtcPacket.getCapturePosition(c.getPlayer().getMap()));
                        c.getPlayer().getMap().broadcastMessage(EtcPacket.resetCapture());
                    }
                } else if (mapitem.getItemId() == 4031865 || mapitem.getItemId() == 4031866) {
                    // Allow pickup even if inventory is full for item 4031865 and 4031866
                    chr.modifyCSPoints(1, mapitem.getItemId() == 4031865 ? 100 : 250, true);
                    removeItem(chr, mapitem, ob); // Remove item after pickup
                    return; // Exit after handling this specific item case
                } else if (mapitem.getItemId() / 10000 != 291 && MapleInventoryManipulator.checkSpace(c, mapitem.getItemId(), mapitem.getItem().getQuantity(), mapitem.getItem().getOwner())) {
                    if (mapitem.getItem().getQuantity() >= 50 && mapitem.getItemId() == 2340000) {
                        c.setMonitored(true); //hack check
                    }
                    MapleInventoryManipulator.addFromDrop(c, mapitem.getItem(), true, mapitem.getDropper() instanceof MapleMonster);
                    removeItem(chr, mapitem, ob);
                } else {
                    c.getSession().write(InventoryPacket.getInventoryFull());
                    c.getSession().write(InventoryPacket.getShowInventoryFull());
                    c.getSession().write(MaplePacketCreator.enableActions());
                }
            }
        } finally {
            lock.unlock();
        }
    }

    public static final void Pickup_Pet(final LittleEndianAccessor slea, final MapleClient c, final MapleCharacter chr) {
        if (chr == null) {
            return;
        }
        if (c.getPlayer().hasBlockedInventory() || c.getPlayer().inPVP()) { //hack
            return;
        }
        c.getPlayer().setScrolledPosition((short) 0);
        final byte petz = (byte) (GameConstants.GMS ? (c.getPlayer().getPetIndex((int) slea.readLong())) : slea.readInt());
        final MaplePet pet = chr.getPet(petz);
        slea.skip(1); // [4] Zero, [4] Seems to be tickcount, [1] Always zero
        chr.updateTick(slea.readInt());
        final Point Client_Reportedpos = slea.readPos();
        final MapleMapObject ob = chr.getMap().getMapObject(slea.readInt(), MapleMapObjectType.ITEM);

        if (ob == null || pet == null) {
            return;
        }
        final MapleMapItem mapitem = (MapleMapItem) ob;
        final Lock lock = mapitem.getLock();
        lock.lock();
        try {
            if (mapitem.isPickedUp()) {
                c.getSession().write(InventoryPacket.getInventoryFull());
                return;
            }
            if (mapitem.getOwner() != chr.getId() && mapitem.isPlayerDrop()) {
                return;
            }
            if (mapitem.getOwner() != chr.getId() && ((!mapitem.isPlayerDrop() && mapitem.getDropType() == 0) || (mapitem.isPlayerDrop() && chr.getMap().getEverlast()))) {
                return;
            }
            if (mapitem.getOwner() != chr.getId() && ((!mapitem.isPlayerDrop() && mapitem.getDropType() == 0) || (mapitem.isPlayerDrop() && chr.getMap().getEverlast()))) {
                return;
            }
            if (!mapitem.isPlayerDrop() && mapitem.getDropType() == 1 && mapitem.getOwner() != chr.getId() && (chr.getParty() == null || chr.getParty().getMemberById(mapitem.getOwner()) == null)) {
                return;
            }
            final double Distance = Client_Reportedpos.distanceSq(mapitem.getPosition());
            if (Distance > 10000 && (mapitem.getMeso() > 0 || mapitem.getItemId() != 4001025)) {
                chr.getCheatTracker().registerOffense(CheatingOffense.PET_ITEMVAC_CLIENT, String.valueOf(Distance));
            } else if (pet.getPos().distanceSq(mapitem.getPosition()) > 640000.0) {
                chr.getCheatTracker().registerOffense(CheatingOffense.PET_ITEMVAC_SERVER);

            }

            if (mapitem.getMeso() > 0) {
                if (chr.getParty() != null && mapitem.getOwner() != chr.getId()) {
                    final List<MapleCharacter> toGive = new LinkedList<MapleCharacter>();
                    final int splitMeso = mapitem.getMeso() * 40 / 100;
                    for (MaplePartyCharacter z : chr.getParty().getMembers()) {
                        MapleCharacter m = chr.getMap().getCharacterById(z.getId());
                        if (m != null && m.getId() != chr.getId()) {
                            toGive.add(m);
                        }
                    }
                    for (final MapleCharacter m : toGive) {
                        m.gainMeso(splitMeso / toGive.size() + (m.getStat().hasPartyBonus ? (int) (mapitem.getMeso() / 20.0) : 0), true);
                    }
                    chr.gainMeso(mapitem.getMeso() - splitMeso, true);
                } else {
                    chr.gainMeso(mapitem.getMeso(), true);
                }
                removeItem_Pet(chr, mapitem, petz);
            } else {
                if (MapleItemInformationProvider.getInstance().isPickupBlocked(mapitem.getItemId()) || mapitem.getItemId() / 10000 == 291) {
                    c.getSession().write(MaplePacketCreator.enableActions());
                } else if (mapitem.getItemId() == 4031865 || mapitem.getItemId() == 4031866) {
                    // Allow pickup even if inventory is full for item 4031865 and 4031866
                    chr.modifyCSPoints(1, mapitem.getItemId() == 4031865 ? 100 : 250, true);
                    removeItem_Pet(chr, mapitem, petz); // Remove item after pickup
                    return; // Exit after handling this specific item case
                } else if (useItem(c, mapitem.getItemId())) {
                    removeItem_Pet(chr, mapitem, petz);
                } else if (MapleInventoryManipulator.checkSpace(c, mapitem.getItemId(), mapitem.getItem().getQuantity(), mapitem.getItem().getOwner())) {
                    if (mapitem.getItem().getQuantity() >= 50 && mapitem.getItemId() == 2340000) {
                        c.setMonitored(true); //hack check
                    }
                    MapleInventoryManipulator.addFromDrop(c, mapitem.getItem(), true, mapitem.getDropper() instanceof MapleMonster, false);
                    removeItem_Pet(chr, mapitem, petz);
                }
            }
        } finally {
            lock.unlock();
        }
    }

    public static final boolean useItem(final MapleClient c, final int id) {
        if (GameConstants.isUse(id)) { // TO prevent caching of everything, waste of mem
            final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            final MapleStatEffect eff = ii.getItemEffect(id);
            if (eff == null) {
                return false;
            }
            //must hack here for ctf
            if (id / 10000 == 291) {
                boolean area = false;
                for (Rectangle rect : c.getPlayer().getMap().getAreas()) {
                    if (rect.contains(c.getPlayer().getTruePosition())) {
                        area = true;
                        break;
                    }
                }
                if (!c.getPlayer().inPVP() || (c.getPlayer().getTeam() == (id - 2910000) && area)) {
                    return false; //dont apply the consume
                }
            }
            final int consumeval = eff.getConsume();

            if (consumeval > 0) {
                consumeItem(c, eff);
                consumeItem(c, ii.getItemEffectEX(id));
                c.getSession().write(InfoPacket.getShowItemGain(id, (byte) 1));
                return true;
            }
        }
        return false;
    }

    public static final void consumeItem(final MapleClient c, final MapleStatEffect eff) {
        if (eff == null) {
            return;
        }
        if (eff.getConsume() == 2) {
            if (c.getPlayer().getParty() != null && c.getPlayer().isAlive()) {
                for (final MaplePartyCharacter pc : c.getPlayer().getParty().getMembers()) {
                    final MapleCharacter chr = c.getPlayer().getMap().getCharacterById(pc.getId());
                    if (chr != null && chr.isAlive()) {
                        eff.applyTo(chr);
                    }
                }
            } else {
                eff.applyTo(c.getPlayer());
            }
        } else if (c.getPlayer().isAlive()) {
            eff.applyTo(c.getPlayer());
        }
    }

    public static final void removeItem_Pet(final MapleCharacter chr, final MapleMapItem mapitem, int pet) {
        mapitem.setPickedUp(true);
        chr.getMap().broadcastMessage(EtcPacket.removeItemFromMap(mapitem.getObjectId(), 5, chr.getId(), pet));
        chr.getMap().removeMapObject(mapitem);
        if (mapitem.isRandDrop()) {
            chr.getMap().spawnRandDrop();
        }
    }

    private static final void removeItem(final MapleCharacter chr, final MapleMapItem mapitem, final MapleMapObject ob) {
        mapitem.setPickedUp(true);
        chr.getMap().broadcastMessage(EtcPacket.removeItemFromMap(mapitem.getObjectId(), 2, chr.getId()), mapitem.getPosition());
        chr.getMap().removeMapObject(ob);
        if (mapitem.isRandDrop()) {
            chr.getMap().spawnRandDrop();
        }
    }

    private static final void addMedalString(final MapleCharacter c, final StringBuilder sb) {
        final Item medal = c.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -49);
        if (medal != null) { // Medal
            sb.append("<");
            if (medal.getItemId() == 1142257 && GameConstants.isAdventurer(c.getJob())) {
                MapleQuestStatus stat = c.getQuestNoAdd(MapleQuest.getInstance(GameConstants.ULT_EXPLORER));
                if (stat != null && stat.getCustomData() != null) {
                    sb.append(stat.getCustomData());
                    sb.append("'s Successor");
                } else {
                    sb.append(MapleItemInformationProvider.getInstance().getName(medal.getItemId()));
                }
            } else {
                sb.append(MapleItemInformationProvider.getInstance().getName(medal.getItemId()));
            }
            sb.append(">");
        }
    }

    private static final boolean getIncubatedItems(MapleClient c, int itemId) {
        if (c.getPlayer().getInventory(MapleInventoryType.EQUIP).getNumFreeSlot() < 2 || c.getPlayer().getInventory(MapleInventoryType.USE).getNumFreeSlot() < 2 || c.getPlayer().getInventory(MapleInventoryType.SETUP).getNumFreeSlot() < 2) {
            c.getPlayer().dropMessage(5, "Please make room in your inventory.");
            return false;
        }
        final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        int id1 = RandomRewards.getPeanutReward(), id2 = RandomRewards.getPeanutReward();
        while (!ii.itemExists(id1)) {
            id1 = RandomRewards.getPeanutReward();
        }
        while (!ii.itemExists(id2)) {
            id2 = RandomRewards.getPeanutReward();
        }
        c.getSession().write(MaplePacketCreator.getPeanutResult(id1, (short) 1, id2, (short) 1, itemId));
        MapleInventoryManipulator.addById(c, id1, (short) 1, ii.getName(itemId) + " on " + FileoutputUtil.CurrentReadable_Date());
        MapleInventoryManipulator.addById(c, id2, (short) 1, ii.getName(itemId) + " on " + FileoutputUtil.CurrentReadable_Date());
        return true;
    }

    public static final void OwlMinerva(final LittleEndianAccessor slea, final MapleClient c) {
        final byte slot = (byte) slea.readShort();
        final int itemid = slea.readInt();
        final Item toUse = c.getPlayer().getInventory(MapleInventoryType.USE).getItem(slot);
        if (toUse != null && toUse.getQuantity() > 0 && toUse.getItemId() == itemid && itemid == 2310000 && !c.getPlayer().hasBlockedInventory()) {
            final int itemSearch = slea.readInt();
            final List<HiredMerchant> hms = c.getChannelServer().searchMerchant(itemSearch);
            if (hms.size() > 0) {
                c.getSession().write(MaplePacketCreator.getOwlSearched(itemSearch, hms));
                MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, itemid, 1, true, false);
            } else {
                c.getPlayer().dropMessage(1, "Unable to find the item.");
            }
        }
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    public static final void Owl(final LittleEndianAccessor slea, final MapleClient c) {
        if (c.getPlayer().haveItem(5230000, 1, true, false) || c.getPlayer().haveItem(2310000, 1, true, false)) {
            if (c.getPlayer().getMapId() >= 910000000 && c.getPlayer().getMapId() <= 910000022) {
                c.getSession().write(MaplePacketCreator.getOwlOpen());
            } else {
                c.getPlayer().dropMessage(5, "This can only be used inside the Free Market.");
                c.getSession().write(MaplePacketCreator.enableActions());
            }
        }
    }
    public static final int OWL_ID = 2; //don't change. 0 = owner ID, 1 = store ID, 2 = object ID

    public static final void OwlWarp(final LittleEndianAccessor slea, final MapleClient c) {
        if (c.getPlayer().getMapId() >= 910000000 && c.getPlayer().getMapId() <= 910000022) {
            final int id = slea.readInt();
            final int map = slea.readInt();
            if (map >= 910000001 && map <= 910000022) {
                c.getSession().write(MaplePacketCreator.getOwlMessage(0));
                final MapleMap mapp = c.getChannelServer().getMapFactory().getMap(map);
                c.getPlayer().changeMap(mapp, mapp.getPortal(0));
                AbstractPlayerStore merchant = null;
                List<MapleMapObject> objects;
                switch (OWL_ID) {
                    case 0:
                        boolean bln = false;
                        objects = mapp.getAllHiredMerchantsThreadsafe();
                        for (MapleMapObject ob : objects) {
                            if (ob instanceof IMaplePlayerShop) {
                                final IMaplePlayerShop ips = (IMaplePlayerShop) ob;
                                if (ips instanceof HiredMerchant) {
                                    final HiredMerchant merch = (HiredMerchant) ips;
                                    if (merch.getOwnerId() == id) {
                                        merchant = merch;
                                        bln = true;
                                        break;
                                    }
                                }
                            }
                        }
                        if (!bln) {
                            List<MapleCharacter> objs = mapp.getCharactersThreadsafe();
                            for (MapleCharacter chr : objs) {
                                if (chr.getPlayerShop() != null && chr.getMapId() == map) {
                                    if (chr.getPlayerShop() instanceof MaplePlayerShop) {
                                        MaplePlayerShop shop = (MaplePlayerShop) chr.getPlayerShop();
                                        if (shop.isOpen()) {
                                            if (shop.getOwnerId() == id) {
                                                merchant = shop;
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        break;
                    case 1:
                        objects = mapp.getAllHiredMerchantsThreadsafe();
                        for (MapleMapObject ob : objects) {
                            if (ob instanceof IMaplePlayerShop) {
                                final IMaplePlayerShop ips = (IMaplePlayerShop) ob;
                                if (ips instanceof HiredMerchant) {
                                    final HiredMerchant merch = (HiredMerchant) ips;
                                    if (merch.getStoreId() == id) {
                                        merchant = merch;
                                        break;
                                    }
                                }
                            }
                        }
                        break;
                    default:
                        final MapleMapObject ob = mapp.getMapObject(id, MapleMapObjectType.HIRED_MERCHANT);
                        if (ob instanceof IMaplePlayerShop) {
                            final IMaplePlayerShop ips = (IMaplePlayerShop) ob;
                            if (ips instanceof HiredMerchant) {
                                merchant = (HiredMerchant) ips;
                            }
                        }
                        final MapleMapObject ob2 = mapp.getMapObject(id, MapleMapObjectType.SHOP);
                        if (ob2 instanceof IMaplePlayerShop) {
                            final IMaplePlayerShop ips = (IMaplePlayerShop) ob2;
                            if (ips instanceof MaplePlayerShop) {
                                merchant = (MaplePlayerShop) ips;
                            }
                        }
                        break;
                }
                if (merchant != null) {
                    if (merchant instanceof HiredMerchant) {
                        if (merchant.isOwner(c.getPlayer())) {
                            HiredMerchant merc = (HiredMerchant) merchant;
                            merc.setOpen(false);
                            merc.removeAllVisitors((byte) 16, (byte) 0);
                            c.getPlayer().setPlayerShop(merc);
                            c.getSession().write(PlayerShopPacket.getHiredMerch(c.getPlayer(), merc, false));
                        } else {
                            HiredMerchant merc = (HiredMerchant) merchant;
                            if (!merc.isOpen() || !merc.isAvailable()) {
                                c.getPlayer().dropMessage(1, "The owner of the store is currently undergoing store maintenance. Please try again in a bit.");
                            } else {
                                if (merc.getFreeSlot() == -1) {
                                    c.getPlayer().dropMessage(1, "You can't enter the room due to full capacity.");
                                } else if (merc.isInBlackList(c.getPlayer().getName())) {
                                    c.getPlayer().dropMessage(1, "You may not enter this store.");
                                } else {
                                    c.getPlayer().setPlayerShop(merc);
                                    merc.addVisitor(c.getPlayer());
                                    c.getSession().write(PlayerShopPacket.getHiredMerch(c.getPlayer(), merc, false));
                                }
                            }
                        }
                    } else if (merchant instanceof HiredMerchant) {
                        if (((HiredMerchant) merchant).isInBlackList(c.getPlayer().getName())) {
                            c.getPlayer().dropMessage(1, "You may not enter this store.");
                            return;
                        } else {
                            if (merchant.getFreeSlot() < 0 || merchant.getVisitorSlot(c.getPlayer()) > -1 || !merchant.isOpen() || !merchant.isAvailable()) {
                                c.getSession().write(PlayerShopPacket.getMiniGameFull());
                            } else {
                                c.getPlayer().setPlayerShop(merchant);
                                merchant.addVisitor(c.getPlayer());
                                c.getSession().write(PlayerShopPacket.getPlayerStore(c.getPlayer(), false));
                            }
                        }
                    }
                } else {
                    c.getPlayer().dropMessage(1, "You may not enter this store.");
                }
            } else {
                c.getPlayer().dropMessage(1, "The owner of the store is currently undergoing store maintenance. Please try again in a bit.");
            }
        } else {
            c.getSession().write(MaplePacketCreator.getOwlMessage(23));
        }
    }

    public static final void PamSong(LittleEndianAccessor slea, MapleClient c) {
        final Item pam = c.getPlayer().getInventory(MapleInventoryType.CASH).findById(5640000);
        if (slea.readByte() > 0 && c.getPlayer().getScrolledPosition() != 0 && pam != null && pam.getQuantity() > 0) {
            final MapleInventoryType inv = c.getPlayer().getScrolledPosition() < 0 ? MapleInventoryType.EQUIPPED : MapleInventoryType.EQUIP;
            final Item item = c.getPlayer().getInventory(inv).getItem(c.getPlayer().getScrolledPosition());
            c.getPlayer().setScrolledPosition((short) 0);
            if (item != null) {
                final Equip eq = (Equip) item;
                eq.setUpgradeSlots((byte) (eq.getUpgradeSlots() + 1));
                c.getPlayer().forceReAddItem_Flag(eq, inv);
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.CASH, pam.getPosition(), (short) 1, true, false);
                c.getPlayer().getMap().broadcastMessage(EtcPacket.pamsSongEffect(c.getPlayer().getId()));
            }
        } else {
            c.getPlayer().setScrolledPosition((short) 0);
        }
    }

    public static final void TeleRock(LittleEndianAccessor slea, MapleClient c) {
        final byte slot = (byte) slea.readShort();
        final int itemId = slea.readInt();
        final Item toUse = c.getPlayer().getInventory(MapleInventoryType.USE).getItem(slot);

        if (toUse == null || toUse.getQuantity() < 1 || toUse.getItemId() != itemId || itemId / 10000 != 232 || c.getPlayer().hasBlockedInventory()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        boolean used = UseTeleRock(slea, c, itemId);
        if (used) {
            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, false);
        }
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    public static final boolean UseTeleRock(LittleEndianAccessor slea, MapleClient c, int itemId) {
        boolean used = false;
        if (itemId == 5041001 || itemId == 5040004) {
            slea.readByte(); //useless
        }
        if (slea.readByte() == 0) { // Rocktype
            final MapleMap target = c.getChannelServer().getMapFactory().getMap(slea.readInt());
            //if ((itemId == 5041000 && c.getPlayer().isRockMap(target.getId())) || (itemId != 5041000 && c.getPlayer().isRegRockMap(target.getId())) || ((itemId == 5040004 || itemId == 5041001) && (c.getPlayer().isHyperRockMap(target.getId()) || GameConstants.isHyperTeleMap(target.getId())))) {
            if (!FieldLimitType.VipRock.check(c.getPlayer().getMap().getFieldLimit()) && !FieldLimitType.VipRock.check(target.getFieldLimit()) && !c.getPlayer().isInBlockedMap()) { //Makes sure this map doesn't have a forced return map
                c.getPlayer().changeMap(target, target.getPortal(0));
                used = true;
            } else {
                c.getPlayer().dropMessage(1, "You cannot go to that place.");
            }
        } else {
            final MapleCharacter victim = c.getChannelServer().getPlayerStorage().getCharacterByName(slea.readMapleAsciiString());
            if (victim != null && !victim.isIntern() && c.getPlayer().getEventInstance() == null && victim.getEventInstance() == null) {
                if (!FieldLimitType.VipRock.check(c.getPlayer().getMap().getFieldLimit()) && !FieldLimitType.VipRock.check(c.getChannelServer().getMapFactory().getMap(victim.getMapId()).getFieldLimit()) && !victim.isInBlockedMap() && !c.getPlayer().isInBlockedMap()) {
                    if (itemId == 5041000 || itemId == 5040004 || itemId == 5041001 || (victim.getMapId() / 100000000) == (c.getPlayer().getMapId() / 100000000)) { // Viprock or same continent
                        c.getPlayer().changeMap(victim.getMap(), victim.getMap().findClosestPortal(victim.getTruePosition()));
                        used = true;
                    } else {
                        c.getPlayer().dropMessage(1, "You cannot go to that place.");
                    }
                } else {
                    c.getPlayer().dropMessage(1, "You cannot go to that place.");
                }
            } else {
                c.getPlayer().dropMessage(1, "is currently difficult to locate, so the teleport will not take place.");
            }
        }
        return used;// && itemId != 5041001 && itemId != 5040004;
    }

    public static final boolean UseHyperTeleRock(LittleEndianAccessor slea, MapleClient c, int itemId) {
        boolean used = false;
        long temptime = System.currentTimeMillis();
        long exploit = c.getPlayer().getLongNoRecord(GameConstants.TELETIME);
        long timeLeft = exploit - System.currentTimeMillis();
        long minutes = timeLeft / 60000;
        long seconds = (timeLeft % 60000) / 1000;
        if (itemId == 5041001 || itemId == 5040004) {
            slea.readByte(); //useless
        }
        if (exploit - temptime >= 0&&c.getPlayer().getGMLevel()==0){
            c.getPlayer().dropMessage(1, "Can be used again in " + minutes + " minutes and " + seconds + " seconds.");
        }else{
            if (slea.readByte() == 0) { // Rocktype
                final MapleMap target = c.getChannelServer().getMapFactory().getMap(slea.readInt());
                //if ((itemId == 5041000 && c.getPlayer().isRockMap(target.getId())) || (itemId != 5041000 && c.getPlayer().isRegRockMap(target.getId())) || ((itemId == 5040004 || itemId == 5041001) && (c.getPlayer().isHyperRockMap(target.getId()) || GameConstants.isHyperTeleMap(target.getId())))) {
                if (!FieldLimitType.VipRock.check(c.getPlayer().getMap().getFieldLimit()) && !FieldLimitType.VipRock.check(target.getFieldLimit()) && !c.getPlayer().isInBlockedMap()) { //Makes sure this map doesn't have a forced return map
                    c.getPlayer().changeMap(target, target.getPortal(0));
                    used = false;
                    c.getPlayer().getQuestNAdd(MapleQuest.getInstance(GameConstants.TELETIME)).setCustomData(String.valueOf(System.currentTimeMillis() + (1 * 60 * 1000))); // changed from 5 to 1 minute for alpha
                } else {
                    c.getPlayer().dropMessage(1, "You cannot go to that place.");
                }
            } else {
                final MapleCharacter victim = c.getChannelServer().getPlayerStorage().getCharacterByName(slea.readMapleAsciiString());
                if (victim != null && !victim.isIntern() && c.getPlayer().getEventInstance() == null && victim.getEventInstance() == null) {
                    if (!FieldLimitType.VipRock.check(c.getPlayer().getMap().getFieldLimit()) && !FieldLimitType.VipRock.check(c.getChannelServer().getMapFactory().getMap(victim.getMapId()).getFieldLimit()) && !victim.isInBlockedMap() && !c.getPlayer().isInBlockedMap()) {
                        if (itemId == 5041000 || itemId == 5040004 || itemId == 5041001 || (victim.getMapId() / 100000000) == (c.getPlayer().getMapId() / 100000000)) { // Viprock or same continent
                            c.getPlayer().changeMap(victim.getMap(), victim.getMap().findClosestPortal(victim.getTruePosition()));
                            c.getPlayer().getQuestNAdd(MapleQuest.getInstance(GameConstants.TELETIME)).setCustomData(String.valueOf(System.currentTimeMillis() + (5 * 60 * 1000)));
                            used = false;
                        }
                    } else {
                        c.getPlayer().dropMessage(1, "You cannot go to that place.");
                    }
                } else {
                    c.getPlayer().dropMessage(1, "is currently difficult to locate, so the teleport will not take place.");
                }
            }
        }
        return used;// && itemId != 5041001 && itemId != 5040004;
    }

    public static final void Reveal(Item id, final MapleClient c, boolean bonus, int type) {
        final Equip eqq = (Equip) id;
        final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        final int reqLevel = ii.getReqLevel(eqq.getItemId()) / 10;
        final List<List<StructItemOption>> pots = new LinkedList<>(ii.getAllPotentialInfo().values());
        int new_state = Math.abs(eqq.getPotential1());

        if (new_state < 17) {
            new_state = 17;
        } else if (new_state > 20) {
            new_state = 20;
        }

        int lines = 3;

        if (eqq.getPotential3() == 0) {
            lines = 2;

            if (type != 0) {
                if (type == 1 && Math.random() <= 0.1) {
                    lines = 3;
                } else if (type == 2 && Math.random() <= 0.25) {
                    lines = 3;
                }
            }
        }

        while (eqq.getState() != new_state) {
            for (int i = 0; i < lines; i++) {
                boolean rewarded = false;
                while (!rewarded) {
                    StructItemOption pot = pots.get(Randomizer.nextInt(pots.size())).get(reqLevel);

                    if (pot != null && pot.reqLevel / 10 <= reqLevel
                            && GameConstants.optionTypeFits(pot.optionType, eqq.getItemId())
                            && GameConstants.potentialIDFits(pot.opID, new_state, i)) {
                        if (pot.opID < 60001) {
                            if (i == 0) {
                                eqq.setPotential1(pot.opID);
                            } else if (i == 1) {
                                eqq.setPotential2(pot.opID);
                            } else if (i == 2 && lines == 3) {
                                eqq.setPotential3(pot.opID);
                            }
                            rewarded = true;
                        }
                    }
                }
            }
        }

        c.getPlayer().getTrait(MapleTrait.MapleTraitType.insight).addExp(8, c.getPlayer());
        c.getPlayer().getMap().broadcastMessage(EtcPacket.showMagnifyingEffect(c.getPlayer().getId(), eqq.getPosition()));
        c.getPlayer().forceReAddItem(id, MapleInventoryType.EQUIP);
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    public static final void autoLoot(MapleCharacter chr, MapleClient c) {

        for (MapleMapItem mapitem : chr.getMap().getAllItems()) {
            if (mapitem.getDropper().getType() == MapleMapObjectType.MONSTER) { // 오토 루팅의 조건은 몬스터에게서 드랍되는 템 기준만. 그외의 아이템은 먹지않음. 사람한테서 떨군다거나. 등등.
                final MapleMapObject ob = chr.getMap().getMapObject(mapitem.getObjectId(), MapleMapObjectType.ITEM);
                final Lock lock = mapitem.getLock();
                lock.lock();
                try {
                    if (mapitem.isPickedUp()) {
                        c.getSession().write(MaplePacketCreator.enableActions());
                        continue;
                    }
                    if (mapitem.getQuest() > 0 && chr.getQuestStatus(mapitem.getQuest()) != 1) {
                        c.getSession().write(MaplePacketCreator.enableActions());
                        continue;
                    }
                    if (mapitem.getOwner() != chr.getId() && ((!mapitem.isPlayerDrop() && mapitem.getDropType() == 0) || (mapitem.isPlayerDrop() && chr.getMap().getEverlast()))) {
                        c.getSession().write(MaplePacketCreator.enableActions());
                        continue;
                    }
                    if (!mapitem.isPlayerDrop() && mapitem.getDropType() == 1 && mapitem.getOwner() != chr.getId() && (chr.getParty() == null || chr.getParty().getMemberById(mapitem.getOwner()) == null)) {
                        c.getSession().write(MaplePacketCreator.enableActions());
                        continue;
                    }
                    if (mapitem.getMeso() <= 0) {
                        final boolean canShow;
                        //Pair<Integer, Integer> questInfo = MapleItemInformationProvider.getInstance().getQuestItemInfo(mapitem.getItemId());
                        //if (questInfo != null && questInfo.getLeft() == mapitem.getQuest()) {
                        //    canShow = !chr.haveItem(mapitem.getItemId(), questInfo.getRight(), true, true);
                        //} else {
                            canShow = true;
                        //}
                        //퀘스트 아이템은 필요 갯수를 초과하여 먹을 수 없음.
//                chr.dropMessage(6, MapleItemInformationProvider.getInstance().getName(mapitem.getItemId()) + " is can pickup ? " + canShow + " / questInfo : " + questInfo);
                        if (!canShow) {
                            c.getSession().write(InventoryPacket.getInventoryFull());
                            c.getSession().write(InventoryPacket.getShowInventoryFull());
                            c.getSession().write(MaplePacketCreator.enableActions());
                            return;
                        }
                    }
                    if (mapitem.getOwner() != c.getPlayer().getId()) {
                        c.getSession().write(MaplePacketCreator.enableActions());
                        continue;
                    }
                    if (mapitem.getMeso() > 0) {
                        if (chr.getParty() != null) {
                            final List<MapleCharacter> toGive = new LinkedList<MapleCharacter>();
                            final int splitMeso = mapitem.getMeso() * 40 / 100;
                            int givenMeso = 0;
                            for (MaplePartyCharacter pChr : chr.getParty().getMembers()) {
                                MapleCharacter otherChar = chr.getMap().getCharacterById(pChr.getId());
                                if (otherChar != null && otherChar.getId() != chr.getId()) {
                                    toGive.add(otherChar);
                                }
                            }
                            for (final MapleCharacter m : toGive) {
                                int meso = splitMeso / toGive.size();
                                if (mapitem.getDropper().getType() == MapleMapObjectType.MONSTER) {
                                    m.gainMeso(meso, true);
                                } else {
                                    m.gainMeso(meso, true);
                                }
                                givenMeso += meso;
                            }
                            //if (c.getPlayer().hasEquipped(1122242)) {//
                            //    chr.gainMeso((mapitem.getMeso() - givenMeso) + ((mapitem.getMeso() - givenMeso)/20), true);
                            //} else if (c.getPlayer().hasEquipped(1122244)) {//
                            //    chr.gainMeso((mapitem.getMeso() - givenMeso) + ((mapitem.getMeso() - givenMeso)/10), true);
                            //} else {
                                chr.gainMeso(mapitem.getMeso() - givenMeso, true);
                            //}
                            c.getSession().write(MaplePacketCreator.enableActions());
                        } else {
                            if (mapitem.getDropper().getType() == MapleMapObjectType.MONSTER) {
                                //if (c.getPlayer().hasEquipped(1122242)) {//
                                //    chr.gainMeso(mapitem.getMeso() + (mapitem.getMeso()/20), true);
                                //} else if (c.getPlayer().hasEquipped(1122244)) {//
                                //    chr.gainMeso(mapitem.getMeso() + (mapitem.getMeso()/10), true);
                                //} else {
                                    chr.gainMeso(mapitem.getMeso(), true);
                                //}
                            } else {
                                //if (c.getPlayer().hasEquipped(1122242)) {//
                                //    chr.gainMeso(mapitem.getMeso() + (mapitem.getMeso()/20), true);
                                //} else if (c.getPlayer().hasEquipped(1122244)) {//
                                //    chr.gainMeso(mapitem.getMeso() + (mapitem.getMeso()/10), true);
                                //} else {
                                    chr.gainMeso(mapitem.getMeso(), true);
                                //}
                            }
                            c.getSession().write(MaplePacketCreator.enableActions());
                        }
                        removeItem(chr, mapitem, ob);
                    } else {
                        if (MapleItemInformationProvider.getInstance().isPickupBlocked(mapitem.getItemId())) {
                            c.getSession().write(MaplePacketCreator.enableActions());
                            c.getPlayer().dropMessage(5, "The item cannot be picked up.");
                        } else if (useItem(c, mapitem.getItemId())) {
                            removeItem(c.getPlayer(), mapitem, ob);
                        } else if (mapitem.getItemId() / 10000 != 291 && MapleInventoryManipulator.checkSpace(c, mapitem.getItemId(), mapitem.getItem().getQuantity(), mapitem.getItem().getOwner())) {
                            if (mapitem.getItem().getQuantity() >= 50 && mapitem.getItemId() == 2340000) {
                                c.setMonitored(true); //hack check
                            }
                            if (c.getPlayer().getInventory(GameConstants.getInventoryType(mapitem.getItemId())).getNextFreeSlot() > -1) {
                                MapleInventoryManipulator.addFromDrop(c, mapitem.getItem(), true, mapitem.getDropper() instanceof MapleMonster);
                                removeItem(chr, mapitem, ob);
                            } else {
                                c.getSession().write(MaplePacketCreator.enableActions());
                                c.getPlayer().dropMessage(5, "The backpack is full and you cannot pick up more items.");                                
                            }

                        } else {
                            c.getSession().write(InventoryPacket.getInventoryFull());
                            c.getSession().write(InventoryPacket.getShowInventoryFull());
                            c.getSession().write(MaplePacketCreator.enableActions());
                        }
                    }
                } finally {
                    lock.unlock();
                }
            }
        }
    }
}
