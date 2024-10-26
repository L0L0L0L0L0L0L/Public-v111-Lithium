/*
	名字:	獅子王城
	地圖:	寂靜的曠野
	描述:	211060000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23272)).getStatus() > 0 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23272)).getCustomData() < 1) {
		pi.getPlayer().changeMap(pi.getMap(921110200), pi.getMap(921110200).getPortal(1)); //城入口
		return true;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3143)).getStatus() > 0) {
		pi.getPlayer().changeMap(pi.getMap(211060010), pi.getMap(211060010).getPortal(1)); //城入口
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "You cannot access this area."));
		return false;
}