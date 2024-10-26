/*
	名字:	隱藏地圖
	地圖:	突破船甲1
	描述:	925100200
*/

function act() {
	for (var i = 0; i < 3; i++)
	rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300124), new java.awt.Point(rm.getReactor().getPosition()));
	for (var i = 0; i < 3; i++)
	rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300125), new java.awt.Point(rm.getReactor().getPosition()));
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The monster ran out."));
}