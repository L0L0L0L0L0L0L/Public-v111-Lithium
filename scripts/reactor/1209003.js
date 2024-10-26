/*
	名字:	隱藏地圖
	地圖:	盲俠的房間
	描述:	912070000
*/

function act() {
	Packages.server.quest.MapleQuest.getInstance(1506).forceStart(rm.getPlayer(), 0, 1);
	rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300491), new java.awt.Point(rm.getReactor().getPosition()));
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "A strange monster has appeared."));
}