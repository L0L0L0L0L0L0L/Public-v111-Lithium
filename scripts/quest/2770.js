/*
	名字:	潘喜的測試3
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
		qm.sendYesNo("Myou know the patter nyow, don't you little kitten? Let's test your skills! I'll send nyou to a very special place full of awesome fighting! Nyou better hope nyou can fight #r50 #o9100017#s#k! \r\nAre nyou ready to meowve nyow?");
		break;
	case 1:
		qm.sendNext("If myou want to get myout in the middle of the test, just talk to me. Good luck!");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(2770).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(910100130), qm.getMap(910100130).getPortal(0));
		qm.dispose();
}
}