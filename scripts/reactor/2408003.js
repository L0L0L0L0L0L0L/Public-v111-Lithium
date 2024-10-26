/*
	名字:	生命之穴
	地圖:	試煉之穴Ⅰ
	描述:	240060000
*/

function act() {
	var mob1 = rm.getPlayer().getMap().getId() == 240060000 ? 8810024 : 8810128;
	var mob2 = rm.getPlayer().getMap().getId() == 240060100 ? 8810025 : 8810129;
	if (rm.getPlayer().getMap().getId() < 240060002)
		rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(mob1), new java.awt.Point(890, 230));
	else
		rm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(mob2), new java.awt.Point(-360, 230));
}