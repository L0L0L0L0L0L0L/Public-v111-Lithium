/*
	名字:	龍
	地圖:	夢現的森林
	描述:	900010200
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
		cm.sendNextS("You, who are destined to be a Dragon Master... You have finally arrived.", 1);
		break;
	case 1:
		cm.sendNextPrevS("Go and fulfill your duties as the Dragon Master...", 1);
		break;
	case 2:
		cm.dispose();
		cm.getPlayer().changeMap(cm.getMap(900090101), cm.getMap(900090101).getPortal(0));
}
}