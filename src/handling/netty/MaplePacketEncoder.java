package handling.netty;

import client.MapleClient;
import constants.GameConstants;
import constants.ServerConstants;
import handling.SendPacketOpcode;
import handling.login.LoginServer;
import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.MessageToByteEncoder;
import java.util.concurrent.locks.Lock;
import tools.FileoutputUtil;
import tools.HexTool;
import tools.MapleAESOFB;
import tools.MapleCustomEncryption;
import tools.StringUtil;

public class MaplePacketEncoder extends MessageToByteEncoder<Object> {

    @Override
    protected void encode(ChannelHandlerContext chc, Object message, ByteBuf buffer) throws Exception {
        final MapleClient client = (MapleClient) chc.channel().attr(MapleClient.CLIENT_KEY).get();

        if (client != null) {
            final MapleAESOFB send_crypto = client.getSendCrypto();
            final byte[] inputInitialPacket = ((byte[]) message);
            byte[] input = inputInitialPacket;
            int pHeader = ((input[0]) & 0xFF) + (((input[1]) & 0xFF) << 8);

	    if (ServerConstants.DEBUG) {
	        int packetLen = inputInitialPacket.length;
	        String pHeaderStr = Integer.toHexString(pHeader).toUpperCase();
	        pHeaderStr = StringUtil.getLeftPaddedStr(pHeaderStr, '0', 4);
	        String op = nameOf(pHeader);
	        String Recv = "Servo end sending " + op + " [" + pHeaderStr + "] (" + packetLen + ")\r\n";
	        if (packetLen <= 50000) {
	            //String RecvTo = Recv + HexTool.toString(inputInitialPacket) + "\r\n" + HexTool.toStringFromAscii(inputInitialPacket);//數據包解析
	            String RecvTo = Recv + HexTool.toString(inputInitialPacket);
	            System.out.println(RecvTo + "\r\n");
	        }
	    }
            final byte[] unencrypted = new byte[inputInitialPacket.length];
            System.arraycopy(inputInitialPacket, 0, unencrypted, 0, inputInitialPacket.length); // Copy the input > "unencrypted"
            final byte[] ret = new byte[unencrypted.length + 4]; // Create new bytes with length = "unencrypted" + 4

            final Lock mutex = client.getLock();
            mutex.lock();
            try {
                final byte[] header = send_crypto.getPacketHeader(unencrypted.length);
                MapleCustomEncryption.encryptData(unencrypted); // Encrypting Data
                send_crypto.crypt(unencrypted); // Crypt it with IV
                System.arraycopy(header, 0, ret, 0, 4); // Copy the header > "Ret", first 4 bytes
                System.arraycopy(unencrypted, 0, ret, 4, unencrypted.length); // Copy the unencrypted > "ret"

                buffer.writeBytes(ret);
            } finally {
                mutex.unlock();
            }
        } else { // no client object created yet, send unencrypted (hello)
            byte[] input = (byte[]) message;

            buffer.writeBytes(input);
        }
    }

    private String nameOf(int val) {
        for (SendPacketOpcode op : SendPacketOpcode.values()) {
          if (op.getValue() == val) {
            return op.name();
          }
        }
        return "UNKNOWN";
    }
}
