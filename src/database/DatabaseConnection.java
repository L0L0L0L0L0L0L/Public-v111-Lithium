/*
This file is part of the OdinMS Maple Story Server
Copyright (C) 2008 ~ 2010 Patrick Huy <patrick.huy@frz.cc> 
Matthias Butz <matze@odinms.de>
Jan Christian Meyer <vimes@odinms.de>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License version 3
as published by the Free Software Foundation. You may not use, modify
or distribute this program under any other version of the
GNU Affero General Public License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Collection;
import java.util.LinkedList;
import constants.ServerConstants;
import constants.GameConstants;
import server.ServerProperties;
import java.io.PrintStream;

//
public class DatabaseConnection {

  public static final int CLOSE_CURRENT_RESULT = 1;
  public static final int KEEP_CURRENT_RESULT = 2;
  public static final int CLOSE_ALL_RESULTS = 3;
  public static final int SUCCESS_NO_INFO = -2;
  public static final int EXECUTE_FAILED = -3;
  public static final int RETURN_GENERATED_KEYS = 1;
  public static final int NO_GENERATED_KEYS = 2;

       private static ThreadLocal<Connection> con = new ThreadLocalConnection();

    static {
        try {
            Class.forName("com.mysql.jdbc.Driver"); // touch the mysql driver
        } catch (ClassNotFoundException e) {
            System.out.println("[SEVERE] SQL Driver Not Found. Consider death by clams.");
            e.printStackTrace();
        }
    }
        public static final void closeAll() throws SQLException {
        for (final Connection con : ThreadLocalConnection.allConnections) {
	    if (con != null) {
            	con.close();
	    }
        }
    }

    public static Connection getConnection() {
        Connection c = con.get();
        try {
            c.getMetaData();
        } catch (SQLException e) { // connection is dead, therefore discard old object
            con.remove();
            c = con.get();
        }
        return c;
    }

      private static class ThreadLocalConnection extends ThreadLocal<Connection> {
      public static final Collection<Connection> allConnections = new LinkedList<Connection>();

        protected Connection initialValue() {
            try {
                return DriverManager.getConnection(ServerConstants.SQL_URL, ServerConstants.SQL_USER, ServerConstants.SQL_PASSWORD);
            } catch (SQLException e) {
                System.out.println("[SEVERE] Unable to make database connection.");
                e.printStackTrace();
                return null;
            }


        }
      }
}
