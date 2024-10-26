/*
	名字:	萬人迷的修煉1
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
		qm.sendNext("You aren't scared, are you? That's probably smart.");
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
		qm.sendAcceptDecline("Combat is the best form of training, I always say. Are you ready to begin?");
		break;
	case 1:
		qm.sendNext("The monsters inside won't hold back, so you shouldn't, either. When you're ready, go into the Training Room and eliminate #r30 OctoPirates#k. I'll be watching.");
		break;
	case 2:
		qm.sendNextPrev("All right, into the first Training Room. Eliminate 30 OctoPirates.");
		break;
	case 3:
		qm.getPlayer().changeMap(qm.getMap(912040100), qm.getMap(912040100).getPortal(1));
		qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2915)).setStatus(1);
		qm.getPlayer().updateQuest(qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2915)), true);
		qm.dispose();
}
}