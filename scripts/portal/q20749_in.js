/*
	名字:	玩具城
	地圖:	遺忘的迴廊
	描述:	220070400
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20749)).getStatus() != 1) {
		return false;
		}
	if (pi.getMap(922000030).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		return false;
		}
		pi.getMap(922000030).resetFully();
		pi.getPlayer().changeMap(pi.getMap(922000030), pi.getMap(922000030).getPortal(1));
		pi.getPlayer().startMapTimeLimitTask(1200, pi.getMap(220070400));
		return true;
}