/*
	名字:	影子武士
	地圖:	飄飄的奇幻村
	描述:	910510400
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
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
		cm.sendNext("I've been waiting for you... Mercedes.");
		break;
	case 1:
		cm.sendNextPrevS("Who are you? Why did you send me this letter?", 2);
		break;
	case 2:
		cm.sendNextPrev("You are the rumored master of the Dual Bowguns, a most unique weapon. They say you have tremendous strength! Let's see if the rumors are true...");
		break;
	case 3:
		cm.sendNextPrevS("(Could this man be connected to the Black Wings? This fight is for the honor of the Elves!)", 2);
		break;
	case 4:
		cm.sendNextPrev("If you're as strong as they say, you won't run away! Let's fight!");
		break;
	case 5:
		cm.removeNpc(cm.getPlayer().getMap().getId(), cm.getNpc());
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300431), new java.awt.Point(650, 236));
		cm.dispose();
}
}