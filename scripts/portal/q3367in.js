/*
	名字:	隱藏地圖
	地圖:	實驗室入口
	描述:	926130100
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3367)).getStatus() != 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "You cannot access this area."));
		return false;
		}
	if (pi.getMap(926130102).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		return false;
		}
		pi.getMap(926130102).resetFully();
		pi.getPlayer().changeMap(pi.getMap(926130102), pi.getMap(926130102).getPortal(1)); //猶利塔的實驗室2
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(926130100));
		return true;
}