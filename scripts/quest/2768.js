/*
	名字:	潘喜的測試2
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
		qm.sendYesNo("As you knyow, training nyever really stops. This time, I'll send myou to a real tough place, with upgraded versions of the #r#o3230100#s#k. Myou'll have to defeat #r40#k of them if myou want to advance. Myou ready?");
		break;
	case 1:
		qm.sendNext("If myou want to get myout in the middle of the test, just talk to me. Good luck!");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(2768).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(910100120), qm.getMap(910100120).getPortal(0));
		qm.dispose();
}
}