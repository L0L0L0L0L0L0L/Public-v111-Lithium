/*
	名字:	威廉的古堡
	地圖:	水路之迷宮
	描述:	990000630
*/

function act() {
	for (var i = 0; i < 8; i++)
	rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300033), new java.awt.Point(-100, 50));
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The Jr. Gargoyle has appeared."));
}