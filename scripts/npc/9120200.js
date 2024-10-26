/*
	Name:	Suzuki
	Map:	Base Entrance
	Description:	801040000
*/

function start() {
	cm.sendYesNo("This is the Fire Raccoon Financial. What...? Do you want to run back to #b#m801000000##k?");
}

function action(mode, type, selection) {
	switch (mode) {
		case 0:
			cm.sendOk("Go inside, I'll wait for you here!");
			break;
		case 1:
			cm.getPlayer().changeMap(cm.getMap(801000000), cm.getMap(801000000).getPortal(0));
	}
	cm.dispose();
}
