/*
	Name:	MapleStory Manager
	Map:	Free Market Quick Travel
	Description:	Free Market Quick Travel
*/

function start() {
	cm.sendYesNo("Move to a place where you can trade items with other players#b<Free Market>#k?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("FREE_MARKET"));
		cm.getPlayer().changeMap(cm.getMap(910000000), cm.getMap(910000000).getPortal(34));
		}
		cm.dispose();
}