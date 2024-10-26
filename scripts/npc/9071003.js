/*
	Name:	Monster Park Bus
	Map:	Monster Park
	Description:	951000000
*/

function start() {
	map = cm.getPlayer().getSavedLocation(Packages.server.maps.SavedLocationType.fromString("MONSTER_PARK"));
	if (map < 0) map = 100000000;
	cm.sendYesNo(cm.getPlayer().getMap().getId() == 951000000 ? "Hey there! Need a lift back to town? That's what the Monster Park Shuttle is for!" : "Ah, our favorite customer! Would you like to go to Spiegelmann's Monster Park?");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendNext(cm.getPlayer().getMap().getId() == 951000000 ? "Use the shuttle if you want to leave the Monster Park. A comfy ride every time, guaranteed!" : "The shuttle is always ready for you, so come back anytime.");
		break;
	case 1:
		if (cm.getPlayer().getMap().getId() != 951000000) {
			cm.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("MONSTER_PARK"));
			cm.getPlayer().changeMap(cm.getMap(951000000), cm.getMap(951000000).getPortal(0));
			cm.dispose();
			return;
			}
			cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(0));
			cm.getPlayer().clearSavedLocation(Packages.server.maps.SavedLocationType.fromString("MONSTER_PARK"));
			}
			cm.dispose();
}