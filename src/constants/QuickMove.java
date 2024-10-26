package constants;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class QuickMove {
    private static Map<Integer, List<QuickMoveEntry>> quickmoves = new HashMap<Integer, List<QuickMoveEntry>>();
    
    public static void QuickMoveLoad() {
        List<QuickMoveNpc> QuickMap = new ArrayList<QuickMoveNpc>();
                           // Universal, Park, Dock, Market, Technology, Taxi, Store, Store, Brawl
        QuickMap.add(new QuickMoveNpc(100000000, true, true, true, true, true, true, true, true, true));
        QuickMap.add(new QuickMoveNpc(101000000, true, true, true, false, true, true, true, true, true));
        QuickMap.add(new QuickMoveNpc(102000000, true, true, true, true, true, true, true, true, true));
        QuickMap.add(new QuickMoveNpc(103000000, true, true, true, true, true, true, true, true, true));
        QuickMap.add(new QuickMoveNpc(104000000, true, false, true, false, false, true, true, true, true));
        QuickMap.add(new QuickMoveNpc(120000100, true, true, true, true, false, true, true, true, true));
        QuickMap.add(new QuickMoveNpc(200000000, true, true, true, true, true, false, true, true, true));
        QuickMap.add(new QuickMoveNpc(211000000, true, true, false, false, false, true, true, true, true));
        QuickMap.add(new QuickMoveNpc(220000000, true, true, true, true, true, true, true, true, true));
        QuickMap.add(new QuickMoveNpc(221000000, true, true, false, true, true, true, true, true, true));
        QuickMap.add(new QuickMoveNpc(222000000, true, true, false, true, true, false, true, true, true));
        QuickMap.add(new QuickMoveNpc(230000000, true, true, false, true, true, true, true, true, true));
        QuickMap.add(new QuickMoveNpc(240000000, true, true, true, true, true, true, true, true, true));
        QuickMap.add(new QuickMoveNpc(250000000, true, true, true, true, true, false, true, true, true));
        QuickMap.add(new QuickMoveNpc(251000000, true, true, false, true, true, false, true, true, true));
        QuickMap.add(new QuickMoveNpc(260000000, true, true, true, true, true, true, true, true, true));
        QuickMap.add(new QuickMoveNpc(261000000, true, true, false, true, true, true, true, true, true));
        QuickMap.add(new QuickMoveNpc(310000000, true, true, true, true, true, true, true, true, true));
        for (QuickMoveNpc qmtp : QuickMap) {
            List<QuickMoveEntry> asd = new ArrayList<QuickMoveEntry>();
            if (qmtp.npc1) {
                asd.add(new QuickMoveEntry(9010022, 2, 10, "Use the #cDimensional Mirror# to move to a variety of party quests."));
            }
            if (qmtp.npc2) {
                asd.add(new QuickMoveEntry(9071003, 1, 20, "Move to the party zone \n#cMonster Park#, where you can fight against strong monsters with your party members.\n#cOnly Lv. 20 or above can participate in the Monster Park."));
            }
            if (qmtp.npc3) {
                asd.add(new QuickMoveEntry(9000086, 5, 0, "Move to the closest #cIntercontinental Station# to your current location."));
            }
            if (qmtp.npc4) {
                asd.add(new QuickMoveEntry(9000087, 3, 0, "Move to the #cFree Market#, where you can trade items with other users."));
            }
            if (qmtp.npc5) {
                asd.add(new QuickMoveEntry(9000088, 4, 30, "Move to #cArdentmill#, the town of Professions.\n#cOnly Lv. 30 or above can move to Ardentmill"));
            }
            if (qmtp.npc6) {
                int npc = qmtp.mapid < 200000000 ? 9000089 : qmtp.mapid < 230000000 ? 2023000 : qmtp.mapid < 240000000 ? 2060009 : qmtp.mapid < 250000000 ? 2023000 : qmtp.mapid < 270000000 ? 9000090 : 2150007;
                asd.add(new QuickMoveEntry(npc, 6, 0, "Take the #cTaxi# to move to major areas quickly."));
            }
            if (qmtp.npc7) {
                asd.add(new QuickMoveEntry(9010037, 7, 10, "Can be purchased using legendary coins\n#c<Randop's store>#"));
            }
            if (qmtp.npc8) {
                asd.add(new QuickMoveEntry(9010038, 8, 10, "Can be purchased using legendary coins\n#c<Lucia's store>#"));
            }
            if (qmtp.npc9) {
                asd.add(new QuickMoveEntry(9070004, 0, 10, "Move to the Battle Mode zone #cBattle Square#, where you can fight against other users.\n#cLv. 30 or above can participate in Battle Square."));
            }
            quickmoves.put(qmtp.mapid, asd);
        }
    }
    
    
    public static List<QuickMoveEntry> getQuickMoves(int mapid) {
        return quickmoves.get(mapid);
    }
    
    public static class QuickMoveNpc {
        boolean npc1, npc2, npc3, npc4, npc5, npc6, npc7, npc8, npc9;
        int mapid;
        public QuickMoveNpc (int map, boolean npc1, boolean npc2, boolean npc3, boolean npc4, boolean npc5, boolean npc6, boolean npc7, boolean npc8, boolean npc9) {
            this.mapid = map; 
            this.npc1 = npc1; 
            this.npc2 = npc2; 
            this.npc3 = npc3; 
            this.npc4 = npc4; 
            this.npc5 = npc5; 
            this.npc6 = npc6; 
            this.npc7 = npc7; 
            this.npc8 = npc8; 
            this.npc9 = npc9;
        }
    }
}
