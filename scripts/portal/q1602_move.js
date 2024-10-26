/*
	名字:	隱藏地圖
	地圖:	維修中的列車
	描述:	931050400
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1602)).getStatus() != 1 || (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1602)).getStatus() == 1 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1602)).getMobKills(9300488) > 0)) {
		return false;
		}
	if (pi.getMap(931050402).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		return false;
		}
		pi.getMap(931050402).resetFully();
		pi.getPlayer().changeMap(pi.getMap(931050402), pi.getMap(931050402).getPortal(1)); //空蕩蕩的站台
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(931050400));
		return true;
}