/*
    Name:    Wedelin
    Map:     Edelstein
    Description: 310000000
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
			var chat = "Welcome to Edelstein. I am Wedelin. Just have a membership card from our shop, and I will randomly make a change for you!#b";
			chat += "\r\n#L1##v5152056##t5152056#";
			cm.sendSimple(chat);
			break;
		case 1:
			cm.sendYesNo("Would you like to use #v5152056#? Your appearance may change to a random new look.");
			break;
		case 2:
			if (cm.getPlayer().getGender() < 1)
				face = [20013, 20016, 20026, 20030, 20036, 20043, 20047];
			else
				face = [21002, 21013, 21024, 21026, 21035, 21044, 21046];

			if (cm.getPlayer().itemQuantity(5152056)) {
				cm.gainItem(5152056, -1);
				cm.setFace(face[Math.floor(Math.random() * face.length)]);
				cm.sendOk("Your new appearance has been updated. Are you satisfied?");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, you do not have the required membership card. I'm afraid I cannot assist you.");
			cm.dispose();
	}
}
