/*
    Name:    Thomas
    Map:     Archer Village
    Description:    100000000
*/

function start() {
	if (cm.getPlayer().getMap().getId() == 100000000)
		cm.sendYesNo("Would you like to visit the Western-style wedding hall?");
	else
		cm.sendYesNo("Are you ready to leave #b#m" + cm.getPlayer().getMap().getId() + "##k?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		var map = cm.getPlayer().getMap().getId() != 680000000 ? 680000000 : 100000000;
		cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(5));
		//if (cm.getPlayer().getMap().getId() > 680000400) cm.setQuestRecord(cm.getPlayer(), 160002, 0);
	}
	cm.dispose();
}
