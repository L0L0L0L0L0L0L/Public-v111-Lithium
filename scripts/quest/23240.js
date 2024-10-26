/*
	名字:	第一次任務
	地圖:	訓練房入口
	描述:	310010010
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23240)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(23240).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("Good to see you, #h0#. I manage missions for the whole Resistance. I think we're going to get to know each other very well.");
			break;
	case 1:
		qm.sendNextPrev("Shall we talk about your first mission? Since you just joined the Resistance, I won't give you anything too difficult. Let me know when you're ready.");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(23240).forceComplete(qm.getPlayer(), qm.getNpc());
		Packages.server.quest.MapleQuest.getInstance(23129).forceStart(qm.getPlayer(), qm.getNpc(), 1);
		qm.gainExp(500);
		qm.dispose();
}
}