/*
	名字:	昭和村
	地圖:	基地內部
	描述:	801040100
*/

function act() {
	rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9400112), new java.awt.Point(458, 160));
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Bodyguard A appeared."));
}