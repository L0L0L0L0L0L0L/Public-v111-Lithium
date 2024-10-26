/*
	名字:	神木村
	地圖:	格瑞芬多森林
	描述:	240020101
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20403)).getStatus() > 0 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20404)).getStatus() < 2) {
		pi.getPlayer().changeMap(pi.getMap(240020600), pi.getMap(240020600).getPortal(1)); //偏僻森林
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "You cannot access this area."));
		return false;
}