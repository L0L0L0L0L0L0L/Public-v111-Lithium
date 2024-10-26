/*
	名字:	普蘭西斯
	地圖:	傀儡師的洞穴
	描述:	910510000
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
		cm.sendNextS("You again! How in the world did you get in? I thought I warned you not to stand in my way!", 8);
		break;
	case 1:
		cm.sendNextPrevS("What exactly are you trying to do? Why are you controlling these monsters? Tell me what the Black Wings are up to!", 2);
		break;
	case 2:
		cm.sendNextPrevS("Hmph, I don't have to tell you anything! Now prepare to die!", 8);
		break;
	case 3:
		cm.removeNpc(cm.getPlayer().getMap().getId(), cm.getNpc());
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300344), new java.awt.Point(479, 245));
		cm.dispose();
}
}