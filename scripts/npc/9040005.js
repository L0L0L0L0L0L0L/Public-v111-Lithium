/*
	Name: Stone of Return
	Map: Guardian's Canyon
	Description: 990000100
*/

function start() {
	cm.sendYesNo("Are you sure you want to leave #b#m" + cm.getPlayer().getMap().getId() + "##k and exit the guild mission?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.getPlayer().changeMap(cm.getMap(990001100), cm.getMap(990001100).getPortal(0));
	}
	cm.dispose();
}
