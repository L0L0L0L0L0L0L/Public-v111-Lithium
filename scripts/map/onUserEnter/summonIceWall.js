/*
	名字:	龍沉睡的島
	地圖:	寂靜的洞穴
	描述:	914100022
*/

function start() {
	ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300391), new java.awt.Point(30, 130));
	ms.dispose();
}