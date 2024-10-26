/*
	名字:	第三個導管手把
	地圖:	失蹤煉金術士的家
	描述:	261000001
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3339)).getStatus() < 1) {
		cm.sendOk("The pipe didn't move one bit.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3339)).getCustomData() != 1) {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3339)).getCustomData() == 2) {
		cm.sendNext("The sequence may have been incorrect, as the pipe handle made a sharp, shrieking metal noise and returned to its original position. May have to start over from scratch.");
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3339)).setCustomData(0);
		cm.dispose();
		return;
		}
		cm.sendNext("The sequence may have been incorrect. The pipe remains still.");
		cm.dispose();
		return;
		}
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3339)).setCustomData(2);
		cm.sendNext("The pipe makes a sharp, shrieking metal noise, and turns a little to the left.");
		cm.dispose();
}