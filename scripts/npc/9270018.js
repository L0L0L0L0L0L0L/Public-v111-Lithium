/*
    Name:    Koni
    Map:     Departure (to Fallen City)
    Description: 540010001
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
			if (cm.getPlayer().getMap().getId() != 540010001) {
				cm.sendOk("Please wait, the weather is nice, and we will arrive at the destination soon.");
				cm.dispose();
				return;
			}
			var chat = "Dear customer, welcome aboard the flight to Fallen City. I’m Koni, the captain of this flight. How can I assist you today?#b";
			chat += "\r\n#L0#Inquire about departure time";
			chat += "\r\n#L1#I want to leave here";
			cm.sendSimple(chat);
			break;
		case 1:
			if (selection < 1) {
				cm.sendOk("Please be patient, we are preparing for departure shortly. We wish you a pleasant journey.");
				cm.dispose();
			} else {
				cm.sendYesNo("You can leave anytime, but to return, you'll need to purchase another ticket. Do you still want to leave?");
			}
			break;
		case 2:
			cm.getPlayer().changeMap(cm.getMap(540010000), cm.getMap(540010000).getPortal(0));
			cm.dispose();
	}
}
