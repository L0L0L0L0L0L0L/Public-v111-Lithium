/*
	名字:	骑士团要塞
	地圖:	秘密庭院
	描述:	271030410
*/

function start() {
	ms.getPlayer().getMap().resetFully();
	ms.getPlayer().getMap().startMapEffect("Eliminate the monsters around and rescue Neinheart!", 5120025);
	for (var i = 0; i < 15; i++) {
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(8610016), new java.awt.Point(-480 + (Math.random() * 1000), 130));
	}
	ms.dispose();
}