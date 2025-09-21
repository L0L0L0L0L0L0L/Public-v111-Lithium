package server;

import java.util.HashMap;
import java.util.Map;

public enum ChatType {
    ALL,
    PARTY,
    BUDDY,
    GUILD,
    ALLIANCE,
    SPOUSE,
    WHISPER,
    EXPEDITION,
    MESSENGER,
    TRADE,
    SHOP,
    MEGAPHONE;

    private static final Map<Integer, ChatType> intToChatType = new HashMap<>();

    // chatHandler uses this format
    static {
        intToChatType.put(0, ChatType.BUDDY);
        intToChatType.put(1, ChatType.PARTY);
        intToChatType.put(2, ChatType.GUILD);
        intToChatType.put(3, ChatType.ALLIANCE);
        intToChatType.put(4, ChatType.EXPEDITION);
        intToChatType.put(5, ChatType.SPOUSE);
    }

    public static ChatType fromInt(int value) {
        return intToChatType.getOrDefault(value, ChatType.ALL);
    }
}

