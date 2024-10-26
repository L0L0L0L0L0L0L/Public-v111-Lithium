/*
	名字:	隱密之地
	地圖:	雅典娜禁地&amp;lt;庭園&gt;
	描述:	920010800
*/

function act() {
	rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300049), new java.awt.Point(rm.getReactor().getPosition()));
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The black goddess's cannibal flower has appeared."));
}