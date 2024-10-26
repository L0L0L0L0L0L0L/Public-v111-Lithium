/*
	名字:	隐藏地图
	地圖:	沙漠的角落2
	描述:	926030010
*/

function start() {
	ms.getPlayer().startMapTimeLimitTask(600, ms.getMap(260020300));
	ms.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("Defeat the strange wizard and retrieve the Forbidden Book of Alchemy."));
	ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300457), new java.awt.Point(802, 199));
	ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300457), new java.awt.Point(600, 275));
	ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300458), new java.awt.Point(702, 199));
	ms.dispose();
}