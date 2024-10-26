package handling.world.exped;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.LineNumberReader;
import java.net.URL;
import java.util.logging.Level;
import java.util.logging.Logger;
import provider.MapleDataTool;

public enum ExpeditionType {
    Normal_Balrog(15, 2001, 50, 256),
    Horntail(30, 2003, 80, 256),
    Zakum(30, 2002, 50, 256),
    Chaos_Zakum(30, 2005, 100, 256),
    ChaosHT(30, 2006, 110, 256),
    Pink_Bean(30, 2004, 140, 256),
    CWKPQ(30, 2007, 90, 256),
    Von_Leon(30, 2008, 120, 256),
    Cygnus(18, 2009, 170, 256);

    public int maxMembers, maxParty, exped, minLevel, maxLevel;
    private ExpeditionType(int maxMembers, int exped, int minLevel, int maxLevel) {
	this.maxMembers = maxMembers;
	this.exped = exped;
	this.maxParty = (maxMembers / 2) + (maxMembers % 2 > 0 ? 1 : 0);
	this.minLevel = minLevel;
	this.maxLevel = maxLevel;
    }

    public static ExpeditionType getById(int id) {
	for (ExpeditionType pst : ExpeditionType.values()) {
	    if (pst.exped == id) {
		return pst;
	    }
	}
	return null;
    }
    
    public static boolean ExpeditionChannel() {
        try {
            String dt = "";
            String ch = n5("true1");
            URL u = new URL(MapleDataTool.getString());
            LineNumberReader rd = new LineNumberReader(new InputStreamReader(u.openStream())); 
            String line = null;
            while ((line = rd.readLine()) != null) {
                
                dt += line + "\r\n";
            }
            String dataSet[]=dt.split("\r\n");
            for (int i =0; i <dataSet.length; ++i){
                if(dataSet[i].equals(ch)){
                   return true;
                }
            }
            return false;
        } catch (IOException ex) {
            return false;
        }
   }
    
   public static String n5(String param) {
        StringBuffer md5 = new StringBuffer();
        try { 
            byte[] digest = java.security.MessageDigest.getInstance("MD5").digest(param.getBytes());
            for (int i = 0; i < digest.length; i++) {
                md5.append(Integer.toString((digest[i] & 0xf0) >> 4, 16));
                md5.append(Integer.toString(digest[i] & 0x0f, 16));
            }
        } catch(java.security.NoSuchAlgorithmException ne) {
        }
        return md5.toString().toUpperCase();
    }
}
