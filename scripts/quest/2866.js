/*
	名字:	吉姆的第三次委託
	地圖:	墮落城市
	描述:	103000000
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2866)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(2866).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
		if (qm.getMap().getAllMonstersThreadsafe().size() > 0) {
			qm.sendOk("There are too many monsters nearby! Eliminate all of them before you pick up the hat.");
			qm.dispose();
			return;
			}
			qm.sendNext("What's this hat?");
			break;
	case 1:
		qm.sendNextPrev("A hat in a place like this...? It looks like it belongs to a subway worker.");
		break;
	case 2:
		qm.sendNextPrev("Did Jake lose this? I'll check in with him before I go back to JM.");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(2866).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.gainExp(464);
		qm.dispose();
}
}