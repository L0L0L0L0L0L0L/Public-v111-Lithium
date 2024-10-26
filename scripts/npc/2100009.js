/*
    Name: Aiden
    Map: Nashi Oasis Town
    Description: 260000000
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
			var chat = "Welcome to Nashi Oasis Town. I am Aiden. Just have our membership card, and I will randomly change your appearance for you!#b";
			chat += "\r\n#L1##v5152056##t5152056#";
			cm.sendSimple(chat);
			break;
		case 1:
			cm.sendYesNo("Do you want to use #v5152056#? Your current appearance might change to a random new look.");
			break;
		case 2:
			var face;
			if (cm.getPlayer().getGender() < 1) {
				face = [20040, 20043, 20044, 20045, 20046, 20047, 20048, 20049];
			} else {
				face = [21041, 21042, 21043, 21044, 21045, 21046, 21047, 21048, 21049];
			}

			if (cm.getPlayer().itemQuantity(5152056) > 0) {
				cm.gainItem(5152056, -1);
				cm.setFace(face[Math.floor(Math.random() * face.length)]);
				cm.sendOk("Your new appearance has been changed. Are you satisfied?");
			} else {
				cm.sendOk("Sorry, you don't have the specified membership card, so I can't assist you.");
			}
			cm.dispose();
			break;
	}
}
