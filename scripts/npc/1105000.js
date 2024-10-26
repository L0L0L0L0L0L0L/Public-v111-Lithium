/*
	名字:	西格諾斯
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
		cm.sendNextPrev("What a wonderful day!");
		break;
	case 2:
		cm.sendPrev("But the real fight has yet to begin! We must put aside our misunderstandings and work together to save our lands!");
		break;
	case 3:
		cm.dispose();
}
}