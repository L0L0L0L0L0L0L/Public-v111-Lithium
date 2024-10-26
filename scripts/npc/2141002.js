/*
    Name:    The Forgotten Temple Guardian
    Map:     Twilight of the Gods
    Description: 270050100
*/

function start() {
	cm.sendYesNo("Are you sure you want to leave #b#m" + cm.getPlayer().getMap().getId() + "##k?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.getPlayer().changeMap(cm.getMap(270050000), cm.getMap(270050000).getPortal(0));
	}
	cm.dispose();
}
