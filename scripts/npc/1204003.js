/*
	名字:	普蘭西斯
	地圖:	危險的資料商店
	描述:	910400000
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
		cm.sendNextS("Hmmm, you really came. Not bad. Your artful disguise comes in handy once in a while, huh? Baroq, you can leave now.", 1);
		break;
	case 1:
		cm.getPlayer().getMap().killMonster(9300382);
		cm.sendNextPrevS("Pshaw, you owe me one.", 5, 1204004);
		break;
	case 2:
		cm.sendNextPrevS("Ah, nice seeing you again. Last time, I lost because I spent all my energy fighting the Cygnus Knights. But not this time! I will destroy you!", 1);
		break;
	case 3:
		cm.removeNpc(cm.getPlayer().getMap().getId(), cm.getNpc());
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300345), new java.awt.Point(140, 120));
		cm.dispose();
}
}