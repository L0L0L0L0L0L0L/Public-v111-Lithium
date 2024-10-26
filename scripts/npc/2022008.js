/*
	名字:	雷克斯
	地圖:	冰雪峽谷4
	描述:	921121000
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3122)).getStatus() != 1) {
		cm.dispose();
		return;
		}
		cm.sendOk("雷克斯封印的情況還算穩定，我最好還是先回去報告下情況。");
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3122)).setCustomData(1);
		cm.getPlayer().updateQuest(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3122)), true);
		cm.dispose();
}