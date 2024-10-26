/*
	Name:	MapleStory Manager
	Map:	Dock Quick Travel
	Description:	Dock Quick Travel
*/

function start() {
	map = cm.getPlayer().getMap().getId();
	target = 104020100;
	portal = 1;
	if (map == 200000000 || map == 220000000 || map == 240000000 || map == 250000000 || map == 260000000) {
		target = map + 100;
	}
	if (map == 130000000) {
		target = map + 210;
	}
	if (map == 140000000) {
		target = map + 20300;
	}
	if (map == 310000000) {
		target = map + 10;
	}
	cm.sendYesNo("The nearest mainland travel dock from your current location is #m" + target + "#. Do you want to move to #b<#m" + target + "#>#k?");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getPlayer().changeMap(cm.getMap(target), cm.getMap(target).getPortal(portal));
	cm.dispose();
}