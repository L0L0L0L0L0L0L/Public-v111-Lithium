/*
	名字:	外星基地
	地圖:	外星基地走廊
	描述:	610040010
*/

function start() {
	ms.getPlayer().getMap().resetFully();
	ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9400809), new java.awt.Point(500, -433));
	ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9400809), new java.awt.Point(1100, -433));
	ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9400809), new java.awt.Point(500, -193));
	ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9400809), new java.awt.Point(1100, -193));
	ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9400809), new java.awt.Point(500, 47));
	ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9400809), new java.awt.Point(1100, 47));
	ms.dispose();
}