/*
	名字:	[可重複]外星人主機
	地圖:	新葉城
	描述:	600000000
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28756)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(28756).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(28756).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28756)).setStatus(0);
			qm.gainExp(100000);
			qm.dispose();
}
}