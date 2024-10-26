/*
	名字:	絕半的成功？
	地圖:	秘密廣場
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23265)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(23265).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.dispose();
			qm.gainExp(120000);
			qm.gainItem(4032972, -1);
			Packages.server.quest.MapleQuest.getInstance(23265).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeMap(qm.getMap(931050212), qm.getMap(931050212).getPortal(0));
}
}