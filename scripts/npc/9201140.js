/*
	名字:	Mirror2
	地圖:	682010101
	描述:	682010101
*/

function start() {
	var eim = cm.getPlayer().getEventInstance();
	if (eim != null && eim.getProperty("stage").equals("0")) {
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9400642), new java.awt.Point(-53, 37));
		eim.setProperty("stage", 1);
		}
		cm.dispose();
}