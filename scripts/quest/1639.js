/*
	名字:	[十字獵人]新的裂縫
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
		if (status > 0) {
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1639)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1639).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("The puzzle is falling together and I think Arkarium is the final piece. If he's messing with time, we're all in a lot of trouble. He could change the entire timeline! He could make us forget that we ever knew each other and we'd never even know it! This isn't looking good...");
			break;
	case 1:
		qm.sendYesNo("Come with me right now?");
		break;
	case 2:
		qm.sendNext("Let's see if we can't get to the bottom of this.");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(1639).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().changeMap(qm.getMap(270000000), qm.getMap(270000000).getPortal(2));
		qm.dispose();
}
}