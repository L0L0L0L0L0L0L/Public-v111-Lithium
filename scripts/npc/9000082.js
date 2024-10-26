/*
    Name: Wind
    Map: Temple Exit
    Description: 950101100
*/

function start() {
	cm.sendYesNo("Are you sure you want to leave #b#m" + cm.getPlayer().getMap().getId() + "##k?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		var map = cm.getPlayer().getMap().getId() == 809061010 || cm.getPlayer().getMap().getId() == 809061100 ? 809060000 : 950100000;
		cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(0));
	}
	cm.dispose();
}
