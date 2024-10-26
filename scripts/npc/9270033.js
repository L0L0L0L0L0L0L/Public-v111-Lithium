/*
    Name:    Bob
    Map:     Engine Room
    Description: 541010100
*/

function start() {
	cm.sendYesNo("Are you sure you want to leave #b#m" + cm.getPlayer().getMap().getId() + "##k?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.getPlayer().changeMap(cm.getMap(541010110), cm.getMap(541010110).getPortal(0));
	}
	cm.dispose();
}
