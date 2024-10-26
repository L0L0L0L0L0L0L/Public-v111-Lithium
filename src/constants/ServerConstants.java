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
package constants;

import java.util.List;
import java.util.LinkedList;
import server.ServerProperties;



public class ServerConstants {

    public static int expRate = 3;
    public static int dropRate = 1;
    public static int mesoRate = 3;
    public static int questRate = 1;
    public static int cashRate = 1;

    public static boolean adminonly = false;
    public static String serverName = "Kerning";
    public static String serverMassage = "";
    public static String cshopNpc = "9900000";
    public static String eventMessage = "";
    public static String recomMessage = "";

    public static int flag = 0;
    public static int userLimit = 100;
    public static int maxCharacters = 6;
    public static boolean monsterSpawn = false;
    public static boolean DEBUG = false;
    
    public static String event = "";
    
    public static String ip = "25.52.1.26";
    public static String host = "25.52.1.26";
    public static int channelcount = 2;

    public static String TIMEZONE; //時區設定
    
    public static String SQL_URL = "jdbc:mysql://localhost:3306/kerning?autoReconnect=true&characterEncoding=utf8";
    public static String SQL_USER = "root";
    public static String SQL_PASSWORD = "";
   
    public static short text = 90;
    public static boolean TESPIA = false; // true = uses GMS test server, for MSEA it does nothing though
    public static final byte Class_Bonus_EXP(final int job) {
        switch (job) {
            case 501:
            case 530:
            case 531:
            case 532:
            case 2300:
            case 2310:
            case 2311:
            case 2312:
            case 3100:
            case 3110:
            case 3111:
            case 3112:
            case 800:
            case 900:
            case 910:
                return 10;
        }
        return 0;
    }
    // Start of Poll
    public static final boolean PollEnabled = false;
    public static final String Poll_Question = "Are you mudkiz?";
    public static final String[] Poll_Answers = {"test1", "test2", "test3"};
    // End of Poll
    public static final short MAPLE_VERSION = (short) 111;
    public static final String MAPLE_PATCH = "1";
    public static boolean Use_Fixed_IV = false; // true = disable sniffing, false = server can connect to itself
    public static boolean Use_Localhost = false; // true = packets are logged, false = others can connect to server
    public static final int MIN_MTS = 100; //lowest amount an item can be, GMS = 110
    public static final int MTS_BASE = 0; //+amount to everything, GMS = 500, MSEA = 1000
    public static final int MTS_TAX = 5; //+% to everything, GMS = 10
    public static final int MTS_MESO = 10000; //mesos needed, GMS = 5000
    public static final int Equipment_Bonus_EXP = 30; // 아이템레벨?
    public static final int PCRoomPercent = 30;
    public static final String Sbname = "";
    public static final String subVersion = "";
    
    public static void loadSetting() {

    expRate = Integer.parseInt(ServerProperties.getProperty("net.sf.odinms.world.exp"));//經驗倍率
    dropRate = Integer.parseInt(ServerProperties.getProperty("net.sf.odinms.world.dropRate"));//掉落倍率
    mesoRate = Integer.parseInt(ServerProperties.getProperty("net.sf.odinms.world.meso"));//楓幣倍率

    serverName = ServerProperties.getProperty("net.sf.odinms.login.serverName");//伺服器名稱
    adminonly = Boolean.parseBoolean(ServerProperties.getProperty("net.sf.odinms.world.admin", "false"));//GM限制登錄
    serverMassage = ServerProperties.getProperty("net.sf.odinms.world.serverMessage");
    eventMessage = ServerProperties.getProperty("net.sf.odinms.login.eventMessage");

    flag = Integer.parseInt(ServerProperties.getProperty("net.sf.odinms.login.flags"));
    userLimit = Integer.parseInt(ServerProperties.getProperty("net.sf.odinms.login.userlimit"));
    maxCharacters = Integer.parseInt(ServerProperties.getProperty("net.sf.odinms.login.maxCharacters"));
    monsterSpawn = Boolean.parseBoolean(ServerProperties.getProperty("net.sf.odinms.world.monsterSpawn", "false"));
    DEBUG = Boolean.parseBoolean(ServerProperties.getProperty("net.sf.odinms.world.DEBUG", "false"));

    event = ServerProperties.getProperty("net.sf.odinms.channel.events");//事件載入

    ip = ServerProperties.getProperty("net.sf.odinms.world.interface");
    host = ServerProperties.getProperty("net.sf.odinms.world.host");
    channelcount = Integer.parseInt(ServerProperties.getProperty("net.sf.odinms.channel.count"));

    TIMEZONE = ServerProperties.getProperty("net.sf.odinms.world.TIMEZONE", "GMT+8"); //時區設定

    }
    static {
        loadSetting();
    }

    public static enum PlayerGMRank {

        NORMAL('@', 0),
        DONATOR('!', 1),
        SUPERDONATOR('!', 2),
        INTERN('!', 3),
        GM('!', 4),
        SUPERGM('!', 5),
        ADMIN('!', 6);
        private char commandPrefix;
        private int level;

        PlayerGMRank(char ch, int level) {
            commandPrefix = ch;
            this.level = level;
        }

        public char getCommandPrefix() {
            return commandPrefix;
        }

        public int getLevel() {
            return level;
        }
    }

    public static enum CommandType {

        NORMAL(0),
        TRADE(1),
        POKEMON(2);
        private int level;

        CommandType(int level) {
            this.level = level;
        }

        public int getType() {
            return level;
        }
    }
}