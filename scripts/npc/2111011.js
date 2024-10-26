/*
	名字:	壁
	地圖:	失蹤煉金術士的家
	描述:	261000001
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
		cm.sendNext("In the midst of darkness, there's a wall decorated in spider webs.");
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
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3311)).getStatus() != 1) {
			cm.sendNext("ln the midst of darkness, there's a wall decorated in spider webs.");
			cm.dispose();
			return;
			}
			cm.sendYesNo("Amidst the throng of spider webs, there's a wall behind it that seems to have something written on it. Perhaps you should take a closer look at the wall?");
			break;
	case 1:
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3311)).setCustomData(5);
		cm.getPlayer().updateQuest(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3311)), true);
		cm.sendNext("On a wall full of graffiti, there seems to be a phrase that really stands out above the rest. #bIt's in a form of a pendant...#k What does that mean?");
		break;
	case 2:
		cm.dispose();
}
}