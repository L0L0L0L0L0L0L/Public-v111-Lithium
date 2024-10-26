/*
	名字:	[十字獵人]另一個空間
	地圖:	未接近地區
	描述:	102040600
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
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
		qm.sendYesNo("I bet this weird gate has something to do with all the monsters going crazy. I think we oughtta take a closer look. You ready?");
		break;
	case 1:
		qm.sendNext("I'm counting on you to keep me safe from the big, bad, scary monsters! Let's go!");
		break;
	case 2:
		if (qm.getMap(931050410).getCharacters().size() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1608).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.getMap(931050410).resetFully();
			qm.getPlayer().changeMap(qm.getMap(931050410), qm.getMap(931050410).getPortal(2));
			qm.getPlayer().getMap().spawnNpc(9073000, new java.awt.Point(199, 169));
			qm.getPlayer().startMapTimeLimitTask(600, qm.getMap(102040600));
			qm.dispose();
			return;
			}
			qm.sendNext("Ah, Just wait for a minute.");
			qm.dispose();
}
}