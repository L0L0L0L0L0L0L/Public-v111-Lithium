package tools;

import provider.MapleDataDirectoryEntry;
import provider.MapleDataFileEntry;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;

public class HairAndEye {
    private static int mhair[] = new int[1000];
    private static int fhair[] = new int[1000];
    private static int mface[] = new int[1000];
    private static int fface[] = new int[1000];
    
    public static int[] mHair() {
        return mhair;
    }
    
    public static int[] fHair() {
        return fhair;
    }
    
    public static int[] mFace() {
        return mface;
    }
    
    public static int[] fFace() {
        return fface;
    }
    
    public static void Load() {
        MapleDataProvider hair = MapleDataProviderFactory.getDataProvider(MapleDataProviderFactory.fileInWZPath("Character.wz/Hair"));
        MapleDataProvider face = MapleDataProviderFactory.getDataProvider(MapleDataProviderFactory.fileInWZPath("Character.wz/Face"));
        final MapleDataDirectoryEntry root = hair.getRoot();
        final MapleDataDirectoryEntry root2 = face.getRoot();
        int nu = 0;
        int nu2 = 0;
        int nu3 = 0;
        int nu4 = 0;
        for (MapleDataFileEntry topDir : root.getFiles()) {
            int id = Integer.parseInt(topDir.getName().substring(0, 8));
            if ((id / 1000 == 30 || id / 1000 == 33) && id % 10 == 0) {
                mhair[nu] = id;
                nu++;
            }
            if ((id / 1000 == 31 || id / 1000 == 34) && id % 10 == 0) {
                fhair[nu2] = id;
                nu2++;
            }
        } 
        for (MapleDataFileEntry topDir2 : root2.getFiles()) {
            int id = Integer.parseInt(topDir2.getName().substring(0, 8));
            if ((id / 1000 == 20) && id % 1000 < 100) {
                mface[nu3] = id;
                nu3++;
            } 
            if ((id / 1000 == 21) && id % 1000 < 100) {
                fface[nu4] = id;
                nu4++;
            }
        }
    }
}  