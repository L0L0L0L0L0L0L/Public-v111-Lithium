/*
	名字:	隱藏地圖
	地圖:	前往海盜船之路
	描述:	925100000
*/

function act() {
	for (var i = 0; i < 3; i++)
	rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300108), new java.awt.Point(rm.getReactor().getPosition()));
	for (var i = 0; i < 3; i++)
	rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300109), new java.awt.Point(rm.getReactor().getPosition()));
	for (var i = 0; i < 3; i++)
	rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300110), new java.awt.Point(rm.getReactor().getPosition()));
	for (var i = 0; i < 3; i++)
	rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300111), new java.awt.Point(rm.getReactor().getPosition()));
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The monster ran out."));
}