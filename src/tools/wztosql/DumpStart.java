package tools.wztosql;
import server.*;
import server.Timer.*;


public class DumpStart {

    public static final DumpStart instance = new DumpStart();

    public static void main(final String args[]) throws InterruptedException {
        DumpItems.main(args);
        DumpMobSkills.main(args);
        DumpQuests.main(args);
    }
}