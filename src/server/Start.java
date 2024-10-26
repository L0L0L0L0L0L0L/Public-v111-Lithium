package server;

import client.SkillFactory;
import client.inventory.MapleInventoryIdentifier;
import client.commands.SuperGMCommand;
import constants.BattleConstants;
import constants.QuickMove;
import constants.ServerConstants;
import static constants.ServerConstants.TIMEZONE;
import database.DatabaseBackup;
import handling.MapleServerHandler;
import handling.channel.ChannelServer;
import handling.channel.MapleGuildRanking;
import handling.login.LoginServer;
import handling.cashshop.CashShopServer;
import handling.login.LoginInformationProvider;
import handling.world.World;
import java.sql.SQLException;
import database.DatabaseConnection;
import handling.world.family.MapleFamily;
import handling.world.guild.MapleGuild;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Calendar;
import java.util.TimeZone;
import server.Timer.*;
import server.events.MapleOxQuizFactory;
import server.life.MapleLifeFactory;
import server.life.MapleMonsterInformationProvider;
import server.life.MobSkillFactory;
import server.life.PlayerNPC;
import server.quest.MapleQuest;
import java.util.concurrent.atomic.AtomicInteger;
import tools.HairAndEye;

public class Start {

    public static long startTime = System.currentTimeMillis();
    public static final Start instance = new Start();
    public static AtomicInteger CompletedLoadingThreads = new AtomicInteger(0);

    public void run() throws InterruptedException {
        System.setProperty("net.sf.odinms.wzpath", "wz");
        System.setProperty("polyglot.js.nashorn-compat", "true");
        System.out.println("Deleting and initializing unused data");
        clean();
        Connection con = null;
        PreparedStatement ps = null;
        ServerConstants.loadSetting();//載入外部設置
        try {
            con = DatabaseConnection.getConnection();            
            ps = con.prepareStatement("UPDATE accounts SET loggedin = 0");
            ps.executeUpdate();
        } catch (SQLException ex) {
            throw new RuntimeException("[Error] There was an issue logging out all accounts.");
        } finally {
            if (ps != null) {
                try {
                    ps.close();
                } catch (Exception e) {
                }
            }
        }
        DatabaseBackup.getInstance().startTasking();
        World.init();
        WorldTimer.getInstance().start();
        EtcTimer.getInstance().start();
        MapTimer.getInstance().start();
        CloneTimer.getInstance().start();
        EventTimer.getInstance().start();
        BuffTimer.getInstance().start();
        PingTimer.getInstance().start();
        System.out.print("\r\nLoading server data.......");
        MapleGuildRanking.getInstance().load();
        MapleGuild.loadAll(); //(this); 
        MapleFamily.loadAll(); //(this); 
        MapleLifeFactory.loadQuestCounts();
        MapleQuest.initQuests();
        HairAndEye.Load();
        System.out.print("\r\nLoading [1], please wait.......");
        MapleItemInformationProvider.getInstance().runEtc(); 
        MapleMonsterInformationProvider.getInstance().load(); 
        //BattleConstants.init(); 
        MapleItemInformationProvider.getInstance().runItems(); 
        SkillFactory.load();
        LoginInformationProvider.getInstance();
        RandomRewards.load();
        System.out.print("\r\nLoading [2], please wait.......");
        MapleOxQuizFactory.getInstance();
        MapleCarnivalFactory.getInstance();
        MobSkillFactory.getInstance();
        SpeedRunner.loadSpeedRuns();
        MTSStorage.load();
        System.out.print("\r\nLoading [3], please wait.......");
        MapleInventoryIdentifier.getInstance();
        CashItemFactory.getInstance().initialize(); 
        MapleServerHandler.initiate();
        System.out.print("\r\n");
        LoginServer.run_startup_configurations();
        ChannelServer.startChannel_Main();
        System.out.print("Loading [4], please wait.......");
        CashShopServer.run_startup_configurations();
        CheatTimer.getInstance().register(AutobanManager.getInstance(), 60000);
        Timer.WorldTimer.getInstance().register(new AutoSaver(), 1000 * 60 * 5);
        Runtime.getRuntime().addShutdownHook(new Thread(new Shutdown()));
        World.registerRespawn();
        //ChannelServer.getInstance(1).getMapFactory().getMap(910000000).spawnRandDrop(); //start it off
        ShutdownServer.registerMBean();
        //ServerConstants.registerMBean();
        PlayerNPC.loadAll();// touch - so we see database problems early...
        MapleMonsterInformationProvider.getInstance().addExtra();
        LoginServer.setOn(); //now or later
        QuickMove.QuickMoveLoad();
        TimeZone.setDefault(TimeZone.getTimeZone(TIMEZONE));
        System.out.println("Kerning v111.1 Successfully Launched : < Spend Time " + ((System.currentTimeMillis() - startTime) / 1000) + " second >");
        RankingWorker.run();
    }

    public static class Shutdown implements Runnable {

        @Override
        public void run() {
            ShutdownServer.getInstance().run();
            ShutdownServer.getInstance().run();
        }
    }
    
    public void clean() {
        try {
            int nu = 0;
            PreparedStatement ps;
            Calendar ocal = Calendar.getInstance();
            ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM acheck WHERE day = 1");
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                String key = rs.getString("keya");
                String day = ocal.get(ocal.YEAR) + "" + (ocal.get(ocal.MONTH) + 1) + "" + ocal.get(ocal.DAY_OF_MONTH);
                String da[]= key.split("_");
                if (!da[0].equals(day)) {
                    ps = DatabaseConnection.getConnection().prepareStatement("DELETE FROM acheck WHERE keya = ?");
                    ps.setString(1, key);
                    ps.executeUpdate();
                    nu ++;
                }
            }
            ps.close();
        } catch (SQLException ex) {
        }       
    }

    public static class AutoSaver implements Runnable {
        @Override
        public void run() {
            System.out.println("Auto Saving characters" );

            ChannelServer.getAllInstances().parallelStream().forEach((ch) -> {
                ch.getPlayerStorage().getAllCharacters().parallelStream().forEach((chr) -> {
                    if (chr != null) {
                        chr.saveToDB(false, false);
                    }
                });
            });

        }
    }

    public static void main(final String args[]) throws InterruptedException {
        instance.run();
    }
}
