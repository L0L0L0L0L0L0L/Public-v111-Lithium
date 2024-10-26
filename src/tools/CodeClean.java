package tools;

import database.DatabaseConnection;
import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.util.logging.Level;
import java.util.logging.Logger;

public class CodeClean {
    public static void main(String args[]) throws IOException {
        try {
            int nu = 0;
            PreparedStatement ps;
            ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM inventoryequipment WHERE potential1 != 0");
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                int p1 = rs.getInt("potential1");
                int p2 = rs.getInt("potential2");
                int p3 = rs.getInt("potential3");
                long id = rs.getLong("inventoryitemid");
                byte stat = getState(p1,p2,p3);
                byte line = (byte) (p2 == 0 ? 2 : 3);
                PreparedStatement ps2 = DatabaseConnection.getConnection().prepareStatement("UPDATE inventoryequipment SET `state` = ?, `lines` = ? WHERE `inventoryitemid` = ?", DatabaseConnection.RETURN_GENERATED_KEYS);
                ps2.setByte(1, stat);
                ps2.setByte(2, line);
                ps2.setLong(3, id);
                ps2.executeUpdate();
                ps2.close();
                nu ++;
            }
            System.out.println(nu + "Cleared potential options.");
            ps.close();
        } catch (SQLException ex) {
            Logger.getLogger(CodeClean.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    public static byte getState(int potential1, int potential2, int potential3) {
        final int pots = potential1 + potential2 + potential3;
        if (potential1 >= 40000 || potential2 >= 40000 || potential3 >= 40000) {
            return 20; // 레전
        } else if (potential1 >= 30000 || potential2 >= 30000 || potential3 >= 30000) {
            return 19; // 유닠
        } else if (potential1 >= 20000 || potential2 >= 20000 || potential3 >= 20000) {
            return 18; // 에픽
        } else if (pots >= 1) {
            return 17; // 레어
        } else if (potential1 == (-17)) {
            return 1; // 레어미확
        } else if (potential1 == (-18)) {
            return 2; // 에픽미확
        } else if (potential1 == (-19)) {
            return 3; // 유닠 미확
        } else if (potential1 == (-20)) {
            return 4; // 레전 미확
        }
        return 0;
    }
}  