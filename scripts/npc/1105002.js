/*
	名字:	吉可穆德
	地圖:	聯盟會議場
	描述:	913050010
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
		cm.sendNext("The continental conference was a complete success! The #bMaple Alliance#k has been formed and the heroes across all of Maple World will join in the fight.");
		break;
	case 1:
		cm.sendNextPrev("Truthfully, I can't trust them completely. Their betrayals and disappointments are still too fresh on my mind.");
		break;
	case 2:
		cm.sendNextPrev("Nevertheless, we agreed to be in this Alliance and we're going to stick to it. We have nothing to lose by joining forces against a greater evil.");
		break;
	case 3:
		cm.sendPrev("We'll help them whenever they're in need, but we're not going to rely on them for protection. Not yet, anyway.");
		break;
	case 4:
		cm.dispose();
}
}