package server;

import java.text.SimpleDateFormat;
import java.util.Date;

public record LogEvent(String message, LogType type, Date timestamp) {

    public String getFormattedLog() {
        String timestamp = new SimpleDateFormat("HH:mm:ss").format(this.timestamp);
        return "[" + timestamp + "] " + this.message();
    }

    public String getFormattedVoteLog() {
        String timestamp = new SimpleDateFormat("HH:mm:ss").format(this.timestamp);
        return "[" + timestamp + "] \n" + this.message();
    }

    public LogType getLogType() {
        return this.type;
    }
}
