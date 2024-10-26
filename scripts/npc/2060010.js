function start() {
	cm.sendYesNo("Are you sure you want to leave #b#m" + cm.getPlayer().getMap().getId() + "##k?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		var map = cm.getPlayer().getSavedLocation(Packages.server.maps.SavedLocationType.fromString("MULUNG_TC"));
		if (map < 0) map = 230000000;

		portal = cm.getMap(map).getPortal("unityPortal2") != null ? "unityPortal2" : cm.getMap(map).getPortal(3) != null ? 3 : 0;
		cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(portal));
		cm.getPlayer().clearSavedLocation(Packages.server.maps.SavedLocationType.fromString("MULUNG_TC"));
	}
	cm.dispose();
}
