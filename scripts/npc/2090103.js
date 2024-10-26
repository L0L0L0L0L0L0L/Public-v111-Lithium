/*
	Name: Bayada
	Map: Peach Blossom Wonderland
	Description: 250000000
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
			var chat = "Welcome to Peach Blossom Wonderland, I am Bayada. Just hold our store's membership card, and you can enjoy our professional services. #b";
			chat += "\r\n#L1##v5152057##t5152057#";
			cm.sendSimple(chat);
			break;
		case 1:
			if (cm.getPlayer().getGender() < 1)
				face = [20030, 20031, 20032, 20036, 20037];
			else
				face = [21030, 21031, 21033, 21034, 21035, 21038];

			cm.sendStyle("Using our specialized machine, you can preview your new look. Choose one you like.", face);
			break;
		case 2:
			if (cm.getPlayer().itemQuantity(5152057)) {
				cm.gainItem(5152057, -1);
				cm.setFace(face[selection]);
				cm.sendOk("Your new appearance has been updated. Do you like it?");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, you do not have the required membership card. I’m afraid I cannot serve you.");
			cm.dispose();
	}
}
