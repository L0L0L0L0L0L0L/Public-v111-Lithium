/*
	名字:	長相奇怪的石像
	地圖:	傀儡師秘密通路
	描述:	910510100
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
		if (status < 1) {
		cm.sendNext("If you wish to enter the cave, let me know, Master Francis.");
		cm.dispose();
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
		cm.sendYesNo("Welcome, Master Francis. Would you like to be sent to your cave?");
		break;
	case 1:
		cm.sendOk("Thank you, Master Francis.");
		break;
	case 2:
		cm.getMap(910510202).resetFully();
		cm.getPlayer().changeMap(cm.getMap(910510202), cm.getMap(910510202).getPortal(0));
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300346), new java.awt.Point(205, 257));
		cm.dispose();
}
}