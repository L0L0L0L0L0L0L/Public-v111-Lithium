/*
	Name:	Suzuki
	Map:	Showa Village
	Description:	801000000
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
		case -1:
			cm.dispose();
			return;
		case 0:
			if (status < 1) {
				cm.dispose();
				return;
			}
			status--;
			break;
		case 1:
			status++;
			break;
	}
	switch (status) {
		case 0:
			cm.sendSimple("Hey! Traveler, what would you like to get from me?\r\n#L0##bInformation about Fire Fox Financial#l\r\n#L1#Take me to Fire Fox Financial#l\r\n#L2#Nothing#l");
			break;
		case 1:
			if (selection == 0)
				cm.sendOk("Fire Fox Financial near Showa Village is full of troublemakers. They are led by #bThe Black Road Elder#k, who controls this area and exploits the money of Showa villagers.");
			if (selection == 1)
				cm.sendNext("Are you sure you have what it takes? There are many kinds of fools, and I've never seen one as fearless as you. If you're determined to go, I might as well join in the fun.");
			if (selection == 2)
				cm.sendOk("I'm a busy person, so let me be alone!");
			if (selection != 1) {
				cm.dispose();
			}
			break;
		case 2:
			cm.getPlayer().changeMap(cm.getMap(801040000), cm.getMap(801040000).getPortal(0));
			cm.dispose();
	}
}
