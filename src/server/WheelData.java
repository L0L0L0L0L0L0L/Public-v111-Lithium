package server;

import database.DatabaseConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import tools.Pair;

/**
 *
 * @author 히니스
 * 
 * 
 */
public class WheelData {
    //Nebulite
    private static Map <Integer, Pair<Integer, Integer>> WheelCache = new HashMap<Integer, Pair<Integer, Integer>>();
    private static Map <Integer, Pair<Integer, Integer>> WheelCache2 = new HashMap<Integer, Pair<Integer, Integer>>();
    private static Map <Integer, Pair<Integer, Integer>> Nebulite1 = new HashMap<Integer, Pair<Integer, Integer>>();

    
    public static Pair<Integer, Integer> getData(int a) {
        if (WheelCache.isEmpty()) {
            LoadCache();
        }
        return WheelCache.get(a);
    }
    
    public static Pair<Integer, Integer> getData2(int a) {
        if (WheelCache2.isEmpty()) {
            LoadCache();
        }
        return WheelCache2.get(a);
    }
    
    public static Pair<Integer, Integer> getNebuliteData(int a) {
        if (Nebulite1.isEmpty()) {
            LoadCache2();
        }
        return Nebulite1.get(a);
    }
    public static int getSize3()  {
        if (Nebulite1.isEmpty()) {
            LoadCache2();
        }
        return Nebulite1.size();
    }
    public static int getSize()  {
        if (WheelCache.isEmpty()) {
            LoadCache();
        }
        return WheelCache.size();
    }
    
    public static int getSize2()  {
        if (WheelCache2.isEmpty()) {
            LoadCache();
        }
        return WheelCache2.size();
    }
    private static void LoadCache2() {
        Connection con = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            con = DatabaseConnection.getConnection();
            ps = (PreparedStatement) con.prepareStatement("SELECT itemid, type FROM `nebulitedata`");
            rs = ps.executeQuery();
            int i = 0;
            while (rs.next()) {
                Nebulite1.put(i, new Pair<Integer, Integer>(rs.getInt("type"), rs.getInt("itemid")));
                i++;
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (ps != null) {
                try {
                    ps.close();
                } catch (Exception e) {
                }
            }
            if (rs != null) {
                try {
                    rs.close();
                } catch (Exception e) {
                }
            }
        }
    }
    private static void LoadCache() {
                Connection con = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            con = DatabaseConnection.getConnection();
            ps = (PreparedStatement) con.prepareStatement("SELECT itemid, type FROM `wheeldata`");
            rs = ps.executeQuery();
            int i = 0;
            while (rs.next()) {
                WheelCache.put(i, new Pair(rs.getInt("type"), rs.getInt("itemid")));
                WheelCache2.put(i, new Pair(rs.getInt("type"), rs.getInt("itemid")));
                i++;
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (ps != null) {
                try {
                    ps.close();
                } catch (Exception e) {
                }
            }
            if (rs != null) {
                try {
                    rs.close();
                } catch (Exception e) {
                }
            }
        }
    }
    
    public static void clearCache() {
        WheelCache.clear();
    }
}
