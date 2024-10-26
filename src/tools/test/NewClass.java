package tools.test;


import constants.DojoRank;
import constants.GameConstants;
import constants.ServerConstants;
import database.DatabaseConnection;
import handling.RecvPacketOpcode;
import handling.SendPacketOpcode;
import java.io.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import server.Randomizer;
import tools.HairAndEye;

/*
by. 히니스 소스 코드 제작테스트용도
 */

public class NewClass {
    private static Map <Integer, Integer> mhair = new HashMap<Integer, Integer>();
    public static void main(String[] args) throws FileNotFoundException, IOException {
        int id = 5064200;
        if (!GameConstants.isAccessoryScroll(id) && !GameConstants.isChaosScroll(id) && !GameConstants.isCleanSlate(id) && !GameConstants.isEquipScroll(id) && !GameConstants.isPotentialScroll(id) && !GameConstants.isSpecialScroll(id)) {
            System.out.println("false");
        }
    }
}
