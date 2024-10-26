/*
	名字:	蕾雅
	地圖:	弓箭手村
	描述:	100000000
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
		cm.sendNext("Come talk to me again if you would like to move to the Hall of Heroes.");
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
		cm.sendYesNo("Hello, I am Lea. I am in charge of guild support. For guild management, I can arrange transportation to the guild base, the Hall of Heroes. Would you like to move to the Hall of Heroes now?");
		break;
	case 1:
		cm.sendNext("Yes, I'll take you there right now.");
		break;
	case 2:
		cm.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("CHRISTMAS"));
		cm.getPlayer().changeMap(cm.getMap(200000301), cm.getMap(200000301).getPortal(1));
		cm.dispose();
}
}