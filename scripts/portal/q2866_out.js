/*
	名字:	隱藏地圖
	地圖:	2號線3區間
	描述:	910310200
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2866)).getStatus() == 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Hunt all the Shades and check out the hat."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(103020410), pi.getMap(103020410).getPortal(3)); //2號線第2區段
		return true;
}