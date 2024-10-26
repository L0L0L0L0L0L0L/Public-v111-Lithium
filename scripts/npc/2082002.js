/*
	Name: Harry
	Map: Departure <Heading to Sky City>
	Description: 240000111
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
			if (status < 2) {
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
			var chat = "Dear customer, welcome aboard the ship heading to Sky City. I am the steward of this journey, #p" + cm.getNpc() + "#. How can I assist you today? #b";
			chat += "\r\n#L0# Ask about the departure time";
			chat += "\r\n#L1# I want to leave here";
			cm.sendSimple(chat);
			break;
		case 1:
			if (selection == 0) {
				cm.sendOk("Please wait patiently; we are about to prepare for departure. Have a pleasant journey.");
				cm.dispose();
			} else if (selection == 1) {
				cm.sendYesNo("You can leave here at any time, but you will need to purchase another ticket to re-enter. Do you still want to leave?");
			}
			break;
		case 2:
			cm.getPlayer().changeMap(cm.getMap(240000110), cm.getMap(240000110).getPortal(0));
			cm.dispose();
			break;
	}
}
