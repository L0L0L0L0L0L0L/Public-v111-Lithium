/*
	名字:	聯盟的誕生
	地圖:	耶雷弗
	描述:	130000000
*/

var status = -1;

function start(mode, type, selection) {
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
		qm.sendNext("Welcome to the Birth of the Alliance!");
		break;
	case 1:
		qm.dispose();
		Packages.server.quest.MapleQuest.getInstance(1507).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().changeMap(qm.getMap(913050000), qm.getMap(913050000).getPortal(0));
}
}