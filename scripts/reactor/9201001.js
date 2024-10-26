/*
	名字:	威廉的古堡
	地圖:	威廉公爵之墓
	描述:	990000700
*/

function act() {
	rm.getPlayer().getMap().spawnNpc(9040003, new java.awt.Point(rm.getReactor().getPosition()));
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "A bright flash of light, then someone familiar appears in front of the blocked gate."));
}