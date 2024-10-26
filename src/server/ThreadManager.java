package server;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.Executors;
import java.util.concurrent.RejectedExecutionHandler;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class ThreadManager {
    private static final ThreadManager instance = new ThreadManager();
    private ThreadPoolExecutor tpe;

    private ThreadManager() {
        start();
    }

    public static ThreadManager getInstance() {
        return instance;
    }


    private class RejectedExecutionHandlerImpl implements RejectedExecutionHandler {
        @Override
        public void rejectedExecution(Runnable r, ThreadPoolExecutor executor) {
            new Thread(r).start();
        }
    }

    public void newTask(Runnable r) {
        if (tpe == null) {
            throw new IllegalStateException("ThreadPoolExecutor is not initialized. Call start() first.");
        }
        tpe.execute(r);
    }


    public void start() {
        RejectedExecutionHandler reh = new RejectedExecutionHandlerImpl();
        ThreadFactory tf = Executors.defaultThreadFactory();

        tpe = new ThreadPoolExecutor(20, 1000, 77, TimeUnit.SECONDS,
                new ArrayBlockingQueue<>(50), tf, reh);
    }

    public void stop() {
        if (tpe != null) {
            tpe.shutdown();
            try {
                if (!tpe.awaitTermination(5, TimeUnit.MINUTES)) {
                    tpe.shutdownNow();
                }
            } catch (InterruptedException ie) {
                tpe.shutdownNow();
                Thread.currentThread().interrupt();
            }
        }
    }
}
