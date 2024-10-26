/*
	名字:	神殿深處
	地圖:	神祇的黃昏
	描述:	270050100
*/

function act() {
	rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(8820008), new java.awt.Point(rm.getReactor().getPosition()));
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Pink Bean has appeared."));
}