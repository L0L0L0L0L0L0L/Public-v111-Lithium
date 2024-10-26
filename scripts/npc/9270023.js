/*
    Name:    Noel
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
			var chat = "Welcome to the Central Business District, I’m Noel. With our membership card, I will give you a random change!#b";
			chat += "\r\n#L1##v5152056##t5152056#";
			cm.sendSimple(chat);
			break;
		case 1:
			cm.sendYesNo("Do you want to use #v5152056#? Your appearance may change to a random new look.");
			break;
		case 2:
			var face = cm.getPlayer().getGender() < 1 ?
				[20004, 20012, 20017, 20024, 20028, 20031, 20036, 20044, 20046, 20052, 20056] :
				[21001, 21006, 21012, 21018, 21022, 21026, 21033, 21035, 21042, 21046, 21054];

			if (cm.getPlayer().itemQuantity(5152056)) {
				cm.gainItem(5152056, -1);
				cm.setFace(face[Math.floor(Math.random() * face.length)]);
				cm.sendOk("Your new face has been applied. Are you satisfied?");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, you don’t have the required membership card. We can’t assist you without it.");
			cm.dispose();
	}
}
