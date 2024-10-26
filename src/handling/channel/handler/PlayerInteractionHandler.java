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

import java.util.Arrays;

import client.inventory.Item;
import client.inventory.ItemFlag;
import constants.GameConstants;
import client.MapleClient;
import client.MapleCharacter;
import client.inventory.MapleInventoryType;
import handling.world.World;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.MapleTrade;
import server.maps.FieldLimitType;
import server.shops.HiredMerchant;
import server.shops.IMaplePlayerShop;
import server.shops.MaplePlayerShop;
import server.shops.MaplePlayerShopItem;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import server.shops.MapleMiniGame;
import tools.packet.EtcPacket;
import tools.packet.PlayerShopPacket;
import tools.data.LittleEndianAccessor;
import tools.packet.MaplePacketCreator;

public class PlayerInteractionHandler {

    private enum Interaction {

        CREATE(6),//創建商店或迷你遊戲
        INVITE_TRADE(11),//交換申請
        DENY_TRADE(12),//拒絕交換
        VISIT(9),//訪問商店
        HIRED_MERCHANT_MAINTENANCE(21),//商店管理
        CHAT(14),//留言
        EXIT(18),//離開商店
        OPEN(16),//開啟商店
        SET_ITEMS(0),//移动交換的物品
        SET_MESO(1),//給予交換的金幣
        CONFIRM_TRADE(2),//確認交換
        PLAYER_SHOP_ADD_ITEM(42),
        BUY_ITEM_PLAYER_SHOP(22),
        ADD_ITEM(23),//添加商品
        BUY_ITEM_STORE(24),//購買商品成功
        BUY_ITEM_HIREDMERCHANT(26),
        REMOVE_ITEM(30),//移除商品
        MAINTANCE_OFF(31), //商店管理狀態時離開商店
        MAINTANCE_ORGANISE(32),//物品整理
        CLOSE_MERCHANT(33), //關閉商店
        TAKE_MESOS(35),
        ADMIN_STORE_NAMECHANGE(37),
        VIEW_MERCHANT_VISITOR(38),//查看訪問者
        VIEW_MERCHANT_BLACKLIST(39),//打開黑名單
        MERCHANT_BLACKLIST_ADD(40),//添加黑名單
        MERCHANT_BLACKLIST_REMOVE(41),//刪除黑名單
        REQUEST_TIE(56),
        ANSWER_TIE(57),
        GIVE_UP(58),
        REQUEST_REDO(60),
        ANSWER_REDO(61),
        EXIT_AFTER_GAME(62),
        CANCEL_EXIT(63),
        READY(64),
        UN_READY(65),
        EXPEL(66),
        START(67),
        SKIP(69),
        MOVE_OMOK(70),
        SELECT_CARD(74);
        public int action;

        private Interaction(int action) {
            this.action = action;
        }

        public static Interaction getByAction(int i) {
            for (Interaction s : Interaction.values()) {
                if (s.action == i) {
                    return s;
                }
            }
            return null;
        }
    }

