/*
	名字:	潘姆之路
	地圖:	农场入口
	描述:	100030400
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2073)).getStatus() == 1) {
		pi.getPlayer().changeMap(pi.getMap(900000000), pi.getMap(900000000).getPortal(0)); //猶塔的肥肥農場
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "This path leads to Utah's Pig Farm. You have no business there right now."));
		return false;
}