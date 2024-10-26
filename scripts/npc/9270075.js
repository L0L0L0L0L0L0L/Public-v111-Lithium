/*
    Name:    Little Mouth
    Map:     Fallen City
    Description: 103000000
*/

function start() {
	cm.sendYesNo("The White Christmas Mountain is a beautiful place. Would you like to go to White Christmas Mountain?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("CHRISTMAS"));
		cm.getPlayer().changeMap(cm.getMap(555000000), cm.getMap(555000000).getPortal(0));
	}
	cm.dispose();
}
