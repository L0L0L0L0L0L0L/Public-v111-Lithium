/*
	名字:	第一個導管手把
	地圖:	失蹤煉金術士的家
	描述:	261000001
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3339)).getStatus() < 1) {
		cm.sendOk("The pipe didn't move one bit.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3339)).getCustomData() > 0) {
		cm.sendNext("The pipe handle makes a sharp, shrieking metal noise and returns to its original position. Looks like it was the wrong combination.");
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3339)).setCustomData(0);
		cm.dispose();
		return;
		}
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3339)).setCustomData(1);
		cm.sendNext("The pipe makes a sharp, shrieking metal noise, and turns a little to the right.");
		cm.dispose();
}