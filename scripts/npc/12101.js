/*
	名字:	瑞恩
	地圖:	楓葉村
	描述:	1000000
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
		cm.sendNext("This is the town called #b#m1000000##k, located smack in the middle of Maple Island. You know that Maple Island is for beginners, right? I'm glad there are only weak monsters around here.");
		break;
	case 1:
		cm.sendNextPrev("When you're stronger, go to the harbor in #b#m2000000##k, board a ship, and head to #bVictoria Island#k. That place is humongous!");
		break;
	case 2:
		cm.sendPrev("Once you reach Victoria Island, you can choose your job. If you want to be a Warrior, for example, you'd head to a desolate highland called #b#m102000000##k.");
		break;
	default:
		cm.dispose();
}
}