package constants;

/*
 * by히니스
 */

import java.util.ArrayList;
import java.util.List;

public class DojoRank {
    
    private static List<DojoRankEntry> rak = new ArrayList<DojoRankEntry>();
    
    public static void DojoRankLoad() {
        for (int i = 0; i < 41; i++) {
            rak.add(new DojoRankEntry("Dojo"+i, 240)); //임시
        }
    }
    
    public static List<DojoRankEntry> getDojoRank() {
        if (rak.isEmpty()) 
            DojoRankLoad();
        return rak;
    }
}
