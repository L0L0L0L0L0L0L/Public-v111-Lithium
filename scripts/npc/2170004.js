/*
    Name: Deimos
    Map: Crossroads
    Description: 200100000
*/

function start() {
	cm.sendYesNo("Are you ready to leave #b#m" + cm.getPlayer().getMap().getId() + "##k?");
}

function action(mode, type, selection) {
	switch (mode) {
		case 0:
			cm.sendOk("Can't you stay here a little longer?");
			break;
		case 1:
			cm.getPlayer().changeMap(cm.getMap(200000200), cm.getMap(200000200).getPortal(0));
			break;
	}
	cm.dispose();
}
