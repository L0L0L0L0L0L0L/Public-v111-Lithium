package server;

import client.MapleCharacter;
import client.inventory.Item;
import server.shops.MaplePlayerShopItem;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.*;

public class LogManager {
    private static final String PROPERTIES_FILE = "log.properties";
    private static final BlockingQueue<LogEvent> log = new LinkedBlockingQueue<>();
    private static final ExecutorService threadPool = Executors.newFixedThreadPool(2);
    private static final ConcurrentHashMap<LogType, File> logDirectories = new ConcurrentHashMap<>();
    private static boolean isEnabled = true;
    private static volatile boolean isRunning = true;

    public static void start() {
        Properties properties = new Properties();

        String LOG_DIRECTORY_PATH = "";
        try (FileReader reader = new FileReader(PROPERTIES_FILE)) {
            properties.load(reader);
            String isEnabledProp = properties.getProperty("ENABLED");

            if (isEnabledProp != null && !isEnabledProp.isEmpty()) {
                if (!Objects.equals(isEnabledProp, "true")) {
                    isEnabled = false;
                    System.out.println("Log Manager disabled");
                    return;
                }
            } else {
                throw new IllegalArgumentException("ENABLED is not defined or is empty in " + PROPERTIES_FILE);
            }

            String logPath = properties.getProperty("LOG_FOLDER_PATH");

            if (logPath != null && !logPath.isEmpty()) {
                System.out.println("Log Path: " + logPath);
                LOG_DIRECTORY_PATH = logPath;
            } else {
                throw new IllegalArgumentException("LOG_FOLDER_PATH is not defined or is empty in " + PROPERTIES_FILE);
            }
        } catch (FileNotFoundException e) {
            System.err.println("Properties file not found: " + PROPERTIES_FILE);
            e.printStackTrace();
            throw new RuntimeException("Missing properties file: " + PROPERTIES_FILE, e);
        } catch (IOException e) {
            System.err.println("Error reading properties file: " + PROPERTIES_FILE);
            e.printStackTrace();
            throw new RuntimeException("Failed to load properties from " + PROPERTIES_FILE, e);
        }

        for (LogType type : LogType.values()) {
            File typeDir = new File(LOG_DIRECTORY_PATH + "\\" + type.name().toUpperCase());
            if (!typeDir.exists() && !typeDir.mkdirs()) {
                throw new RuntimeException("Failed to create log directory: " + typeDir.getAbsolutePath());
            }
            logDirectories.put(type, typeDir);
        }

        threadPool.submit(() -> {
            while (isRunning || !log.isEmpty()) {
                try {
                    LogEvent logEvent = log.take();
                    writeLog(logEvent);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    System.out.println("Log processing thread interrupted. Exiting...");
                    break;
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            System.out.println("Log processing thread stopped.");
        });
    }

    public static void stop() {
        isRunning = false;
        threadPool.shutdown();
        try {
            if (!threadPool.awaitTermination(10, TimeUnit.SECONDS)) {
                threadPool.shutdownNow();
            }
        } catch (InterruptedException e) {
            threadPool.shutdownNow();
        }
    }

    private static boolean checkTriggerMesoWarning(int meso) {
        return meso >= 199000000;
    }

    private static boolean checkItemQuantityWarning(int itemId, int quantity) {
        List<Integer> rareItemIds = Arrays.asList(2531000, 2049004, 2049005, 5640000, 5062000, 5062001, 2049100, 2049400);

        return rareItemIds.contains(itemId) && quantity >= 50;
    }

    public static void offerLogEvent(LogEvent logEvent) {
        log.offer(logEvent);
    }

    private static void logIfEnabled(Runnable action) {
        if (isEnabled) {
            action.run();
        }
    }

    private static void writeLog(LogEvent logMessage) {
        logIfEnabled(() -> {
            LogType logType = logMessage.getLogType();
            File logDirectory = logDirectories.get(logType);

            if (logDirectory == null) {
                throw new IllegalArgumentException("Log directory not found for LogType: " + logType);
            }

            String today = new SimpleDateFormat("yyyy-MM-dd").format(logMessage.timestamp());
            File logFile = new File(logDirectory, today + ".txt");

            try (PrintWriter writer = new PrintWriter(new FileWriter(logFile, true), true)) {
                if (logMessage.getLogType() == LogType.VOTE) {
                    writer.println(logMessage.getFormattedVoteLog());
                } else {
                    writer.println(logMessage.getFormattedLog());
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }

    public static void logChat(MapleCharacter player, int mapId, ChatType chatType, String message) {
        logIfEnabled(() -> {
            LogType logType = LogType.CHAT;
            String gmString = player.isGM() ? "[GM]" : "";
            String formattedMsg = "(" + mapId + ")" + " <" + chatType.name() + "> " + gmString + player.getName() + ": " + message;
            offerLogEvent(new LogEvent(formattedMsg, logType, new Date()));
        });
    }

    // FOR WHISPER, GUILD, ALLIANCE
    public static void logChat(MapleCharacter player, int mapId, ChatType chatType, String message, String recipient) {
        logIfEnabled(() -> {
            LogType logType = LogType.CHAT;
            String gmString = player.isGM() ? "[GM]" : "";
            String formattedMsg = "(" + mapId + ")" + " <" + chatType.name() + " to " + recipient + "> " + gmString + player.getName() + ": " + message;
            offerLogEvent(new LogEvent(formattedMsg, logType, new Date()));
        });
    }

    public static void logBuddyChat(MapleCharacter sender, List<String> recipients, String message) {
        logIfEnabled(() -> {
            String gmString = sender.isGM() ? "[GM]" : "";
            String timestamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
            String recipientString = String.join(", ", recipients);
            String senderIP = sender.getClient().getSession().getRemoteAddress().toString();
            String senderMac = sender.getClient().getMacs().toString();

            String formattedMsg = String.format("[%s] <BuddyChat> %s%s → [%s]: %s (IP: %s | MAC: %s)",
                    timestamp,
                    gmString,
                    sender.getName(),
                    recipientString,
                    message,
                    senderIP,
                    senderMac
            );

            offerLogEvent(new LogEvent(formattedMsg, LogType.CHAT, new Date()));
        });
    }

    //TODO make messenger logger

    /**
     * Generic logger, specify type
     */
    public static void log(LogType type, String message) {
        logIfEnabled(() -> {
            offerLogEvent(new LogEvent(message, type, new Date()));
        });
    }

    public static void logTrade(String player1, String player2, List<Item> givenItems, List<Item> receivedItems, int givenMeso, int receivedMeso) {
        logIfEnabled(() -> {
            LogType type = LogType.TRADE;
            MapleItemInformationProvider info = MapleItemInformationProvider.getInstance();
            StringBuilder given = new StringBuilder();

            for (Item item : givenItems) {
                String itemName = info.getName(item.getItemId());
                given.append(itemName).append(" x").append(item.getQuantity()).append(", \n");

                if (LogManager.checkItemQuantityWarning(item.getItemId(), item.getQuantity())) {
                    log(LogType.WARNING, "<TRADE> " + player1 + "-" + player2 + " item: " + itemName + " (" + item.getItemId() + ") quantity: " + item.getQuantity());
                }
            }

            if (given.length() >= 2) {
                given.setLength(given.length() - 2);
            } else {
                given.append("Nothing");
            }

            StringBuilder received = new StringBuilder();

            for (Item item : receivedItems) {
                String uidString = item.getUniqueId() > 0 ? " UID(" + item.getUniqueId() + ")" : "";
                received.append(info.getName(item.getItemId()) + uidString).append(" x").append(item.getQuantity()).append(", \n");

                if (LogManager.checkItemQuantityWarning(item.getItemId(), item.getQuantity())) {
                    log(LogType.WARNING, "<TRADE> " + player1 + "-" + player2 + " item: " + info.getName(item.getItemId()) + " (" + item.getItemId() + ") quantity: " + item.getQuantity());
                }
            }

            if (received.length() >= 2) {
                received.setLength(received.length() - 2);
            } else {
                received.append("Nothing");
            }

            String logMessage = "<TRADE> " + player1 + " traded with " + player2 + ":\n" +
                    "Given meso: " + givenMeso + "\n" +
                    "Received meso: " + receivedMeso + "\n" +
                    "Given items: \n" + given + "\n" +
                    "Received items: \n" + received + "\n";

            offerLogEvent(new LogEvent(logMessage, type, new Date()));
        });
    }

    public static void logStorageAdd(MapleCharacter player, Item item) {
        logIfEnabled(() -> {
            LogType type = LogType.STORAGE;
            String uidString = item.getUniqueId() > 0 ? "UID(" + item.getUniqueId() + ")" : "";
            String itemName = MapleItemInformationProvider.getInstance().getName(item.getItemId());
            String message = player.getName() + " added " + item.getQuantity() + "x " + itemName + "(" + item.getItemId() + ") " + uidString + "to storage. Left in inventory: " + player.getItemQuantity(item.getItemId(), false);

            if (LogManager.checkItemQuantityWarning(item.getItemId(), item.getQuantity())) {
                log(LogType.WARNING, message);
            }

            offerLogEvent(new LogEvent(message, type, new Date()));
        });
    }

    public static void logStorageAdd(MapleCharacter player, int meso) {
        logIfEnabled(() -> {
            LogType type = LogType.STORAGE;
            String message = player.getName() + " added " + meso + " mesos to storage." + " Mesos left: " + player.getMeso();

            if (LogManager.checkTriggerMesoWarning(meso)) {
                log(LogType.WARNING, "<WARNING> " + message);
            }

            offerLogEvent(new LogEvent(message, type, new Date()));
        });
    }

    public static void logStorageRemove(MapleCharacter player, Item item) {
        logIfEnabled(() -> {
            LogType type = LogType.STORAGE;
            String itemName = MapleItemInformationProvider.getInstance().getName(item.getItemId());
            String message = player.getName() + " removed " + item.getQuantity() + "x " + itemName + "(" + item.getItemId() + ") " + "UID(" + item.getUniqueId() + ")" + " from storage. Left in inventory: " + player.getItemQuantity(item.getItemId(), false);

            if (LogManager.checkItemQuantityWarning(item.getItemId(), item.getQuantity())) {
                log(LogType.WARNING, message);
            }

            offerLogEvent(new LogEvent(message, type, new Date()));
        });
    }

    public static void logStorageRemove(MapleCharacter player, int meso) {
        logIfEnabled(() -> {
            LogType type = LogType.STORAGE;
            String message = player.getName() + " removed " + meso + " mesos from storage. Mesos in inventory: " + player.getMeso();

            if (LogManager.checkTriggerMesoWarning(meso)) {
                log(LogType.WARNING, "<WARNING> " + message);
            }

            offerLogEvent(new LogEvent(message, type, new Date()));
        });
    }

    public static void logMerchantOpen(MapleCharacter player, Collection<MaplePlayerShopItem> items) {
        logIfEnabled(() -> {
            LogType type = LogType.HIRED_MERCHANT;
            StringBuilder message = new StringBuilder(player.getName() + " has opened a store with the items: \n");

            for (MaplePlayerShopItem item : items) {
                String itemName = MapleItemInformationProvider.getInstance().getName(item.item.getItemId());
                message.append(itemName).append("(").append(item.item.getItemId()).append(") ");
                message.append("quantity: ").append(item.bundles).append(" | price: ").append(item.price).append(" | bundle: ").append(item.item.getQuantity());
                message.append(" | left in inventory: ").append(player.getItemQuantity(item.item.getItemId(), false));
                message.append("\n");
            }

            offerLogEvent(new LogEvent(message.toString(), type, new Date()));
        });
    }

    public static void logMerchantBuy(MapleCharacter player, int itemId, short quantity, String ownerName, int itemPrice) {
        logIfEnabled(() -> {
            if (player == null) return;

            LogType type = LogType.HIRED_MERCHANT;
            StringBuilder message = new StringBuilder(player.getName() + " has bought " + quantity + " " + MapleItemInformationProvider.getInstance().getName(itemId) + "(" + itemId + ") ");
            message.append("from ").append(ownerName).append("'s store");
            message.append(" for ").append(itemPrice).append(" mesos");
            message.append("\n");

            offerLogEvent(new LogEvent(message.toString(), type, new Date()));
        });
    }

    public static void logMerchantUpdate(MapleCharacter player, Collection<MaplePlayerShopItem> items) {
        logIfEnabled(() -> {
            LogType type = LogType.HIRED_MERCHANT;
            StringBuilder message = new StringBuilder(player.getName() + " has updated their store " + "with the items: \n");

            for (MaplePlayerShopItem item : items) {
                String itemName = MapleItemInformationProvider.getInstance().getName(item.item.getItemId());
                message.append(itemName).append("(").append(item.item.getItemId()).append(") ");
                message.append("quantity: ").append(item.bundles).append(" | price: ").append(item.price).append(" | bundle: ").append(item.item.getQuantity());
                message.append(" | left in inventory: ").append(player.getItemQuantity(item.item.getItemId(), false));
                message.append("\n");
            }

            offerLogEvent(new LogEvent(message.toString(), type, new Date()));
        });
    }

    public static void logFredrickRetrieval(MapleCharacter chr, MerchItemPackage items) {
        logIfEnabled(() -> {
            LogType type = LogType.HIRED_MERCHANT;
            StringBuilder message = new StringBuilder(chr.getName() + " has retrieved " + items.getMesos() + " mesos and the following items from Fredrick: \n");

            for (Item item : items.getItems()) {
                String itemName = MapleItemInformationProvider.getInstance().getName(item.getItemId());
                message.append(itemName).append("(").append(item.getItemId()).append(")").append(item.getQuantity());
                message.append(" | in inventory: ").append(chr.getItemQuantity(item.getItemId(), false));
                message.append("\n");
            }

            offerLogEvent(new LogEvent(message.toString(), type, new Date()));
        });
    }

    public static void logVote(String message) {
        logIfEnabled(() -> {
            LogType type = LogType.VOTE;

            offerLogEvent(new LogEvent(message, type, new Date()));
        });
    }

    public static void logGMDrop(MapleCharacter player, Item item, int droppedQuantity) {
        logIfEnabled(() -> {
            LogType type = LogType.GM;
            String itemName = MapleItemInformationProvider.getInstance().getName(item.getItemId());
            String message = player.getName() + " dropped " + droppedQuantity + "x " + itemName + "(" + item.getItemId() + ")" +
                    " at map " + "(" + player.getMap().getMapName() + ")";

            offerLogEvent(new LogEvent(message, type, new Date()));
        });
    }

    public static void logDonationCommand(String caller, String target, int amount) {
        logIfEnabled(() -> {
            LogType type = LogType.GM;
            String message = target + " has received " + amount + " donation points from GM " + caller;

            offerLogEvent(new LogEvent(message, type, new Date()));
        });
    }

    public static void logBan(MapleCharacter gm, MapleCharacter victim, String reason) {
        logIfEnabled(() -> {
            LogType type = LogType.BAN;
            String message = "<BAN> " + gm.getName() + " has banned " + victim.getName() + ". Reason: " + reason;

            offerLogEvent(new LogEvent(message, type, new Date()));
        });
    }

    public static void logUnban(MapleCharacter gm, String victim) {
        logIfEnabled(() -> {
            LogType type = LogType.BAN;
            String message = "<UNBAN> " + gm.getName() + " has unbanned " + victim;

            offerLogEvent(new LogEvent(message, type, new Date()));
        });
    }

    public static void logAutoBan(MapleCharacter player, String reason) {
        logIfEnabled(() -> {
            LogType type = LogType.BAN;
            String message = "<AUTOBAN> " + player.getName() + ". Reason: " + reason;

            offerLogEvent(new LogEvent(message, type, new Date()));
        });
    }

    public static void logSerialClaim(String accName, String serial) {
        logIfEnabled(() -> {
            LogType type = LogType.DONATION;
            String message = accName + " has succesfully claimed serial key: " + serial;

            offerLogEvent(new LogEvent(message, type, new Date()));
        });
    }
}
