/*
	名字:	龍魔導士
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
		cm.sendNext("Woah, these people all look like they're somebody! That guy looks super tough! I didn't notice in Henesys, but Athena Pierce looks way important!");
		break;
	case 1:
		cm.sendPrev("Am I supposed to be here? Maybe they switched the invitations.");
		break;
	case 2:
		cm.dispose();
}
}