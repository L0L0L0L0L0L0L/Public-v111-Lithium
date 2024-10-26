/*
	名字:	玩具城
	地圖:	遺忘的迴廊
	描述:	220070400
*/

function start() {
	if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20748)).getStatus() == 1) {
		Packages.server.quest.MapleQuest.getInstance(20750).forceStart(ms.getPlayer(), 0, "Complete");
		}
		ms.dispose();
}