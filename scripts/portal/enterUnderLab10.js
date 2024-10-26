/*
	名字:	隱藏地圖
	地圖:	傑利麥勒實驗室入口
	描述:	931000630
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() < 5) {
		for (var i = 0; i < 20; i++)
		pi.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300493), new java.awt.Point(-589, -164));
		}
		return true;
}