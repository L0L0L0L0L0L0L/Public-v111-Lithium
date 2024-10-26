/*
	名字:	墮落城市
	地圖:	秘密據點
	描述:	103000003
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2369)).getStatus() != 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You cannot access this area."));
		return false;
		}
	if (pi.getMap(910350100).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Someone is already in this map, Better come back later."));
		return false;
		}
		pi.getMap(910350100).resetFully();
		pi.getPlayer().changeMap(pi.getMap(910350100), pi.getMap(910350100).getPortal(1)); //前代達克魯的房間
		pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2369)).setCustomData(0);
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(103000003));
		return true;
}