/*
	名字:	神木村
	地圖:	九靈龍巢穴
	描述:	240040611
*/

function act() {
	rm.getPlayer().getMap().spawnNpc(2081008, new java.awt.Point(rm.getReactor().getPosition()));
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "In a flicker of light the egg has matured and cracked, thus born a radiant baby dragon."));
}