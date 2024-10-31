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
import client.inventory.MapleInventoryType;
import client.inventory.MaplePet;
import constants.GameConstants;
import constants.ServerConstants;
import handling.cashshop.CashShopServer;
import handling.channel.ChannelServer;
import handling.login.LoginServer;
import handling.world.CharacterIdChannelPair;
import handling.world.CharacterTransfer;
import handling.world.MapleMessenger;
import handling.world.MapleMessengerCharacter;
import handling.world.MapleParty;
import handling.world.MaplePartyCharacter;
import handling.world.PartyOperation;
import handling.world.PlayerBuffStorage;
import handling.world.World;
import handling.world.exped.MapleExpedition;
import handling.world.guild.MapleGuild;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import scripting.NPCScriptManager;
import server.maps.FieldLimitType;
import server.maps.MapleMap;
import server.maps.SavedLocationType;
import server.quest.MapleQuest;
import tools.FileoutputUtil;
import tools.packet.EtcPacket;
import tools.Pair;
import tools.Triple;
import tools.data.LittleEndianAccessor;
import tools.packet.MaplePacketCreator;
import tools.packet.MaplePacketCreator.BuddylistPacket;
import tools.packet.MaplePacketCreator.ExpeditionPacket;
import tools.packet.MaplePacketCreator.FamilyPacket;
import tools.packet.MaplePacketCreator.GuildPacket;
import tools.packet.MTSCSPacket;
import tools.packet.PetPacket;

public class InterServerHandler {

