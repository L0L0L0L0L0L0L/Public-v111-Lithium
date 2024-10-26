/*
	Name: Death Squad's Inscription Tablet
	Map: Cave Entrance
	Description: 240050000
*/

function start() {
	if (!cm.getPlayer().itemQuantity(4001086)) {
		cm.sendOk("You can't make out the inscriptions on the tablet and don't know where to use it.");
		cm.dispose();
		return;
	}
	cm.sendYesNo("The inscriptions on the tablet are glowing strangely, and a small door behind the tablet has opened. Do you want to enter the secret passage?");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getPlayer().changeMap(cm.getMap(240050400), cm.getMap(240050400).getPortal(1));
	cm.dispose();
}
