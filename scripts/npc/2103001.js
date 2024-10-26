/*
	名字:	祕密之壁
	地圖:	納希民宅
	描述:	260000200
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case - 1:
		cm.dispose();
		return;
	case 0:
		if (status < 1) {
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3927)).getStatus() != 1) {
			cm.sendNext("A perfect wall to shade one from the sun.");
			cm.dispose();
			return;
			}
			cm.sendYesNo("The wall may look normal, but if you look closely, there's an interesting symbol on it. Would you like to take a closer look?");
			break;
	case 1:
		cm.sendNext("There are some weird words written on the back of the wall. \r\n\r\n#bIf l had an iron hammer, a dagger, a bow, and an arrow...");
		break;
	case 2:
		cm.dispose();
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3927)).setCustomData(1);
		cm.getPlayer().updateQuest(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3927)), true);
}
}