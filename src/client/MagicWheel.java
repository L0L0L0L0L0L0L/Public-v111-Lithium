package client;

import java.util.ArrayList;
import java.util.List;
import server.Randomizer;

/**
 *
 * @author TSun
 */
public class MagicWheel {
    private int uniqueid;
    private List<Integer> items = new ArrayList<Integer>();
    private byte random;
    
    public MagicWheel(List<Integer> items) {
        this.uniqueid = Randomizer.nextInt(999999);
        this.items = items;
        this.random = (byte) Randomizer.rand(1, 9);//超過限制會出現空值
    }
    

    public int getItemId(int a) {
        return items.get(a);
    }
    
    public byte getRandom() {
        return random;
    }
    
    public List<Integer> getItems() {
        return items;
    }
    
    public int getUniqueId() {
        return uniqueid;
    }
    
    
}
