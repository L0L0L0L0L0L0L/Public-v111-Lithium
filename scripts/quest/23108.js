/*
	名字:	第一個任務
	地圖:	反抗者本部
	描述:	310010000
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23108)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(23108).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("Welcome #h0#. As you already know, I'm in charge of Resistance mission assignments.");
			break;
	case 1:
		qm.sendNextPrev("I should actually be a Thief Job instructor, but I've taken this position, since the Resistance doesn't train Thieves.");
		break;
	case 2:
		qm.sendNextPrev("In any case, since I'm in charge of missions, you'll be seeing me more often than even #p2151002#, your job instructor. Now, let's drive those Black Wings out of our territory.");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(23108).forceComplete(qm.getPlayer(), qm.getNpc());
		Packages.server.quest.MapleQuest.getInstance(23129).forceStart(qm.getPlayer(), qm.getNpc(), 1);
		qm.gainExp(500);
		qm.dispose();
}
}