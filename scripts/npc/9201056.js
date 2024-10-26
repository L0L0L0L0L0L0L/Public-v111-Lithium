/*
    Name:    New Leaf City Taxi
    Map:     New Leaf City - City Center
    Description:    600000000
*/

function start() {
	cm.sendYesNo("Hello, the New Leaf City taxi offers direct service to " +
		(cm.getPlayer().getMap().getId() == 600000000 ? "Haunted Mansion Exterior" : "New Leaf City - City Center") +
		". The cost is #b10000#k mesos.");
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getPlayer().getMeso() < 10000) {
			cm.sendOk("Sorry, please make sure you have #b10000#k mesos.");
			cm.dispose();
			return;
		}
		map = cm.getPlayer().getMap().getId() == 600000000 ? 682000000 : 600000000;
		cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(0));
		cm.gainMeso(-10000);
	}
	cm.dispose();
}
