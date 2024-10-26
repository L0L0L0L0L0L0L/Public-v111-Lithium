/*
	名字:	Mirror3
	地圖:	682010102
	描述:	682010102
*/

function start() {
	var eim = cm.getPlayer().getEventInstance();
	if (eim != null && eim.getProperty("stage").equals("0")) {
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9400643), new java.awt.Point(-53, 37));
		eim.setProperty("stage", 1);
		}
		cm.dispose();
}