    public static final void PlayerInteraction(final LittleEndianAccessor slea, final MapleClient c, final MapleCharacter chr) {
        //System.out.println("player interaction.." + slea.toString());
        final Interaction action = Interaction.getByAction(slea.readByte());
        if (chr == null || action == null) {
            return;
        }
        c.getPlayer().setScrolledPosition((short) 0);

        switch (action) { // Mode
            case CREATE: {
                if (chr.getPlayerShop() != null || c.getChannelServer().isShutdown() || chr.hasBlockedInventory()) {
                    c.getSession().write(MaplePacketCreator.enableActions());
                    return;
                }
                final byte createType = slea.readByte();
                if (createType == 3) { // trade
                    MapleTrade.startTrade(chr);
                } else if (createType == 1 || createType == 2 || createType == 4 || createType == 5) { // shop
                    //if (createType == 4 && !chr.isIntern()) { //not hired merch... blocked playershop
                    //    c.getSession().write(CWvsContext.enableActions());
                    //    return;
                    //}
                    if (chr.getMap().getMapObjectsInRange(chr.getTruePosition(), 20000, Arrays.asList(MapleMapObjectType.SHOP, MapleMapObjectType.HIRED_MERCHANT)).size() != 0 || chr.getMap().getPortalsInRange(chr.getTruePosition(), 20000).size() != 0) {
                        chr.dropMessage(1, "You may not establish a store here.");
                        c.getSession().write(MaplePacketCreator.enableActions());
                        return;
                    } else if (chr.getPosition().y >= 980) {
                            chr.dropMessage(1, "You may not use minigames here.");
                            c.getSession().write(MaplePacketCreator.enableActions());
                            return;
                        } else if (createType == 1 || createType == 2) {
                            if (FieldLimitType.Minigames.check(chr.getMap().getFieldLimit()) || chr.getMap().allowPersonalShop()) {
                                chr.dropMessage(1, "You may not use minigames here.");
                                c.getSession().write(MaplePacketCreator.enableActions());
                                return;
                            }
                        }
                        final String desc = slea.readMapleAsciiString();
                        String pass = "";
                        if (slea.readByte() > 0) {
                            pass = slea.readMapleAsciiString();
                        }
                        if (createType == 1 || createType == 2) {
                            slea.readShort(); //item pos
                            int piece = slea.readByte();
                            int itemId = createType == 1 ? (4080000 + piece) : 4080100;
                            MapleMiniGame game = new MapleMiniGame(chr, itemId, desc, pass, createType, chr.getTruePosition()); //itemid
                            game.setPieceType(piece);
                            chr.setPlayerShop(game);
                            game.setAvailable(true);
                            game.setOpen(true);
                            game.send(c);
                            chr.getMap().addMapObject(game);
                            game.update();
                        } else if (chr.getMap().allowPersonalShop()) {
                            Item shop = c.getPlayer().getInventory(MapleInventoryType.CASH).getItem((byte) slea.readShort());
                            if (shop == null || shop.getQuantity() <= 0 || shop.getItemId() != slea.readInt() || c.getPlayer().getMapId() < 910000001 || c.getPlayer().getMapId() > 910000022) {
                                chr.dropMessage(1, "You may not use minigames here.");
                                return;
                            }
                            if (createType == 4) {
                            //MaplePlayerShop mps = new MaplePlayerShop(chr, shop.getItemId(), desc);
                                //chr.setPlayerShop(mps);
                                //chr.getMap().addMapObject(mps);
                                //c.getSession().write(PlayerShopPacket.getPlayerStore(chr, true));
                            } else if (HiredMerchantHandler.UseHiredMerchant(chr.getClient(), false)) {
                                final HiredMerchant merch = new HiredMerchant(chr, shop.getItemId(), desc, chr.getTruePosition());
                                chr.setPlayerShop(merch);
                                chr.getMap().addMapObject(merch);
                                c.getSession().write(PlayerShopPacket.getHiredMerch(chr, merch, true));
                            }
                        }
                    }
                    break;
                }
            
        
    

            case INVITE_TRADE: {
                if (chr.getMap() == null) {
                    return;
                }
                if (chr.getLevel() < 10) {
                    chr.dropMessage(1, "Level 10 or below cannot be exchanged.");
                    return;
                }
                MapleCharacter chrr = chr.getMap().getCharacterById(slea.readInt());
                if (chrr == null || c.getChannelServer().isShutdown() || chrr.hasBlockedInventory()) {
                    c.getSession().write(MaplePacketCreator.enableActions());
                    return;
                }
                MapleTrade.inviteTrade(chr, chrr);
                break;
            }
            case DENY_TRADE: {
                MapleTrade.declineTrade(chr);
                break;
            }
            case VISIT: {
                if (c.getChannelServer().isShutdown()) {
                    c.getSession().write(MaplePacketCreator.enableActions());
                    return;
                }
                if (chr.getTrade() != null && chr.getTrade().getPartner() != null && !chr.getTrade().inTrade()) {
                    MapleTrade.visitTrade(chr, chr.getTrade().getPartner().getChr());
                } else if (chr.getMap() != null && chr.getTrade() == null) {
                    final int obid = slea.readInt();
                    MapleMapObject ob = chr.getMap().getMapObject(obid, MapleMapObjectType.HIRED_MERCHANT);
                    if (ob == null) {
                        ob = chr.getMap().getMapObject(obid, MapleMapObjectType.SHOP);
                    }

                    if (ob instanceof IMaplePlayerShop && chr.getPlayerShop() == null) {
                        final IMaplePlayerShop ips = (IMaplePlayerShop) ob;

                        if (ob instanceof HiredMerchant) {
                            final HiredMerchant merchant = (HiredMerchant) ips;
                            /*if (merchant.isOwner(chr) && merchant.isOpen() && merchant.isAvailable()) {
                             merchant.setOpen(false);
                             merchant.removeAllVisitors((byte) 16, (byte) 0);
                             chr.setPlayerShop(ips);
                             c.getSession().write(PlayerShopPacket.getHiredMerch(chr, merchant, false));
                             } else {*/
                            if (!merchant.isOpen() || !merchant.isAvailable()) {
                                chr.dropMessage(1, "This shop is in maintenance, please come by later.");
                            } else {
                                if (ips.getFreeSlot() == -1) {
                                    chr.dropMessage(1, "This shop has reached it's maximum capacity, please come by later.");
                                } else if (merchant.isInBlackList(chr.getName())) {
                                    chr.dropMessage(1, "You have been banned from this store.");
                                } else {
                                    chr.setPlayerShop(ips);
                                    merchant.addVisitor(chr);
                                    c.getSession().write(PlayerShopPacket.getHiredMerch(chr, merchant, false));
                                }
                            }
                            //}
                        } else {
                            if (ips instanceof MaplePlayerShop && ((MaplePlayerShop) ips).isBanned(chr.getName())) {
                                chr.dropMessage(1, "You have been banned from this store.");
                                return;
                            } else {
                                if (ips.getFreeSlot() < 0 || ips.getVisitorSlot(chr) > -1 || !ips.isOpen() || !ips.isAvailable()) {
                                    c.getSession().write(PlayerShopPacket.getMiniGameFull());
                                } else {
                                    if (slea.available() > 0 && slea.readByte() > 0) { //a password has been entered
                                        String pass = slea.readMapleAsciiString();
                                        if (!pass.equals(ips.getPassword())) {
                                            c.getPlayer().dropMessage(1, "The password you entered is incorrect.");
                                            return;
                                        }
                                    } else if (ips.getPassword().length() > 0) {
                                        c.getPlayer().dropMessage(1, "The password you entered is incorrect.");
                                        return;
                                    }
                                    chr.setPlayerShop(ips);
                                    ips.addVisitor(chr);
                                    if (ips instanceof MapleMiniGame) {
                                        ((MapleMiniGame) ips).send(c);
                                    } else {
                                        c.getSession().write(PlayerShopPacket.getPlayerStore(chr, false));
                                    }
                                }
                            }
                        }
                    }
                }
                break;
            }
            case HIRED_MERCHANT_MAINTENANCE: {
                if (c.getChannelServer().isShutdown() || chr.getMap() == null || chr.getTrade() != null) {
                    c.getSession().write(MaplePacketCreator.enableActions());
                    return;
                }
                slea.skip(1); // 9?
                byte type = slea.readByte(); // 5?
                if (type != 5) {
                    c.getSession().write(MaplePacketCreator.enableActions());
                    return;
                }
                final String password = slea.readMapleAsciiString();
                //if (!c.CheckSecondPassword(password) || password.length() < 6 || password.length() > 16) {
                //	chr.dropMessage(5, "Please enter a valid PIC.");
                //	c.getSession().write(CWvsContext.enableActions());
                //	return;
                //}				
                final int obid = slea.readInt();
                MapleMapObject ob = chr.getMap().getMapObject(obid, MapleMapObjectType.HIRED_MERCHANT);
                if (ob == null || chr.getPlayerShop() != null) {
                    c.getSession().write(MaplePacketCreator.enableActions());
                    return;
                }
                if (ob instanceof IMaplePlayerShop && ob instanceof HiredMerchant) {
                    final IMaplePlayerShop ips = (IMaplePlayerShop) ob;
                    final HiredMerchant merchant = (HiredMerchant) ips;
                    if (merchant.isOwner(chr) && merchant.isOpen() && merchant.isAvailable()) {
                        merchant.setOpen(false);
                        merchant.removeAllVisitors((byte) 17, (byte) 1);//發送商店主人正在整理物品提示
                        chr.setPlayerShop(ips);
                        c.getSession().write(PlayerShopPacket.getHiredMerch(chr, merchant, false));
                    } else {
                        c.getSession().write(MaplePacketCreator.enableActions());
                    }
                }
                break;
            }
            case CHAT: {
                chr.updateTick(slea.readInt());
                final String message = slea.readMapleAsciiString();
                if (chr.getTrade() != null) {
                    chr.getTrade().chat(message);
                } else if (chr.getPlayerShop() != null) {
                    final IMaplePlayerShop ips = chr.getPlayerShop();
                    ips.broadcastToVisitors(PlayerShopPacket.shopChat(chr.getName() + " : " + (message), ips.getVisitorSlot(chr)));
                    if (chr.getClient().isMonitored()) { //Broadcast info even if it was a command.
                        World.Broadcast.broadcastGMMessage(MaplePacketCreator.serverNotice(6, chr.getName() + " said in " + ips.getOwnerName() + " shop : " + message));
                    }
                }
                break;
            }
            case EXIT: {
                if (chr.getTrade() != null) {
                    MapleTrade.cancelTrade(chr.getTrade(), chr.getClient(), chr);
                } else {
                    final IMaplePlayerShop ips = chr.getPlayerShop();
                    if (ips == null) { //should be null anyway for owners of hired merchants (maintenance_off)
                        return;
                    }
                    if (ips.isOwner(chr) && ips.getShopType() != 1) {
                        ips.closeShop(false, ips.isAvailable()); //how to return the items?
                    } else {
                        ips.removeVisitor(chr);
                    }
                    chr.setPlayerShop(null);
                }
                break;
            }
            case OPEN: {
                // c.getPlayer().haveItem(mode, 1, false, true)
                final IMaplePlayerShop shop = chr.getPlayerShop();
                if (shop != null && shop.isOwner(chr) && shop.getShopType() < 3 && !shop.isAvailable()) {
                    if (chr.getMap().allowPersonalShop()) {
                        if (c.getChannelServer().isShutdown()) {
                            chr.dropMessage(1, "The server is about to shut down.");
                            c.getSession().write(MaplePacketCreator.enableActions());
                            shop.closeShop(shop.getShopType() == 1, false);
                            return;
                        }

                        if (shop.getShopType() == 1 && HiredMerchantHandler.UseHiredMerchant(chr.getClient(), false)) {
                            final HiredMerchant merchant = (HiredMerchant) shop;
                            merchant.setStoreid(c.getChannelServer().addMerchant(merchant));
                            merchant.setOpen(true);
                            merchant.setAvailable(true);
                            chr.getMap().broadcastMessage(PlayerShopPacket.spawnHiredMerchant(merchant));
                            chr.setPlayerShop(null);
                            chr.getClient().getChannelServer().writeinitemtosql(chr.getAccountID(), false);

                        } else if (shop.getShopType() == 2) {
                            shop.setOpen(true);
                            shop.setAvailable(true);
                            shop.update();
                        }
                    } else {
                        c.getSession().close();
                    }
                }

                break;
            }

            case SET_ITEMS: {
                final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                final MapleInventoryType ivType = MapleInventoryType.getByType(slea.readByte());
                final Item item = chr.getInventory(ivType).getItem((byte) slea.readShort());
                final short quantity = slea.readShort();
                final byte targetSlot = slea.readByte();

                if (chr.getTrade() != null && item != null) {
                    if ((quantity <= item.getQuantity() && quantity >= 0) || GameConstants.isThrowingStar(item.getItemId()) || GameConstants.isBullet(item.getItemId())) {
                        chr.getTrade().setItems(c, item, targetSlot, quantity);
                    }
                }
                break;
            }
            case SET_MESO: {
                final MapleTrade trade = chr.getTrade();
                if (trade != null) {
                    trade.setMeso(slea.readInt());
                }
                break;
            }
            case PLAYER_SHOP_ADD_ITEM:
            case ADD_ITEM: {
                final MapleInventoryType type = MapleInventoryType.getByType(slea.readByte());
                final byte slot = (byte) slea.readShort();
                final short bundles = slea.readShort(); // How many in a bundle
                final short perBundle = slea.readShort(); // Price per bundle
                final int price = slea.readInt();

                if (price <= 0 || bundles <= 0 || perBundle <= 0) {
                    return;
                }
                final IMaplePlayerShop shop = chr.getPlayerShop();

                if (shop == null || !shop.isOwner(chr) || shop instanceof MapleMiniGame) {
                    return;
                }
                final Item ivItem = chr.getInventory(type).getItem(slot);
                final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                if (ivItem != null) {
                    long check = bundles * perBundle;
                    if (check > 32767 || check <= 0) { //This is the better way to check.
                        return;
                    }
                    final short bundles_perbundle = (short) (bundles * perBundle);
//                    if (bundles_perbundle < 0) { // int_16 overflow
//                        return;
//                    }
                    if (ivItem.getQuantity() >= bundles_perbundle) {
                        final short flag = ivItem.getFlag();
                        if (ItemFlag.UNTRADEABLE.check(flag) || ItemFlag.LOCK.check(flag)) {
                            c.getSession().write(MaplePacketCreator.enableActions());
                            return;
                        }
                        if (ii.isDropRestricted(ivItem.getItemId()) || ii.isAccountShared(ivItem.getItemId())) {
                            if (!(ItemFlag.KARMA_EQ.check(flag) || ItemFlag.KARMA_USE.check(flag))) {
                                c.getSession().write(MaplePacketCreator.enableActions());
                                return;
                            }
                        }
                        if (bundles_perbundle >= 50 && ivItem.getItemId() == 2340000) {
                            c.setMonitored(true); //hack check
                        }
                        if (GameConstants.getLowestPrice(ivItem.getItemId()) > price) {
                            c.getPlayer().dropMessage(1, "The lowest you can sell this for is " + GameConstants.getLowestPrice(ivItem.getItemId()));
                            c.getSession().write(MaplePacketCreator.enableActions());
                            return;
                        }
                        if (GameConstants.isThrowingStar(ivItem.getItemId()) || GameConstants.isBullet(ivItem.getItemId())) {
                            // Ignore the bundles
                            MapleInventoryManipulator.removeFromSlot(c, type, slot, ivItem.getQuantity(), true);

                            final Item sellItem = ivItem.copy();
                            shop.addItem(new MaplePlayerShopItem(sellItem, (short) 1, price));
                        } else {
                            MapleInventoryManipulator.removeFromSlot(c, type, slot, bundles_perbundle, true);

                            final Item sellItem = ivItem.copy();
                            sellItem.setQuantity(perBundle);
                            shop.addItem(new MaplePlayerShopItem(sellItem, bundles, price));
                        }
                        c.getSession().write(PlayerShopPacket.shopItemUpdate(shop));
                        chr.getClient().getChannelServer().writeinitemtosql(chr.getAccountID(), false);
                    }
                }
                break;
            }
            case CONFIRM_TRADE:
            case BUY_ITEM_PLAYER_SHOP:
            case BUY_ITEM_STORE:
            case BUY_ITEM_HIREDMERCHANT: { // Buy and Merchant buy
                if (chr.getTrade() != null) {
                    MapleTrade.completeTrade(chr);
                    break;
                }
                final int item = slea.readByte();
                final short quantity = slea.readShort();
                //slea.skip(4);
                final IMaplePlayerShop shop = chr.getPlayerShop();

                if (shop == null || shop.isOwner(chr) || shop instanceof MapleMiniGame || item >= shop.getItems().size()) {
                    return;
                }
                final MaplePlayerShopItem tobuy = shop.getItems().get(item);
                if (tobuy == null) {
                    return;
                }
                long check = tobuy.bundles * quantity;
                long check2 = tobuy.price * quantity;
                long check3 = tobuy.item.getQuantity() * quantity;
                if (check <= 0 || check2 > 2147483647 || check2 <= 0 || check3 > 32767 || check3 < 0) { //This is the better way to check.
                    return;
                }
                if (tobuy.bundles < quantity || (tobuy.bundles % quantity != 0 && GameConstants.isEquip(tobuy.item.getItemId())) // Buying
                        || chr.getMeso() - (check2) < 0 || chr.getMeso() - (check2) > 2147483647 || shop.getMeso() + (check2) < 0 || shop.getMeso() + (check2) > 2147483647) {
                    return;
                }
                if (quantity >= 50 && tobuy.item.getItemId() == 2340000) {
                    c.setMonitored(true); //hack check
                }
                shop.buy(c, item, quantity);
                shop.broadcastToVisitors(PlayerShopPacket.shopItemUpdate(shop));
                chr.getClient().getChannelServer().writeinitemtosql(shop.getOwnerAccId(), false);
                chr.saveToDB(true, false);
                break;
            }
            case REMOVE_ITEM: {
                slea.skip(1); // ?
                int slot = slea.readShort(); //0
                final IMaplePlayerShop shop = chr.getPlayerShop();

                if (shop == null || !shop.isOwner(chr) || shop instanceof MapleMiniGame || shop.getItems().size() <= 0 || shop.getItems().size() <= slot || slot < 0) {
                    return;
                }
                final MaplePlayerShopItem item = shop.getItems().get(slot);

                if (item != null) {
                    if (item.bundles > 0) {
                        Item item_get = item.item.copy();
                        long check = item.bundles * item.item.getQuantity();
                        if (check < 0 || check > 32767) {
                            return;
                        }
                        item_get.setQuantity((short) check);
                        if (item_get.getQuantity() >= 50 && item.item.getItemId() == 2340000) {
                            c.setMonitored(true); //hack check
                        }
                        if (MapleInventoryManipulator.checkSpace(c, item_get.getItemId(), item_get.getQuantity(), item_get.getOwner())) {
                            MapleInventoryManipulator.addFromDrop(c, item_get, false);
                            item.bundles = 0;
                            shop.removeFromSlot(slot);
                            chr.getClient().getChannelServer().writeinitemtosql(chr.getAccountID(), false);
                        }
                    }
                }
                c.getSession().write(PlayerShopPacket.shopItemUpdate(shop));
                break;
            }
            case MAINTANCE_OFF: {
                final IMaplePlayerShop shop = chr.getPlayerShop();
                if (shop != null && shop instanceof HiredMerchant && shop.isOwner(chr) && shop.isAvailable()) {
                    shop.setOpen(true);
                    shop.removeAllVisitors(-1, -1);
                }
                break;
            }
            case MAINTANCE_ORGANISE: {
                final IMaplePlayerShop imps = chr.getPlayerShop();
                if (imps != null && imps.isOwner(chr) && !(imps instanceof MapleMiniGame)) {
                    for (int i = 0; i < imps.getItems().size(); i++) {
                        if (imps.getItems().get(i).bundles == 0) {
                            imps.getItems().remove(i);
                        }
                    }
                    if (chr.getMeso() + imps.getMeso() > 0) {
                        chr.gainMeso(imps.getMeso(), false);
                        imps.setMeso(0);
                    }
                    c.getSession().write(PlayerShopPacket.shopItemUpdate(imps));
                    chr.getClient().getChannelServer().writeinitemtosql(chr.getAccountID(), false);
                }
                break;
            }
            case CLOSE_MERCHANT: {
                final IMaplePlayerShop merchant = chr.getPlayerShop();
                if (merchant != null && merchant.getShopType() == 1 && merchant.isOwner(chr) && merchant.isAvailable()) {
                    c.getSession().write(PlayerShopPacket.shopErrorMessage(0x14, 0));// 關閉窗口
                    c.getSession().write(MaplePacketCreator.serverNotice(1, "Please visit Fredrick for your items."));
                    c.getSession().write(MaplePacketCreator.enableActions());
                    merchant.removeAllVisitors(-1, -1);
                    chr.setPlayerShop(null);
                    merchant.closeShop(true, true);
                }
                break;
            }
            case ADMIN_STORE_NAMECHANGE: { // Changing store name, only Admin
                // 01 00 00 00
                break;
            }
            case VIEW_MERCHANT_VISITOR: {
                final IMaplePlayerShop merchant = chr.getPlayerShop();
                if (merchant != null && merchant.getShopType() == 1 && merchant.isOwner(chr)) {
                    ((HiredMerchant) merchant).sendVisitor(c);
                }
                break;
            }
            case VIEW_MERCHANT_BLACKLIST: {
                final IMaplePlayerShop merchant = chr.getPlayerShop();
                if (merchant != null && merchant.getShopType() == 1 && merchant.isOwner(chr)) {
                    ((HiredMerchant) merchant).sendBlackList(c);
                }
                break;
            }
            case MERCHANT_BLACKLIST_ADD: {
                final IMaplePlayerShop merchant = chr.getPlayerShop();
                if (merchant != null && merchant.getShopType() == 1 && merchant.isOwner(chr)) {
                    ((HiredMerchant) merchant).addBlackList(slea.readMapleAsciiString());
                }
                break;
            }
            case MERCHANT_BLACKLIST_REMOVE: {
                final IMaplePlayerShop merchant = chr.getPlayerShop();
                if (merchant != null && merchant.getShopType() == 1 && merchant.isOwner(chr)) {
                    ((HiredMerchant) merchant).removeBlackList(slea.readMapleAsciiString());
                }
                break;
            }
            case REQUEST_TIE: {
                final IMaplePlayerShop ips = chr.getPlayerShop();
                if (ips == null || !(ips instanceof MapleMiniGame)) {
                    break;
                }
                final MapleMiniGame game2 = (MapleMiniGame)ips;
                if (game2.isOpen()) {
                    break;
                }
                if (game2.isOwner(chr)) {
                    game2.broadcastToVisitors(PlayerShopPacket.getMiniGameRequestTie(), false);
                }
                else {
                    game2.getMCOwner().getClient().getSession().write(PlayerShopPacket.getMiniGameRequestTie());
                }
                game2.setRequestedTie((int)game2.getVisitorSlot(chr));
                break;
            }
            case ANSWER_TIE: {
                final IMaplePlayerShop ips = chr.getPlayerShop();
                if (ips == null || !(ips instanceof MapleMiniGame)) {
                    break;
                }
                final MapleMiniGame game2 = (MapleMiniGame)ips;
                if (game2.isOpen()) {
                    break;
                }
                if (game2.getRequestedTie() > -1 && game2.getRequestedTie() != game2.getVisitorSlot(chr)) {
                    if (slea.readByte() > 0) {
                        game2.broadcastToVisitors(PlayerShopPacket.getMiniGameResult(game2, 1, game2.getRequestedTie()));
                        game2.nextLoser();
                        game2.setOpen(true);
                        game2.update();
                        game2.checkExitAfterGame();
                    }
                    else {
                        game2.broadcastToVisitors(PlayerShopPacket.getMiniGameDenyTie());
                    }
                    game2.setRequestedTie(-1);
                }
                break;
            }
            case GIVE_UP: {
                final IMaplePlayerShop ips = chr.getPlayerShop();
                if (ips == null || !(ips instanceof MapleMiniGame)) {
                    break;
                }
                final MapleMiniGame game2 = (MapleMiniGame)ips;
                if (game2.isOpen()) {
                    break;
                }
                game2.broadcastToVisitors(PlayerShopPacket.getMiniGameResult(game2, 0, (int)game2.getVisitorSlot(chr)));
                game2.nextLoser();
                game2.setOpen(true);
                game2.update();
                game2.checkExitAfterGame();
                break;
            }
            case REQUEST_REDO: {
                final IMaplePlayerShop ips = chr.getPlayerShop();
                if (ips == null || !(ips instanceof MapleMiniGame)) {
                    break;
                }
                final MapleMiniGame game2 = (MapleMiniGame)ips;
                if (game2.isOpen()) {
                    break;
                }
                if (game2.isOwner(chr)) {
                    game2.broadcastToVisitors(PlayerShopPacket.getMiniGameRequestRedo(), false);
                }
                else {
                    game2.getMCOwner().getClient().getSession().write(PlayerShopPacket.getMiniGameRequestRedo());
                }
                game2.setRequestedTie((int)game2.getVisitorSlot(chr));
                break;
            }
            case ANSWER_REDO: {
                final IMaplePlayerShop ips = chr.getPlayerShop();
                if (ips == null || !(ips instanceof MapleMiniGame)) {
                    break;
                }
                final MapleMiniGame game2 = (MapleMiniGame)ips;
                if (game2.isOpen()) {
                    break;
                }
                if (slea.readByte() > 0) {
                    ips.broadcastToVisitors(PlayerShopPacket.getMiniGameAnswerRedo((int)ips.getVisitorSlot(chr)));
                    game2.nextLoser();
                }
                else {
                    game2.broadcastToVisitors(PlayerShopPacket.getMiniGameDenyTie());
                }
                game2.setRequestedTie(-1);
                break;
            }
            case EXIT_AFTER_GAME: {
                final IMaplePlayerShop ips = chr.getPlayerShop();
                if (ips != null && ips instanceof MapleMiniGame) {
                    MapleMiniGame game = (MapleMiniGame) ips;
                    if (game.isOpen()) {
                        break;
                    }
                    game.setExitAfter(chr);
                    game.broadcastToVisitors(PlayerShopPacket.getMiniGameExitAfter(game.isExitAfter(chr)));
                }
                break;
            }
            case CANCEL_EXIT: {
                final IMaplePlayerShop ips = chr.getPlayerShop();
                if (ips == null || !(ips instanceof MapleMiniGame)) {
                    break;
                }
                final MapleMiniGame game2 = (MapleMiniGame)ips;
                if (game2.isOpen()) {
                    break;
                }
                game2.setExitAfter(chr);
                game2.broadcastToVisitors(PlayerShopPacket.getMiniGameExitAfter(game2.isExitAfter(chr)));
                break;
            }
            case READY:
            case UN_READY: {
                final IMaplePlayerShop ips = chr.getPlayerShop();
                if (ips != null && ips instanceof MapleMiniGame) {
                    final MapleMiniGame game2 = (MapleMiniGame)ips;
                    if (!game2.isOwner(chr) && game2.isOpen()) {
                        game2.setReady((int)game2.getVisitorSlot(chr));
                        game2.broadcastToVisitors(PlayerShopPacket.getMiniGameReady(game2.isReady((int)game2.getVisitorSlot(chr))));
                    }
                    break;
                }
                break;
            }
            case EXPEL: {
                final IMaplePlayerShop ips = chr.getPlayerShop();
                if (ips == null || !(ips instanceof MapleMiniGame)) {
                    break;
                }
                if (!((MapleMiniGame)ips).isOpen()) {
                    break;
                }
                ips.removeAllVisitors(5, 1);
                break;
            }
            case START: {
                final IMaplePlayerShop ips = chr.getPlayerShop();
                if (ips != null && ips instanceof MapleMiniGame) {
                    final MapleMiniGame game2 = (MapleMiniGame)ips;
                    if (game2.isOwner(chr) && game2.isOpen()) {
                        for (int k = 1; k < ips.getSize(); ++k) {
                            if (!game2.isReady(k)) {
                                return;
                            }
                        }
                        game2.setGameType();
                        game2.shuffleList();
                        if (game2.getGameType() == 1) {
                            game2.broadcastToVisitors(PlayerShopPacket.getMiniGameStart(game2.getLoser()));
                        }
                        else {
                            game2.broadcastToVisitors(PlayerShopPacket.getMatchCardStart(game2, game2.getLoser()));
                        }
                        game2.setOpen(false);
                        game2.update();
                    }
                    break;
                }
                break;
            }
            case SKIP: {
                final IMaplePlayerShop ips = chr.getPlayerShop();
                if (ips == null || !(ips instanceof MapleMiniGame)) {
                    break;
                }
                final MapleMiniGame game2 = (MapleMiniGame)ips;
                if (game2.isOpen()) {
                    break;
                }
                ips.broadcastToVisitors(PlayerShopPacket.getMiniGameSkip((int)ips.getVisitorSlot(chr)));
                game2.nextLoser();
                break;
            }
            case MOVE_OMOK: {
                final IMaplePlayerShop ips = chr.getPlayerShop();
                if (ips == null || !(ips instanceof MapleMiniGame)) {
                    break;
                }
                final MapleMiniGame game2 = (MapleMiniGame)ips;
                if (game2.isOpen()) {
                    break;
                }
                game2.setPiece(slea.readInt(), slea.readInt(), (int)slea.readByte(), chr);
                break;
            }
            case SELECT_CARD: {
                final IMaplePlayerShop ips = chr.getPlayerShop();
                if (ips == null || !(ips instanceof MapleMiniGame)) {
                    break;
                }
                final MapleMiniGame game2 = (MapleMiniGame)ips;
                if (game2.isOpen()) {
                    break;
                }
                if (slea.readByte() != game2.getTurn()) {
                    game2.broadcastToVisitors(PlayerShopPacket.shopChat("Omok could not be placed by " + chr.getName() + ". Loser: " + game2.getLoser() + " Visitor: " + (int)game2.getVisitorSlot(chr) + " Turn: " + game2.getTurn(), (int)game2.getVisitorSlot(chr)));
                    return;
                }
                final int slot3 = slea.readByte();
                final int turn = game2.getTurn();
                final int fs = game2.getFirstSlot();
                if (turn == 1) {
                    game2.setFirstSlot(slot3);
                    if (game2.isOwner(chr)) {
                        game2.broadcastToVisitors(PlayerShopPacket.getMatchCardSelect(turn, slot3, fs, turn), false);
                    } else {
                        game2.getMCOwner().getClient().getSession().write(PlayerShopPacket.getMatchCardSelect(turn, slot3, fs, turn));
                    }
                    game2.setTurn(0);
                    return;
                }
                if (fs > 0 && game2.getCardId(fs + 1) == game2.getCardId(slot3 + 1)) {
                    game2.broadcastToVisitors(PlayerShopPacket.getMatchCardSelect(turn, slot3, fs, game2.isOwner(chr) ? 2 : 3));
                    game2.setPoints((int)game2.getVisitorSlot(chr));
                } else {
                    game2.broadcastToVisitors(PlayerShopPacket.getMatchCardSelect(turn, slot3, fs, (int)(game2.isOwner(chr) ? 0 : 1)));
                    game2.nextLoser();
                }
                game2.setTurn(1);
                game2.setFirstSlot(0);
                break;
            }
            default: {
                //some idiots try to send huge amounts of data to this (:
                //System.out.println("Unhandled interaction action by " + chr.getName() + " : " + action + ", " + slea.toString());
                //19 (0x13) - 00 OR 01 -> itemid(maple leaf) ? who knows what this is
                break;
            }
        }
    }
}