    public static final void EnterCS(final MapleClient c, final MapleCharacter chr, final boolean mts, final boolean npc) {
        c.setCs(true);
        if (!chr.isAlive()) {
            c.getSession().write(EtcPacket.serverBlocked(2));
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (mts && chr.getLevel() < 50) {
            chr.dropMessage(1, "You may not enter the Maple Trading System until level 50.");
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (World.getPendingCharacterSize() >= 10) {
            chr.dropMessage(1, "The server is busy at the moment. Please try again in a minute or less.");
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        final ChannelServer ch = ChannelServer.getInstance(c.getChannel());

        chr.changeRemoval();

        if (chr.getMessenger() != null) {
            MapleMessengerCharacter messengerplayer = new MapleMessengerCharacter(chr);
            World.Messenger.leaveMessenger(chr.getMessenger().getId(), messengerplayer);
        }
        PlayerBuffStorage.addBuffsToStorage(chr.getId(), chr.getAllBuffs());
        PlayerBuffStorage.addCooldownsToStorage(chr.getId(), chr.getCooldowns());
        PlayerBuffStorage.addDiseaseToStorage(chr.getId(), chr.getAllDiseases());
        World.ChannelChange_Data(new CharacterTransfer(chr), chr.getId(), mts ? -20 : -10);
        ch.removePlayer(chr);
        c.updateLoginState(MapleClient.CHANGE_CHANNEL, c.getSessionIPAddress());
        chr.saveToDB(false, false);
        chr.getMap().removePlayer(chr);
        String[] socket = c.getChannelServer().getIP().split(":");
        try {
            c.getSession().write(EtcPacket.getChannelChange(InetAddress.getByName(socket[0]), Integer.parseInt(CashShopServer.getIP().split(":")[1])));
        } catch (UnknownHostException ex) {
            Logger.getLogger(InterServerHandler.class.getName()).log(Level.SEVERE, null, ex);
        }
        c.setPlayer(null);
        c.setReceiving(false);
    }

    public static final void EnterMTS(final MapleClient c, final MapleCharacter chr) {
        // Check if the current map is in the blockedMaps list
        for (int i : GameConstants.blockedMaps) {
            if (c.getPlayer().getMapId() == i) {
                c.getPlayer().dropMessage(5, "You may not use this here.");
                c.getSession().write(MaplePacketCreator.enableActions());
                return; // Exit if the player is in a blocked map
            }
        }

        // Check if the player's level is under 10
        if (c.getPlayer().getLevel() < 10) {
            c.getPlayer().dropMessage(5, "You must be over level 10 to use this.");
            c.getSession().write(MaplePacketCreator.enableActions());
            return; // Exit if the player is under level 10
        }

        // If all checks pass, start the NPC script
        NPCScriptManager.getInstance().start(c, 9900002);
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    public static final void Loggedin(final int playerid, final MapleClient c) {
        final ChannelServer channelServer = c.getChannelServer();
        MapleCharacter player;
        final CharacterTransfer transfer = channelServer.getPlayerStorage().getPendingCharacter(playerid);

        if (transfer == null) { // Player isn't in storage, probably isn't CC
            player = MapleCharacter.loadCharFromDB(playerid, c, true);
            Pair<String, String> ip = LoginServer.getLoginAuth(playerid);
            String s = c.getSessionIPAddress();
            if (ip == null || !s.substring(s.indexOf('/') + 1, s.length()).equals(ip.left)) {
                if (ip != null) {
                    LoginServer.putLoginAuth(playerid, ip.left, ip.right);
                }
                c.getSession().close();
                return;
            }
            c.setTempIP(ip.right);
        } else {
            player = MapleCharacter.ReconstructChr(transfer, c, true);
        }
        c.setPlayer(player);
        c.setAccID(player.getAccountID());

        if (!c.CheckIPAddress()) { // Remote hack
            c.getSession().close();
            return;
        }

        final int state = c.getLoginState();
        boolean allowLogin = false;

        if (state == MapleClient.LOGIN_SERVER_TRANSITION || state == MapleClient.CHANGE_CHANNEL || state == MapleClient.LOGIN_NOTLOGGEDIN) {
            allowLogin = !World.isCharacterListConnected(c.loadCharacterNames(c.getWorld()));
        }

        if (!allowLogin) {
            c.setPlayer(null);
            c.getSession().close();
            return;
        }
        c.updateLoginState(MapleClient.LOGIN_LOGGEDIN, c.getSessionIPAddress());

        channelServer.addPlayer(player);

        player.giveCoolDowns(PlayerBuffStorage.getCooldownsFromStorage(player.getId()));
        player.silentGiveBuffs(PlayerBuffStorage.getBuffsFromStorage(player.getId()));
        player.giveSilentDebuff(PlayerBuffStorage.getDiseaseFromStorage(player.getId()));

        if (player.CheckBurning() == 0) {
            player.dropMessage(5, "[Burning] No burning detected in the account,");
            player.dropMessage(5, "Use @burning to obtain it! Reminder: It will only last until Lv120.");
        }

        c.getSession().write(EtcPacket.getCharInfo(player));
        //c.getSession().write(MaplePacketCreator.getPCRoomCheck((byte)2, 74074032));
        c.getSession().write(MTSCSPacket.enableCSUse());

        /*if (player.isGM()) {
         SkillFactory.getSkill(GameConstants.GMS ? 9101004 : 9001004).getEffect(1).applyTo(player);
         }*/
        c.getSession().write(MaplePacketCreator.temporaryStats_Reset()); // .
        player.getMap().addPlayer(player);

        try {
            // Start of buddylist
            final int buddyIds[] = player.getBuddylist().getBuddyIds();
            World.Buddy.loggedOn(player.getName(), player.getId(), c.getChannel(), buddyIds);
            if (player.getParty() != null) {
                final MapleParty party = player.getParty();
                World.Party.updateParty(party.getId(), PartyOperation.LOG_ONOFF, new MaplePartyCharacter(player));

                if (party != null && party.getExpeditionId() > 0) {
                    final MapleExpedition me = World.Party.getExped(party.getExpeditionId());
                    if (me != null) {
                        c.getSession().write(ExpeditionPacket.expeditionStatus(me, false));
                    }
                }
            }

            final CharacterIdChannelPair[] onlineBuddies = World.Find.multiBuddyFind(player.getId(), buddyIds);
            for (CharacterIdChannelPair onlineBuddy : onlineBuddies) {
                player.getBuddylist().get(onlineBuddy.getCharacterId()).setChannel(onlineBuddy.getChannel());
            }
            c.getSession().write(BuddylistPacket.updateBuddylist(player.getBuddylist().getBuddies()));

            // Start of Messenger
            final MapleMessenger messenger = player.getMessenger();
            if (messenger != null) {
                World.Messenger.silentJoinMessenger(messenger.getId(), new MapleMessengerCharacter(c.getPlayer()));
                World.Messenger.updateMessenger(messenger.getId(), c.getPlayer().getName(), c.getChannel());
            }

            // Start of Guild and alliance
            if (player.getGuildId() > 0) {
                World.Guild.setGuildMemberOnline(player.getMGC(), true, c.getChannel());
                c.getSession().write(GuildPacket.showGuildInfo(player));
                final MapleGuild gs = World.Guild.getGuild(player.getGuildId());
                if (gs != null) {
                    final List<byte[]> packetList = World.Alliance.getAllianceInfo(gs.getAllianceId(), true);
                    if (packetList != null) {
                        for (byte[] pack : packetList) {
                            if (pack != null) {
                                c.getSession().write(pack);
                            }
                        }
                    }
                } else { //guild not found, change guild id
                    player.setGuildId(0);
                    player.setGuildRank((byte) 5);
                    player.setAllianceRank((byte) 5);
                    player.saveGuildStatus();
                }
            }

            if (player.getFamilyId() > 0) {
                World.Family.setFamilyMemberOnline(player.getMFC(), true, c.getChannel());
            }
            c.getSession().write(FamilyPacket.getFamilyData());
            c.getSession().write(FamilyPacket.getFamilyInfo(player));
        } catch (Exception e) {
            FileoutputUtil.outputFileError(FileoutputUtil.Login_Error, e);
        }
        player.getClient().getSession().write(MaplePacketCreator.serverMessage(channelServer.getServerMessage()));
        player.sendMacros();
        player.showNote();
        player.sendImp();
        player.updatePartyMemberHP();
        //開始計算角色精靈吊墜時間
        player.startFairySchedule(false);
        player.baseSkills(); //fix people who've lost skills.
        c.getSession().write(MaplePacketCreator.getFamiliarInfo(player));   
        c.getSession().write(EtcPacket.getKeymap(player.getKeyLayout()));
        player.spawnSavedPets();
        //player.setPetAutoHP(player.getPetAutoHP());     
        //player.setPetAutoMP(player.getPetAutoMP());      
        player.expirationTask(true, transfer == null);
        if (player.getJob() == 132) { // DARKKNIGHT
            player.checkBerserk();
        }

        player.spawnClones();
        
        if (player.getStat().equippedSummon > 0) {
            SkillFactory.getSkill(player.getStat().equippedSummon).getEffect(1).applyTo(player);
        }

        MapleQuestStatus stat = player.getQuestNoAdd(MapleQuest.getInstance(GameConstants.PENDANT_SLOT));
        if(stat != null && player.pendants==true){
        c.getSession().write(MaplePacketCreator.pendantSlot(stat != null && stat.getCustomData() != null && Long.parseLong(stat.getCustomData()) > System.currentTimeMillis()));
        player.pendants=false;
        }
        c.getSession().write(MaplePacketCreator.pendantSlot(stat != null && stat.getCustomData() != null && Long.parseLong(stat.getCustomData()) > System.currentTimeMillis()));
        stat = player.getQuestNoAdd(MapleQuest.getInstance(GameConstants.QUICK_SLOT));
        c.getSession().write(EtcPacket.quickSlot(stat != null && stat.getCustomData() != null ? stat.getCustomData() : null));
        player.updatePetAuto();
        player.setPetAutoHP(player.getPetAutoHP());
        player.setPetAutoMP(player.getPetAutoMP());
        for (final MaplePet pet : player.getPets()) {
            if (pet.getSummoned()) {
               player.getClient().getSession().write(PetPacket.showPet(player, pet, false, false));
            }
        }
        player.saveToDB(true,true);  
    }

    public static final void ChangeChannel(final LittleEndianAccessor slea, final MapleClient c, final MapleCharacter chr, final boolean room) {
        if (chr == null || chr.hasBlockedInventory() || chr.getEventInstance() != null || chr.getMap() == null || chr.isInBlockedMap() || FieldLimitType.ChannelSwitch.check(chr.getMap().getFieldLimit())) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (chr.getMapId() == chr.CMap) {
            chr.dropMessage(1, "Channel switching is prohibited in this area.");
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        } 

    if (World.getPendingCharacterSize () 
        >= 10) {
            chr.dropMessage(1, "The server is busy at the moment. Please try again in a less than a minute.");
        c.getSession().write(MaplePacketCreator.enableActions());
        return;
    }
    final int chc = slea.readByte() + 1;
    int mapid = 0;
    if (room

    
        ) {
            mapid = slea.readInt();
    }

    chr.updateTick (slea.readInt

    ());
        if (!World.isChannelAvailable (chc) 
        ) {
            chr.dropMessage(1, "The channel is full at the moment.");
        c.getSession().write(MaplePacketCreator.enableActions());
        return;
    }
    if (room && (mapid< 910000001 || mapid

    
        > 910000022)) {
            chr.dropMessage(1, "The channel is full at the moment.");
        c.getSession().write(MaplePacketCreator.enableActions());
        return;
    }
    if (room

    
        ) {
            if (chr.getMapId() == mapid) {
            if (c.getChannel() == chc) {
                chr.dropMessage(1, "You are already in " + chr.getMap().getMapName());
                c.getSession().write(MaplePacketCreator.enableActions());
            } else { // diff channel
                chr.changeChannel(chc);
            }
        } else { // diff map
            if (c.getChannel() != chc) {
                chr.changeChannel(chc);
            }
            final MapleMap warpz = ChannelServer.getInstance(c.getChannel()).getMapFactory().getMap(mapid);
            if (warpz != null) {
                chr.changeMap(warpz, warpz.getPortal("out00"));
            } else {
                chr.dropMessage(1, "The channel is full at the moment.");
                c.getSession().write(MaplePacketCreator.enableActions());
            }
        }
    }

    
        else {
        MapleQuestStatus stat = chr.getQuestNoAdd(MapleQuest.getInstance(GameConstants.PENDANT_SLOT));
        if(stat != null && chr.pendants==true){
        c.getSession().write(MaplePacketCreator.pendantSlot(stat != null && stat.getCustomData() != null && Long.parseLong(stat.getCustomData()) > System.currentTimeMillis()));
        chr.pendants=false;
        }
            chr.changeChannel(chc);
    }
}
}
