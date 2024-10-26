/*
	名字:	鯨魚號
	地圖:	寢室
	描述:	912060500
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2570)).getStatus() < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Before leaving here, please talk to Cutter first."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(120000100), pi.getMap(120000100).getPortal(13)); //上層走廊
		return true;
}