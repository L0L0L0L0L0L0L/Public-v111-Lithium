/*
	名字:	潘喜的測試4
	地圖:	巨大的樹木
	描述:	101030000
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
		qm.sendYesNo("Let's test nyour skills in a myighty Battle Meow! Are nyou all set? Nyou'll have to beat up #r60 #o9100018#s#k to pass!");
		break;
	case 1:
		qm.sendNext("If myou want to get myout in the middle of the test, just talk to me. Good luck!");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(2772).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(910100140), qm.getMap(910100140).getPortal(0));
		qm.dispose();
}
}