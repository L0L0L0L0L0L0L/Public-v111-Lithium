/*
	Name:	Ms. Kō
	Map:	Showa Village
	Description:	801000000
*/

var cost = 300;

function start() {
	cm.sendYesNo("Would you like to go to the bathhouse? Please give me #b" + cost + "#k mesos.");
}

function action(mode, type, selection) {
	switch (mode) {
		case 0:
			cm.sendOk("Come back next time.");
			break;
		case 1:
			if (cm.getPlayer().getMeso() < cost) {
				cm.sendOk("Sorry, please make sure you have #b" + cost + "#k mesos.");
				cm.dispose();
				return;
			}
			map = 801000100 + 100 * cm.getPlayer().getGender();
			cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(2));
			cm.gainMeso(-cost);
			cm.dispose();
			break;
	}
}
