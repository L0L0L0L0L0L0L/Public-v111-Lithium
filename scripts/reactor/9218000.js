/*
	名字:	隱藏地圖
	地圖:	空中監獄
	描述:	921160600
*/

function act() {
	for (var i = 0; i < 10; i++)
	rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300452), new java.awt.Point(rm.getReactor().getPosition()));
	for (var i = 0; i < 10; i++)
	rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300453), new java.awt.Point(rm.getReactor().getPosition()));
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The monster has appeared."));
}

//4001528	監獄鑰匙