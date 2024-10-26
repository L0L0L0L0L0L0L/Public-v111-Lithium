/*
	名字:	Mirror1
	地圖:	682010100
	描述:	682010100
*/

function start() {
	var eim = cm.getPlayer().getEventInstance();
	if (eim != null && eim.getProperty("stage").equals("0")) {
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9400641), new java.awt.Point(-53, 37));
		eim.setProperty("stage", 1);
		}
		cm.dispose();
}