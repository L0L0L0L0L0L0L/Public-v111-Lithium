/*
	名字:	獅子王城
	地圖:	第五座塔
	描述:	211061000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3142)).getStatus() == 1 || pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3147)).getStatus() == 1) {
	if (pi.getMap(211061100).getCharacters().size() < 1) {
		pi.getMap(211061100).resetFully();
		pi.getPlayer().changeMap(pi.getMap(211061100), pi.getMap(211061100).getPortal(1)); //亞尼的禁閉室
		pi.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(8210013), new java.awt.Point(717, -580));
		pi.getPlayer().startMapTimeLimitTask(1200, pi.getMap(211061000));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "You cannot access this area."));
		return false;
}