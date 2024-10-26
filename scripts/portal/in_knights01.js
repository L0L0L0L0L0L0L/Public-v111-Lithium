/*
	名字:	騎士團要塞
	地圖:	要塞入口
	描述:	271030010
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31124)).getStatus() == 1) {
		pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31124)).setCustomData("end");
		pi.getPlayer().updateQuest(pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31124)), true);
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Security in the Stronghold has been increased. Getting in won't be easy."));
		return false;
}