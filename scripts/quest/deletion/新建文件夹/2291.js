/*
	名字:	VIP地區入場
	地圖:	7層8層 A區域
	描述:	103040400
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2291)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(2291).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("You got the #b#v4032521##k with you, great. Let me show you the way.");
			break;
	case 1:
		qm.gainItem(4032521, -10);
		Packages.server.quest.MapleQuest.getInstance(2291).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().changeMap(qm.getMap(103040440), qm.getMap(103040440).getPortal(1));
		qm.dispose();
}
}