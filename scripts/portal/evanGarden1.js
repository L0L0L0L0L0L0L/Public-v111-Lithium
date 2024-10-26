/*
	名字:	猶塔家
	地圖:	前院
	描述:	100030102
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22008)).getStatus() == 1) {
		pi.getPlayer().changeMap(pi.getMap(100030103), pi.getMap(100030103).getPortal(1)); //後院
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "There is nothing to do in the Back Yard."));
		return false;
}