/*
	名字:	帕必歐
	地圖:	可疑的美髮店
	描述:	931010030
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Due to the monster's obstruction, the exit has been closed."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23979)).getStatus() < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Before leaving here, please go talk to Fabio first."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(310000000), pi.getMap(310000000).getPortal(17)); //埃德爾斯坦
		return true;
}