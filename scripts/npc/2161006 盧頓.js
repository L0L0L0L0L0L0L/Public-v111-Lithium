/*
	名字:	盧頓
	地圖:	城內後巷
	描述:	921130000
*/

function start() {
	cm.sendYesNo("Would you like to head back?");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getPlayer().changeMap(cm.getMap(910000000), cm.getMap(910000000).getPortal(0));
		cm.dispose();
}