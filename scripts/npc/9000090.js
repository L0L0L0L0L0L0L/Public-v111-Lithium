/*
    Name: Camel Taxi
    Map: Fast Travel
    Description: Fast Travel
*/

var cost = 1000;

function start() {
	cm.sendYesNo("Traveler, the Camel Taxi awaits you. It costs " + cost + " mesos to take you to #b" + (cm.getPlayer().getMap().getId() == 261000000 ? "#m260020000#" : "#m260020700#") + "#k.");
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getPlayer().getMeso() < cost) {
			cm.sendOk("Sorry, please make sure you have #b" + cost + "#k mesos.");
			cm.dispose();
			return;
		}
		var map = cm.getPlayer().getMap().getId() == 261000000 ? 260020000 : 260020700;
		cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(0));
		cm.gainMeso(-cost);
	}
	cm.dispose();
}
