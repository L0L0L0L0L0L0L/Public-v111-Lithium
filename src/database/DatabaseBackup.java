package database;

import constants.ServerConstants;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

/**
 *
 * @author 에반테이르
 */
public class DatabaseBackup {
    public static DatabaseBackup instance = null;
    public static DatabaseBackup getInstance() {
        if (instance == null) {
            instance = new DatabaseBackup();
        }
        return instance;
    }
        
    
    public void startTasking() {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日HH時");
            String name = sdf.format(Calendar.getInstance().getTime());
            Process p = null;
            p = Runtime.getRuntime().exec("cmd /C \"C:\\Program Files\\MySQL\\MySQL Server 6.0\\bin\\mysqldump\" -u" + ServerConstants.SQL_USER + " -p" + ServerConstants.SQL_PASSWORD + " " + ServerConstants.Sbname + " > SQL\\dbbackup\\"+name+".sql");
            p.getInputStream().read();
            try {
                p.waitFor();
            } finally {
                p.destroy();
            }
        } catch (IOException e) {
        } catch (Exception e) {
        }
    }   
}
