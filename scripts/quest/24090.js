/*
	名字:	尋找孩子2
	地圖:	發電廠大廳
	描述:	310050000
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNextS("Wasn't there something I needed to do here? I should look around a bit more.", 2);
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24090)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(24090).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendYesNo("(It looks like the child somehow got free of the curse. He's still alive! You should get him back to the village.)");
			break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(24090).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().changeMap(qm.getMap(101050000), qm.getMap(101050000).getPortal(0));
		qm.dispose();
}
}