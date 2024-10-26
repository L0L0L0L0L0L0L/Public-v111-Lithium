package constants;

/*
 * by히니스
 */

public class DojoRankEntry {
    
    final String characterName;
    final long time;
    
    public DojoRankEntry(final String name, final long time) {
        this.characterName = name;
        this.time = time;
    }
    
    public final String getName() {
        return characterName;
    }
    
    public final long getTime() {
        return time;
    }
}
