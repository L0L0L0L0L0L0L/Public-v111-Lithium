/*
    Name:    Kelvin
    Map:     Central Business District
    Description: 540000000
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
			var chat = "Welcome to the Central Business District, I'm Kelvin. With our membership card, you can enjoy our professional services!#b";
			chat += "\r\n#L1##v5152057##t5152057#";
			cm.sendSimple(chat);
			break;
		case 1:
			var face = cm.getPlayer().getGender() < 1 ?
				[20004, 20012, 20017, 20024, 20028, 20031, 20036, 20044, 20046, 20052, 20056] :
				[21001, 21006, 21012, 21018, 21022, 21026, 21033, 21035, 21042, 21046, 21054];

			cm.sendStyle("Use our specialized machine to preview your new face. Choose the one you like best.", face);
			break;
		case 2:
			if (cm.getPlayer().itemQuantity(5152057)) {
				cm.gainItem(5152057, -1);
				cm.setFace(face[selection]);
				cm.sendOk("Your new face has been applied. Do you like it?");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, you don't have the required membership card. We can't assist you without it.");
			cm.dispose();
	}
}
