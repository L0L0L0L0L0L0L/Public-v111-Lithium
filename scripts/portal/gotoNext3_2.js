/*
	名字:	獅子王城
	地圖:	第三座塔
	描述:	211060600
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3143)).getStatus() > 1) {
		pi.getPlayer().changeMap(pi.getMap(211060610), pi.getMap(211060610).getPortal(1)); //矮城牆2
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Due to the castle being sealed, the entrance has been closed."));
		return false;
}