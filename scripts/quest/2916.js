/*
	名字:	萬人迷的修煉2
	地圖:	訓練場
	描述:	120000104
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("Don't waste my time. Piracy isn't for quitters!");
		qm.dispose();
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
		qm.sendAcceptDecline("Are you ready for something a bit harder?");
		break;
	case 1:
		qm.sendNext("The next wave of monsters may look like OctoPirates, but don't underestimate them or you'll regret it! You're fighting for your life here.");
		break;
	case 2:
		qm.sendNextPrev("Time for the second Training Room, then. Eliminate another 30 #rOctoPirates#k and report back to me.");
		break;
	case 3:
		qm.getPlayer().changeMap(qm.getMap(912040200), qm.getMap(912040200).getPortal(1));
		qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2916)).setStatus(1);
		qm.getPlayer().updateQuest(qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2916)), true);
		qm.dispose();
}
}