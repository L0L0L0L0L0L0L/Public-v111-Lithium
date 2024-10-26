/*
	名字:	天上的克里塞
	地圖:	進入競技場內部
	描述:	200101400
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31013)).getStatus() > 0) {
		pi.openNpc(2170006);
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "You cannot access this area."));
		return false;
}