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

import client.MapleCharacter;
import java.awt.Point;

import client.MapleClient;
import client.MapleQuestStatus;
import client.Skill;
import client.SkillEntry;
import client.SkillFactory;
import constants.GameConstants;
import java.util.HashMap;
import java.util.Map;
import scripting.EventManager;
import scripting.NPCScriptManager;
import server.Randomizer;
import server.MapleItemInformationProvider;
import server.Timer.EventTimer;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.life.OverrideMonsterStats;
import server.quest.MapleQuest;
import server.quest.MapleQuest.MedalQuest;
import tools.FileoutputUtil;
import tools.packet.EtcPacket;
import server.maps.MapleNodes.DirectionInfo;
import static server.maps.SavedLocationType.WORLDTOUR;
import tools.packet.EtcPacket.EffectPacket;
import tools.packet.EtcPacket.UIPacket;
import tools.packet.MaplePacketCreator;
import tools.packet.MobPacket;

public class MapScriptMethods {

    private static final Point witchTowerPos = new Point(-60, 184);

    private static enum onFirstUserEnter {

        onRewordMap,
        Visitor_Cube_poison,
        Visitor_Cube_Hunting_Enter_First,
        VisitorCubePhase00_Start,
        visitorCube_addmobEnter,
        Visitor_Cube_PickAnswer_Enter_First_1,
        visitorCube_medicroom_Enter,
        visitorCube_iceyunna_Enter,
        Visitor_Cube_AreaCheck_Enter_First,
        visitorCube_boomboom_Enter,
        visitorCube_boomboom2_Enter,
        CubeBossbang_Enter,
        NULL;

        private static onFirstUserEnter fromString(String Str) {
            try {
                return valueOf(Str);
            } catch (IllegalArgumentException ex) {
                return NULL;
            }
        }
    };

    private static enum onUserEnter {

        explorationPoint,
        NULL;

        private static onUserEnter fromString(String Str) {
            try {
                return valueOf(Str);
            } catch (IllegalArgumentException ex) {
                return NULL;
            }
        }
    };

    public static void startScript_FirstUser(MapleClient c, String scriptName) {
        if (c.getPlayer() == null) {
            return;
        } //o_O
        int npc = 9010000;
        switch (onFirstUserEnter.fromString(scriptName)) {
            case onRewordMap: {//魔女塔
                reloadWitchTower(c);
                break;
            }
            case Visitor_Cube_poison: {//外星活動地圖
                c.getPlayer().getMap().startMapEffect("Eliminate all the monsters!", 5120039);
                break;
            }
            case Visitor_Cube_Hunting_Enter_First: {//外星活動地圖
                c.getPlayer().getMap().startMapEffect("Eliminate all the Visitors!", 5120039);
                break;
            }
            case VisitorCubePhase00_Start: {//外星活動地圖
                c.getPlayer().getMap().startMapEffect("Eliminate all the flying monsters!", 5120039);
                break;
            }
            case visitorCube_addmobEnter: {//外星活動地圖
                c.getPlayer().getMap().startMapEffect("Eliminate all the monsters by moving around the map!", 5120039);
                break;
            }
            case Visitor_Cube_PickAnswer_Enter_First_1: {//外星活動地圖
                c.getPlayer().getMap().startMapEffect("One of the aliens must have a clue to the way out.", 5120039);
                break;
            }
            case visitorCube_medicroom_Enter: {//外星活動地圖
                c.getPlayer().getMap().startMapEffect("Eliminate all of the Unjust Visitors!", 5120039);
                break;
            }
            case visitorCube_iceyunna_Enter: {//外星活動地圖
                c.getPlayer().getMap().startMapEffect("Eliminate all of the Speedy Visitors!", 5120039);
                break;
            }
            case Visitor_Cube_AreaCheck_Enter_First: {//外星活動地圖
                c.getPlayer().getMap().startMapEffect("The switch at the top of the room requires a heavy weight.", 5120039);
                break;
            }
            case visitorCube_boomboom_Enter: {//外星活動地圖
                c.getPlayer().getMap().startMapEffect("The enemy is powerful! Watch out!", 5120039);
                break;
            }
            case visitorCube_boomboom2_Enter: {//外星活動地圖
                c.getPlayer().getMap().startMapEffect("This Visitor is strong! Be careful!", 5120039);
                break;
            }
            case CubeBossbang_Enter: {//外星活動地圖
                c.getPlayer().getMap().startMapEffect("This is it! Give it your best shot!", 5120039);
                break;
            }
            default: {
                NPCScriptManager.getInstance().startMapScript(c, npc, scriptName, true);
                //System.out.println("존재하지 않는 맵 스크립트 : " + scriptName + ", 타입 : onFirstUserEnter - 맵 ID : " + c.getPlayer().getMapId());
                FileoutputUtil.log(FileoutputUtil.ScriptEx_Log, "Unhandled script : " + scriptName + ", type : onFirstUserEnter - MAPID " + c.getPlayer().getMapId());
                break;
            }
        }
    }

    public static void startScript_User(final MapleClient c, String scriptName) {
        if (c.getPlayer() == null) {
            return;
        } //o_O
        String data = "";
        int npc = 9010000;
        switch (onUserEnter.fromString(scriptName)) {

            default: {
                NPCScriptManager.getInstance().startMapScript(c, npc, scriptName, false);
                //System.out.println("존재하지 않는 맵 스크립트 : " + scriptName + ", 타입 : onUserEnter - 맵 ID : " + c.getPlayer().getMapId());
                FileoutputUtil.log(FileoutputUtil.ScriptEx_Log, "Unhandled script : " + scriptName + ", type : onUserEnter - MAPID " + c.getPlayer().getMapId());
                break;
            }
        }
    }

    private static void reloadWitchTower(MapleClient c) {
        final MapleMap map = c.getPlayer().getMap();
        map.killAllMonsters(false);

        final int level = c.getPlayer().getLevel();
        int mob;
        if (level <= 10) {
            mob = 9300367;
        } else if (level <= 20) {
            mob = 9300368;
        } else if (level <= 30) {
            mob = 9300369;
        } else if (level <= 40) {
            mob = 9300370;
        } else if (level <= 50) {
            mob = 9300371;
        } else if (level <= 60) {
            mob = 9300372;
        } else if (level <= 70) {
            mob = 9300373;
        } else if (level <= 80) {
            mob = 9300374;
        } else if (level <= 90) {
            mob = 9300375;
        } else if (level <= 100) {
            mob = 9300376;
        } else {
            mob = 9300377;
        }
        MapleMonster theMob = MapleLifeFactory.getMonster(mob);
        OverrideMonsterStats oms = new OverrideMonsterStats();
        oms.setOMp(theMob.getMobMaxMp());
        oms.setOExp(theMob.getMobExp());
        oms.setOHp((long) Math.ceil(theMob.getMobMaxHp() * (level / 5.0))); //10k to 4m
        theMob.setOverrideStats(oms);
        map.spawnMonsterOnGroundBelow(theMob, witchTowerPos);
    }
}