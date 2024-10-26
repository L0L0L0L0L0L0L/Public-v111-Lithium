/*
	名字:	龍沉睡的島
	地圖:	被雪覆蓋的森林
	描述:	914100010
*/

function start() {
	if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22579)).getStatus() > 1 && ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22599)).getStatus() < 1) {
		Packages.server.quest.MapleQuest.getInstance(22599).forceStart(ms.getPlayer(), 0, 1);
		}
		ms.dispose();
}