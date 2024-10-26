/*
	名字:	天上的克里塞
	地圖:	競技場入口
	描述:	200101000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31010)).getStatus() > 1) {
		pi.getPlayer().changeMap(pi.getMap(200101100), pi.getMap(200101100).getPortal(1)); //競技場走道1
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "You cannot access this area."));
		return false;
}