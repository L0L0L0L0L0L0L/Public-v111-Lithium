/*
	名字:	埃德爾斯坦
	地圖:	埃德爾斯坦議會
	描述:	310000001
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1616)).getStatus() > 1) {
		pi.getPlayer().changeMap(pi.getMap(931050500), pi.getMap(931050500).getPortal(1)); //補給品倉庫
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "It's just empty space."));
		return false;
}