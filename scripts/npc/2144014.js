/*
	名字:	精靈遊俠
	地圖:	燃燒的廢墟
	描述:	272000310
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
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		if (!cm.getPlayer().itemQuantity(4033082)) {
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31174)).getStatus() == 1) {
			Packages.server.quest.MapleQuest.getInstance(31186).forceStart(cm.getPlayer(), 0, 1);
			Packages.server.quest.MapleQuest.getInstance(31174).forceComplete(cm.getPlayer(), cm.getNpc());
			cm.gainItem(4033082, -1);
			}
			cm.sendNext("(A radiant light poured over Mercedes and the color returned to her face.)");
			break;
	case 1:
		cm.sendPrev("The heroes' are secure, thanks to you. But one thing bothers me...");
		break;
	case 2:
		cm.dispose();
}
}