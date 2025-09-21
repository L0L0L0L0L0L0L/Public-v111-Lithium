package server;

import client.MapleCharacter;
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

import java.sql.*;

import database.DatabaseConnection;
import handling.world.family.MapleFamily;
import handling.world.guild.MapleGuild;

import java.util.Calendar;
import java.util.List;
import java.util.TimeZone;
import server.Timer.*;
import server.events.MapleOxQuizFactory;
import server.life.MapleLifeFactory;
import server.life.MapleMonsterInformationProvider;
import server.life.MobSkillFactory;
import server.life.PlayerNPC;
import server.quest.MapleQuest;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;
import tools.HairAndEye;

public class Start {

    public static long startTime = System.currentTimeMillis();
    public static final Start instance = new Start();
    private static final int LOADING_THREADS = Math.max(4, Runtime.getRuntime().availableProcessors());

    private static final ExecutorService loadingExecutor = Executors.newFixedThreadPool(LOADING_THREADS, r -> {
        Thread t = new Thread(r, "LoadingThread");
        t.setDaemon(true);
        return t;
    });

    private static final ScheduledExecutorService maintenanceExecutor =
            Executors.newScheduledThreadPool(2, r -> {
                Thread t = new Thread(r, "MaintenanceThread");
                t.setDaemon(true);
                return t;
            });

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
        System.out.println(YELLOW + "[AutoSaver] Registering optimized AutoSaver..." + RESET);
        Timer.WorldTimer.getInstance().register(new OptimizedAutoSaver(), 1000 * 60 * 3); // 3 minutes
        World.registerRespawn();
        //ChannelServer.getInstance(1).getMapFactory().getMap(910000000).spawnRandDrop(); //start it off
        ShutdownServer.registerMBean();
        //ServerConstants.registerMBean();
        PlayerNPC.loadAll();// touch - so we see database problems early...
        MapleMonsterInformationProvider.getInstance().addExtra();
        LoginServer.setOn(); //now or later
        QuickMove.QuickMoveLoad();
        TimeZone.setDefault(TimeZone.getTimeZone(TIMEZONE));
        RankingWorker.run();
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            playAsciiAnimation();
            System.out.println(BRIGHT_BLACK + "======================" + RESET);
            System.out.println(RED + "v111 is now offline." + RESET);
            System.out.println(BRIGHT_BLACK + "======================" + RESET);
            loadingExecutor.shutdown();
            maintenanceExecutor.shutdown();
        }));
        System.out.println(BRIGHT_BLACK + "=====================================" + RESET);
        System.out.println(BRIGHT_GREEN + "v111.1 is online!" + RESET);
        System.out.printf(BRIGHT_CYAN + "[" + BRIGHT_PURPLE + "Source" + BRIGHT_CYAN + "] " + YELLOW + "Fully Initialized in " + BRIGHT_GREEN + "%.2f" + YELLOW + " seconds" + RESET + "%n", (System.currentTimeMillis() - startTime) / 1000.0);
        System.out.println(BRIGHT_BLACK + "=====================================" + RESET);
        System.out.println(getServerStats());
    }

    private static String getServerStats() {
        int accounts = 0, characters = 0, banned = 0;
        try (java.sql.Connection con = database.DatabaseConnection.getConnection();
             java.sql.PreparedStatement ps1 = con.prepareStatement("SELECT COUNT(*) FROM accounts");
             java.sql.PreparedStatement ps2 = con.prepareStatement("SELECT COUNT(*) FROM characters");
             java.sql.PreparedStatement ps3 = con.prepareStatement("SELECT COUNT(*) FROM accounts WHERE banned = 1")) {
            try (java.sql.ResultSet rs1 = ps1.executeQuery()) {
                if (rs1.next()) accounts = rs1.getInt(1);
            }
            try (java.sql.ResultSet rs2 = ps2.executeQuery()) {
                if (rs2.next()) characters = rs2.getInt(1);
            }
            try (java.sql.ResultSet rs3 = ps3.executeQuery()) {
                if (rs3.next()) banned = rs3.getInt(1);
            }
        } catch (java.sql.SQLException e) {
            return PURPLE + "Error fetching server stats." + RESET;
        }
        return String.format(CYAN + "Accounts: " + YELLOW + "%d" + BRIGHT_PURPLE + "   Characters: " + YELLOW + "%d" + BRIGHT_RED + "   Banned: " + YELLOW + "%d" + RESET, accounts, characters, banned);    }
    
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

    public static class OptimizedAutoSaver implements Runnable {
        private final AtomicInteger saveCounter = new AtomicInteger(0);
        private volatile boolean isRunning = false;

        @Override
        public void run() {
            if (isRunning) {
                System.out.println(YELLOW + "[AutoSaver] Previous autosave still running, skipping this cycle." + RESET);
                return;
            }
            isRunning = true;
            try {
                List<ChannelServer> channels = ChannelServer.getAllInstances();
                int totalPlayers = channels.stream().mapToInt(ch -> ch.getPlayerStorage().getAllCharacters().size()).sum();
                System.out.println(YELLOW + "[AutoSaver] Starting staggered autosave for " + totalPlayers + " characters across " + channels.size() + " channels." + RESET);
                for (int i = 0; i < channels.size(); i++) {
                    final int channelIndex = i;
                    final int totalChannels = channels.size();
                    maintenanceExecutor.schedule(() -> {
                        try {
                            ChannelServer ch = ChannelServer.getAllInstances().get(channelIndex);
                            List<MapleCharacter> characters = ch.getPlayerStorage().getAllCharacters();

                            for (MapleCharacter chr : characters) {
                                SaveThrottler.submit(chr);
                            }
                            System.out.println(CYAN + "[AutoSaver] Channel " + (channelIndex + 1) + "/" + totalChannels + " queued for saving (" + characters.size() + " players)" + RESET);
                            if (channelIndex == totalChannels - 1) {
                                isRunning = false;
                            }
                        } catch (Exception e) {
                            System.err.println("[AutoSaver] Error processing channel " + channelIndex + ": " + e.getMessage());
                            if (channelIndex == totalChannels - 1) {
                                isRunning = false;
                            }
                        }
                    }, i * 10, TimeUnit.SECONDS);
                }
            } catch (Exception e) {
                System.err.println("[AutoSaver] Failed to start autosave: " + e.getMessage());
                isRunning = false;
            }
        }
    }

    private static void playAsciiAnimation() {
        String[] colors = {RED, YELLOW, GREEN, CYAN, BLUE, PURPLE, BRIGHT_RED, BRIGHT_YELLOW, BRIGHT_GREEN};
        String[] frames = new String[11];

        // Generate frames with changing colors
        for (int j = 0; j < frames.length; j++) {
            String ball = colors[j % colors.length] + "●" + RESET;
            frames[j] = BRIGHT_BLUE + "v111 is going offline" + CYAN + ".... " + " ".repeat(j) + ball + " ".repeat(10-j) + RESET;
        }

        try {
            for (int i = 0; i < 3; i++) {
                for (String frame : frames) {
                    System.out.print("\r" + frame);
                    Thread.sleep(150);
                }
                // Reverse direction
                for (int k = frames.length - 2; k > 0; k--) {
                    System.out.print("\r" + frames[k]);
                    Thread.sleep(150);
                }
            }
            System.out.println();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    // Basic colors
    private static final String RESET = "\u001B[0m";
    private static final String BLACK = "\u001B[30m";
    private static final String RED = "\u001B[31m";
    private static final String GREEN = "\u001B[32m";
    private static final String YELLOW = "\u001B[33m";
    private static final String BLUE = "\u001B[34m";
    private static final String PURPLE = "\u001B[35m";
    private static final String CYAN = "\u001B[36m";
    private static final String WHITE = "\u001B[37m";
    // Bright/Bold colors
    private static final String BRIGHT_BLACK = "\u001B[90m";
    private static final String BRIGHT_RED = "\u001B[91m";
    private static final String BRIGHT_GREEN = "\u001B[92m";
    private static final String BRIGHT_YELLOW = "\u001B[93m";
    private static final String BRIGHT_BLUE = "\u001B[94m";
    private static final String BRIGHT_PURPLE = "\u001B[95m";
    private static final String BRIGHT_CYAN = "\u001B[96m";
    private static final String BRIGHT_WHITE = "\u001B[97m";
    // Text styles
    private static final String BOLD = "\u001B[1m";
    private static final String UNDERLINE = "\u001B[4m";
    private static final String ITALIC = "\u001B[3m";
    // Background colors
    private static final String BG_RED = "\u001B[41m";
    private static final String BG_GREEN = "\u001B[42m";
    private static final String BG_YELLOW = "\u001B[43m";
    private static final String BG_BLUE = "\u001B[44m";

    public static void main(final String args[]) throws InterruptedException {
        instance.run();
    }
}
