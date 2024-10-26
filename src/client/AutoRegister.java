package client;

import database.DatabaseConnection;
import handling.world.exped.ExpeditionType;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class AutoRegister {
    
    private static int ENABLE_IP_COUNT = 2;
    public static int checkAccount(MapleClient account, String name, String password) {
        Connection connect = DatabaseConnection.getConnection();
        PreparedStatement query = null;
        ResultSet result = null;
        try {
            query = connect.prepareStatement("SELECT name FROM accounts WHERE name = ?");
            query.setString(1, name);
            result = query.executeQuery();
            
            if (result.next()) {
                return 5;
            }
            query = connect.prepareStatement("SELECT SessionIP FROM accounts WHERE SessionIP = ?");
            query.setString(1, account.getSessionIPAddress());
            result = query.executeQuery();
                        
            if (result.first() == false || (result.last() == true && result.getRow() < ENABLE_IP_COUNT)) {
                return 0;
            } else if (result.getRow() >= ENABLE_IP_COUNT) {
                return 6;
            }
            return 5;
        } catch (Exception error) {
            error.printStackTrace();
        } finally {
            try {
                if (connect != null) {
                    connect = null;
                }
                if (query != null) {
                    query.close();
                }
                if (result != null) {
                    result.close();
                }
            } catch (Exception error) {
            }
        }
        return 5;
    }
    
    //ip를 체크한 후 아이디와 비밀번호를 받고 저장시킴
    public static void registerAccount(MapleClient account, String name, String password) {
        Connection connect = DatabaseConnection.getConnection();
        PreparedStatement query = null;
        ResultSet result = null;
        try {
            query = connect.prepareStatement("INSERT INTO accounts (name, password, SessionIP) VALUES (?, ?, ?)", DatabaseConnection.RETURN_GENERATED_KEYS);
            query.setString(1, name);
            query.setString(2, password);
            query.setString(3, account.getSessionIPAddress());
            query.executeUpdate();
        } catch (Exception error) {
            error.printStackTrace();
        } finally {
            try {
                if (connect != null) {
                    connect = null;
                }
                if (query != null) {
                    query.close();
                }
                if (result != null) {
                    result.close();
                }
            } catch (Exception error) {
            }
        }
    }
}
