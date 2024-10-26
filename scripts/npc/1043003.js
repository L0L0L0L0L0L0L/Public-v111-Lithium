/*
	名字:	藍色酒瓶
	地圖:	墮落城市酒吧
	描述:	103000003
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2358)).getCustomData() != 5) {
		cm.dispose();
		return;
		}
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2358)).setCustomData(211);
		cm.getPlayer().updateQuest(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2358)), true);
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "已安裝完炸彈"));
		cm.dispose();
}