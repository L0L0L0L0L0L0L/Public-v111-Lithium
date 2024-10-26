/*
	名字:	神秘岛
	地圖:	通天塔&amp;lt;16层&gt;
	描述:	200080600
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22566)).getStatus() > 0 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22567)).getStatus() < 2) {
		pi.getPlayer().changeMap(pi.getMap(200080601), pi.getMap(200080601).getPortal(1)); //天空之城塔&amp;lt;16層&gt;
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The entrance was destroyed. It will be difficult to get in."));
		return false;
}