/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package tools.packet;

import tools.HexTool;

public class Packet {

    private byte[] data;
    private Runnable onSend;

    public Packet(final byte[] data) {
        this.data = data;
    }

    public final byte[] getBytes() {
        //System.out.println("S : "+toString());
        return data;
    }

    public final Runnable getOnSend() {
        return onSend;
    }

    public void setOnSend(final Runnable onSend) {
        this.onSend = onSend;
    }

    @Override
    public String toString() {
        return HexTool.toString(data);
    }
}
