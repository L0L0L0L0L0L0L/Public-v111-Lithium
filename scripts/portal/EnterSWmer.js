/*
	名字:	砲台路
	地圖:	六條岔道
	描述:	104020000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24079)).getStatus() != 1) {
		pi.getPlayer().changeMap(pi.getMap(105000000), pi.getMap(105000000).getPortal(6)); //奇幻村
		return true;
		}
	if (pi.getMap(910510400).getCharacters().size() < 1) {
		pi.getMap(910510400).resetFully();
		pi.getPlayer().changeMap(pi.getMap(910510400), pi.getMap(910510400).getPortal(1)); //飄飄的奇幻村
		pi.getPlayer().getMap().spawnNpc(1033225, new java.awt.Point(650, 236));
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(104020000));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "This Story Quest is too busy at the moment. Please try again later."));
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Please try again in a moment, or change channels and try again."));
		return false;
}