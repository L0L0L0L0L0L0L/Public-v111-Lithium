/*
	名字:	隱藏地圖
	地圖:	實驗室入口
	描述:	926130100
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3368)).getStatus() != 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "You cannot access this area."));
		return false;
		}
	if (pi.getMap(926130103).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		return false;
		}
		pi.getMap(926130103).resetFully();
		pi.getPlayer().changeMap(pi.getMap(926130103), pi.getMap(926130103).getPortal(4)); //猶利塔的實驗室3
		pi.getPlayer().startMapTimeLimitTask(1200, pi.getMap(926130100));
		return true;
}