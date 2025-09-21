package server;

import client.MapleCharacter;

import java.util.Set;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.LinkedBlockingQueue;

public class SaveThrottler {
    private static final BlockingQueue<Runnable> saveQueue = new LinkedBlockingQueue<>();
    private static final Set<Integer> pendingSaves = ConcurrentHashMap.newKeySet();
    private static final Thread worker;

    static {
        worker = new Thread(() -> {
            while (true) {
                try {
                    Runnable task = saveQueue.take();
                    task.run();
                    Thread.sleep(25);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    break;
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }, "SaveThrottler-Worker");
        worker.setDaemon(true);
        worker.start();
    }

    public static int getQueueSize() {
        return saveQueue.size();
    }

    public static int getPendingCount() {
        return pendingSaves.size();
    }

    public static void submit(MapleCharacter chr) {
        if (chr != null && pendingSaves.add(chr.getId())) {
            saveQueue.offer(() -> {
                try {
                    chr.saveToDB(false, false);
                } catch (Exception e) {
                    System.err.println("Failed to save " + chr.getName());
                } finally {
                    pendingSaves.remove(chr.getId());
                }
            });
        }
    }
}

