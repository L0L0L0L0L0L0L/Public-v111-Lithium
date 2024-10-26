/*
	名字:	隱密之地
	地圖:	雅典娜禁地&amp;lt;岔路&gt;
	描述:	920010000
*/

function act() {
	rm.getPlayer().getMap().spawnNpc(2013001, new java.awt.Point(rm.getReactor().getPosition()));
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "As the light flickers, someone appears out of the light."));
}