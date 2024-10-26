/*
	名字:	黑色袋子
	地圖:	黑色袋子
	描述:	任務消耗品
*/

function start() {
	if (im.getPlayer().getMap().getId() != 922030011) {
		im.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Your mission is to leave this Black Pouch at the entrance of the First Safe. Go to Sky Terrace and look for the First Safe."));
		im.dispose();
		return;
		}
		im.gainItem(2430032, -1);
		im.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300388), new java.awt.Point(im.getPlayer().getPosition()));
		im.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300388), new java.awt.Point(im.getPlayer().getPosition()));
		im.dispose();
}