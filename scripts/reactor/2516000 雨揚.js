/*
	名字:	隱藏地圖
	地圖:	海賊王的最後
	描述:	925100500
*/

function act() {
	rm.getPlayer().getMap().spawnNpc(2094001, new java.awt.Point(rm.getReactor().getPosition()));
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "As Lord Pirate dies, Wu Yang is released!"));
}