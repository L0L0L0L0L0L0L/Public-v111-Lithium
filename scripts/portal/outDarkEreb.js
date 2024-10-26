/*
	名字:	隱藏地圖
	地圖:	寧靜的耶雷弗
	描述:	913030000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20407)).getStatus() > 1) {
		pi.getPlayer().changeMap(pi.getMap(130000000), pi.getMap(130000000).getPortal(0));
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "By slaying the Black Witch. peace has been restored in Ereve."));
		return true;
		}
		pi.getPlayer().changeMap(pi.getMap(924010100), pi.getMap(924010100).getPortal(0));
		return true;
}