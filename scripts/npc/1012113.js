/*
	Name: Dalmi
	Map: Shortcut
	Description: 910010300
*/

function start() {
	cm.sendYesNo("What a pity! I was planning to ask you for rice cakes, but the Moon Bunny event has ended. Do you want to leave #b#m" + cm.getPlayer().getMap().getId() + "##k?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.removeAll(4001453); // Remove all items with ID 4001453 (Rice Cakes)
		cm.getPlayer().changeMap(cm.getMap(100000200), cm.getMap(100000200).getPortal(0)); // Change the player's map to 100000200
	}
	cm.dispose(); // End the interaction
}
