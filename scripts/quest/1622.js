/*
	名字:	[十字獵人]沙漠的十字獵人
	地圖:	補給品倉庫
	描述:	931050500
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1622)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1622).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("Good to see you, rookie! Looks like you passed Bastille's test, huh?");
			break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1622)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(1622).forceComplete(qm.getPlayer(), qm.getNpc());
			}
			qm.sendPrev("What a pain. Just don't get in my way!");
			break;
	case 2:
		qm.dispose();
}
}