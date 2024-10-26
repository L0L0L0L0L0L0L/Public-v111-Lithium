/*
	名字:	須勒
	地圖:	2次轉職
	描述:	931000100
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
		cm.sendNext("Oh my. what's this? l gave specific instructions to make sure no one else used the airport at this time...But, I say, are you a member of the Resistance?");
		break;
	case 1:
		cm.sendNextPrevS("#b(You are surprised Schiller doesn't immediately recognize you. You certainly remember him.)", 2);
		break;
	case 2:
		cm.sendNextPrev("Come to think of it, you do look familiar... Where have l seen you before?");
		break;
	case 3:
		cm.sendNextPrevS("l couldn't fight you the last time we met, but l plan to fix that today.", 2);
		break;
	case 4:
		cm.sendNextPrev("You! I remember now! You stole that one test subject! Do you have any idea how much l suffered because of that? l was demoted...five times! Now I'm stuck doing menial jobs like this. Time for you to pay. oh yes.");
		break;
	case 5:
		cm.removeNpc(cm.getPlayer().getMap().getId(), cm.getNpc());
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001031), new java.awt.Point(-107, -23));
		cm.dispose();
}
}