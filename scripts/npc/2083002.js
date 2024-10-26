/*
	Name: Tree Root Crystal
	Map: Dark Dragon King Cave Entrance
	Description: 240050400
*/

function start() {
	cm.sendYesNo("Are you sure you want to leave #b#m" + cm.getPlayer().getMap().getId() + "##k?");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getPlayer().changeMap(cm.getMap(240050000), cm.getMap(240050000).getPortal(0));
	cm.dispose();
}
