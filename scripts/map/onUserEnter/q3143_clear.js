/*
	名字:	獅子王城
	地圖:	第四座塔
	描述:	211060800
*/

function start() {
	if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3143)).getStatus() == 1) {
		ms.getPlayer().updateInfoQuest(3143, ";expl=1;expl=1");
		ms.getPlayer().updateQuest(ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3143)), true);
		}
		ms.dispose();
}