/*
    Name:    Little Mouth
    Map:     White Christmas Hill
    Description: 555000000
*/

function start() {
	cm.sendYesNo("Are you sure you want to leave #b#m" + cm.getPlayer().getMap().getId() + "##k?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		var map = cm.getPlayer().getSavedLocation(Packages.server.maps.SavedLocationType.fromString("CHRISTMAS"));
		if (map < 0) map = 230000000; // Default to a different map if no saved location is found

		cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(0));
		cm.getPlayer().clearSavedLocation(Packages.server.maps.SavedLocationType.fromString("CHRISTMAS"));
	}
	cm.dispose();
}