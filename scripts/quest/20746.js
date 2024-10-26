/*
	名字:	助理
	地圖:	耶雷弗
	描述:	130000000
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20746)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(20746).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(20746).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.sendOk("Did Neinheart send you? Come here and listen closely.");
			break;
	case 1:
		qm.dispose();
}
}