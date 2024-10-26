/*
    Name:    Xin Zha
    Map:     Fallen City Airport
    Description: 540010100
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
			var chat = "Dear customer, welcome aboard the flight to Singapore. I’m Xin Zha, the captain of this flight. How can I assist you today?#b";
			chat += "\r\n#L0#Inquire about departure time";
			chat += "\r\n#L1#I want to leave here";
			cm.sendSimple(chat);
			break;
		case 1:
			if (selection < 1) {
				cm.sendOk("Please be patient, we are preparing for departure soon. We wish you a pleasant journey.");
				cm.dispose();
			} else {
				cm.sendYesNo("You can leave at any time, but to return you will need to purchase another ticket. Do you still wish to leave?");
			}
			break;
		case 2:
			cm.getPlayer().changeMap(cm.getMap(103000000), cm.getMap(103000000).getPortal(0));
			cm.dispose();
	}
}
