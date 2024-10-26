/*
	Name: Rephikeiman
	Map: Stage 1: Stone Giant Temple 1
	Description: 952000000
*/

function start() {
	cm.sendYesNo("Are you sure you want to leave #b#m" + cm.getPlayer().getMap().getId() + "##k?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.getPlayer().changeMap(cm.getMap(951000000), cm.getMap(951000000).getPortal(0));
	}
	cm.dispose();
}
