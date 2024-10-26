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

import client.MapleCharacter;
import client.MapleClient;
import client.MapleDisease;
import client.SkillFactory;
import handling.world.MaplePartyCharacter;
import java.util.List;
import server.MapleCarnivalFactory;
import server.MapleCarnivalFactory.MCSkill;
import server.Randomizer;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.life.MobSkillFactory;
import tools.Pair;
import tools.packet.MonsterCarnivalPacket;
import tools.data.LittleEndianAccessor;
import tools.packet.MaplePacketCreator;

public class MonsterCarnivalHandler {

    public static final void MonsterCarnival(LittleEndianAccessor slea, MapleClient c) {
        if (c.getPlayer().getCarnivalParty() == null) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        int tab = slea.readByte();
        
        if (tab == 0) { // 100 CP
            List mobs = c.getPlayer().getMap().getMobsToSpawn();
            int num = MapleCharacter.rand(1, 4); // size should be (int)5
            if ((num >= mobs.size()) || (c.getPlayer().getAvailableCP() < 100)) {
                c.getPlayer().dropMessage(5, "You do not have the CP.");
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            MapleMonster mons = MapleLifeFactory.getMonster(((Integer) ((Pair) mobs.get(num)).left).intValue());
            if ((mons != null) && (c.getPlayer().getMap().makeCarnivalSpawn(c.getPlayer().getCarnivalParty().getTeam(), mons, num))) {
                c.getPlayer().getCarnivalParty().useCP(c.getPlayer(), 100);
                c.getPlayer().CPUpdate(false, c.getPlayer().getAvailableCP(), c.getPlayer().getTotalCP(), 0);
                for (MapleCharacter chr : c.getPlayer().getMap().getCharactersThreadsafe()) {
                    chr.CPUpdate(true, c.getPlayer().getCarnivalParty().getAvailableCP(), c.getPlayer().getCarnivalParty().getTotalCP(), c.getPlayer().getCarnivalParty().getTeam());
                }
                c.getPlayer().getMap().broadcastMessage(MonsterCarnivalPacket.playerSummoned(c.getPlayer().getName(), tab, num));
                c.getSession().write(MaplePacketCreator.enableActions());
            } else {
                c.getPlayer().dropMessage(5, "You may no longer summon the monster.");
                c.getSession().write(MaplePacketCreator.enableActions());
            }
        } else if (tab == 1) { // 200 CP
            if (c.getPlayer().getAvailableCP() < 200) {
                c.getPlayer().dropMessage(5, "You do not have the CP.");
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            int rand = MapleCharacter.rand(1, 20);
            if (rand < 10) {
            SkillFactory.getSkill(80001079).getEffect(SkillFactory.getSkill(80001079).getMaxLevel()).applyTo(c.getPlayer());
            c.getSession().write(MonsterCarnivalPacket.playerSummoned(c.getPlayer().getName(), tab, 0));
            for (MaplePartyCharacter mpc : c.getPlayer().getParty().getMembers()) {
                if (mpc.getId() != c.getPlayer().getId() && mpc.getChannel() == c.getChannel() && mpc.getMapid() == c.getPlayer().getMapId() && mpc.isOnline()) {
                    MapleCharacter mc = c.getPlayer().getMap().getCharacterById(mpc.getId());
                    if (mc != null) {
                        SkillFactory.getSkill(80001079).getEffect(SkillFactory.getSkill(80001079).getMaxLevel()).applyTo(mc);
                        mc.getClient().getSession().write(MonsterCarnivalPacket.playerSummoned(c.getPlayer().getName(), tab, 0));
                    }
                }
            }
            } else {
                for (MapleCharacter chr : c.getPlayer().getMap().getCharactersThreadsafe()) { // should check for null partys but whatever
                    if (chr.getParty() != c.getPlayer().getParty()) {
                        chr.giveDebuff(MapleDisease.BLIND, MobSkillFactory.getMobSkill(136, 1));
                        c.getPlayer().getMap().broadcastMessage(MonsterCarnivalPacket.playerSummoned(c.getPlayer().getName(), tab, 1));
                    }
                }
            }
                c.getPlayer().getCarnivalParty().useCP(c.getPlayer(), 200);
                c.getPlayer().CPUpdate(false, c.getPlayer().getAvailableCP(), c.getPlayer().getTotalCP(), 0);
                for (MaplePartyCharacter mpc : c.getPlayer().getParty().getMembers()) {
                    MapleCharacter mc = c.getPlayer().getMap().getCharacterById(mpc.getId());
                    mc.CPUpdate(true, c.getPlayer().getCarnivalParty().getAvailableCP(), c.getPlayer().getCarnivalParty().getTotalCP(), c.getPlayer().getCarnivalParty().getTeam());
                }
        } else if (tab == 2) { // 300 CP
            if (c.getPlayer().getAvailableCP() < 300) {
                c.getPlayer().dropMessage(5, "You do not have the CP.");
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            int rand = MapleCharacter.rand(1, 20);
            if (rand < 10) {
            SkillFactory.getSkill(80001080).getEffect(SkillFactory.getSkill(80001080).getMaxLevel()).applyTo(c.getPlayer());
            c.getSession().write(MonsterCarnivalPacket.playerSummoned(c.getPlayer().getName(), tab, 2));
            for (MaplePartyCharacter mpc : c.getPlayer().getParty().getMembers()) {
                if (mpc.getId() != c.getPlayer().getId() && mpc.getChannel() == c.getChannel() && mpc.getMapid() == c.getPlayer().getMapId() && mpc.isOnline()) {
                    MapleCharacter mc = c.getPlayer().getMap().getCharacterById(mpc.getId());
                    if (mc != null) {
                        SkillFactory.getSkill(80001080).getEffect(SkillFactory.getSkill(80001080).getMaxLevel()).applyTo(mc);
                        mc.getClient().getSession().write(MonsterCarnivalPacket.playerSummoned(c.getPlayer().getName(), tab, 2));
                    }
                }
            }
            } else {
                for (MapleCharacter chr : c.getPlayer().getMap().getCharactersThreadsafe()) {
                    if (chr.getParty() != c.getPlayer().getParty()) {
                        chr.giveDebuff(MapleDisease.SLOW, MobSkillFactory.getMobSkill(126, 10));
                        c.getPlayer().getMap().broadcastMessage(MonsterCarnivalPacket.playerSummoned(c.getPlayer().getName(), tab, 3));
                    }
                }
            }
                c.getPlayer().getCarnivalParty().useCP(c.getPlayer(), 300);
                c.getPlayer().CPUpdate(false, c.getPlayer().getAvailableCP(), c.getPlayer().getTotalCP(), 0);
                for (MaplePartyCharacter mpc : c.getPlayer().getParty().getMembers()) {
                    MapleCharacter mc = c.getPlayer().getMap().getCharacterById(mpc.getId());
                    mc.CPUpdate(true, c.getPlayer().getCarnivalParty().getAvailableCP(), c.getPlayer().getCarnivalParty().getTotalCP(), c.getPlayer().getCarnivalParty().getTeam());
                }
        } else if (tab == 3) { // 400 CP
            if (c.getPlayer().getAvailableCP() < 400) {
                c.getPlayer().dropMessage(5, "You do not have the CP.");
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            int rand = MapleCharacter.rand(1, 20);
            if (rand < 10) {
            SkillFactory.getSkill(80001081).getEffect(SkillFactory.getSkill(80001081).getMaxLevel()).applyTo(c.getPlayer());
            c.getSession().write(MonsterCarnivalPacket.playerSummoned(c.getPlayer().getName(), tab, 4));
            for (MaplePartyCharacter mpc : c.getPlayer().getParty().getMembers()) {
                if (mpc.getId() != c.getPlayer().getId() && mpc.getChannel() == c.getChannel() && mpc.getMapid() == c.getPlayer().getMapId() && mpc.isOnline()) {
                    MapleCharacter mc = c.getPlayer().getMap().getCharacterById(mpc.getId());
                    if (mc != null) {
                        SkillFactory.getSkill(80001081).getEffect(SkillFactory.getSkill(80001081).getMaxLevel()).applyTo(mc);
                        mc.getClient().getSession().write(MonsterCarnivalPacket.playerSummoned(c.getPlayer().getName(), tab, 4));
                    }
                }
            }
            } else {
                for (MapleCharacter chr : c.getPlayer().getMap().getCharactersThreadsafe()) {
                    if (chr.getParty() != c.getPlayer().getParty()) {
                        chr.giveDebuff(MapleDisease.SEAL, MobSkillFactory.getMobSkill(120, 10));
                        c.getPlayer().getMap().broadcastMessage(MonsterCarnivalPacket.playerSummoned(c.getPlayer().getName(), tab, 5));
                    }
                }
            }
                c.getPlayer().getCarnivalParty().useCP(c.getPlayer(), 400);
                c.getPlayer().CPUpdate(false, c.getPlayer().getAvailableCP(), c.getPlayer().getTotalCP(), 0);
                for (MaplePartyCharacter mpc : c.getPlayer().getParty().getMembers()) {
                    MapleCharacter mc = c.getPlayer().getMap().getCharacterById(mpc.getId());
                    mc.CPUpdate(true, c.getPlayer().getCarnivalParty().getAvailableCP(), c.getPlayer().getCarnivalParty().getTotalCP(), c.getPlayer().getCarnivalParty().getTeam());
                }
            }
        c.getSession().write(MaplePacketCreator.enableActions());
    }
}