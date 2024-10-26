/*
	Name: Dr. Almost
	Map: Archer Village Beauty Clinic
	Description: 100000103
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
			var chat = "Welcome to the Archer Village Beauty Clinic! I'm Dr. Almost, and with a membership card, I can give you a random makeover!#b";
			chat += "\r\n#L0##v5152056##t5152056#";
			cm.sendSimple(chat);
			break;
		case 1:
			cm.sendYesNo("Would you like to use #v5152056#? Your appearance will change randomly.");
			break;
		case 2:
			if (cm.getPlayer().getGender() < 1)
				face = [20000, 20001, 20002, 20003, 20004, 20005, 20006, 20007, 20008, 20009];
			else
				face = [21000, 21001, 21002, 21003, 21004, 21005, 21006, 21007, 21008, 21009];

			if (cm.getPlayer().itemQuantity(5152056)) {
				cm.gainItem(5152056, -1);
				cm.setFace(face[Math.floor(Math.random() * face.length)]);
				cm.sendOk("Your new look is ready, are you happy?");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, without the specified membership card, I cannot serve you.");
			cm.dispose();
	}
}
