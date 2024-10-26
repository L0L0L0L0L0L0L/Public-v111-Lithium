/*
    Name: Sister Clarens
    Map: Wedding Town
    Description: 680000000
*/

function start() {
	cm.sendYesNo(cm.getPlayer().getMap().getId() == 680000000 ? "Do you want to go to the Wedding Hall?" : "Do you want to return to Wedding Town?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		var map = cm.getPlayer().getMap().getId() == 680000000 ? 680000200 : 680000000;
		cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(0));
	}
	cm.dispose();
}
