/*
	名字:	皇后之路
	地圖:	耶雷弗
	描述:	130000000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20754)).getStatus() == 1) {
		pi.getPlayer().changeMap(pi.getMap(913060000), pi.getMap(913060000).getPortal(2)); //精靈之地
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "You cannot access this area."));
		return false;
}