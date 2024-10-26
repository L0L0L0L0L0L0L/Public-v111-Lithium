/*
	名字:	雖然可愛的模樣也是沒有關係…
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23263)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(23263).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.dispose();
			qm.gainExp(30000);
			qm.gainItem(4032971, -1);
			Packages.server.quest.MapleQuest.getInstance(23263).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeMap(qm.getMap(931050210), qm.getMap(931050210).getPortal(0));
}
}