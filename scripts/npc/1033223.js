/*
	名字:	普蘭西斯
	地圖:	受到攻擊的弓箭手村右側
	描述:	910080010
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
		cm.sendNext("Hey! You're Mercedes, right?");
		break;
	case 1:
		cm.sendNextPrevS("...Huh? Who is this child?", 2);
		break;
	case 2:
		cm.sendNextPrev("Ch-child! Shut it! Athena Pierce'll never see you again!");
		break;
	case 3:
		cm.removeNpc(cm.getPlayer().getMap().getId(), cm.getNpc());
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300285), new java.awt.Point(5550, 454));
		cm.dispose();
}
}