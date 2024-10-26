/*
    Name:    Jack
    Map:     New Leaf City - Shopping Mall
    Description:    600000001
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
			var chat = "Welcome to the New Leaf City Shopping Mall! I’m Jack. If you have a membership card from our store, I can change your appearance randomly for you!#b";
			chat += "\r\n#L1##v5152056##t5152056#";
			cm.sendSimple(chat);
			break;
		case 1:
			cm.sendYesNo("Would you like to use #v5152056#? Your appearance might change to a random new look.");
			break;
		case 2:
			var face;
			if (cm.getPlayer().getGender() < 1) {
				face = [20050, 20052, 20053, 20055, 20056, 20057];
			} else {
				face = [21052, 21053, 21054, 21055, 21058, 21062];
			}

			if (cm.getPlayer().itemQuantity(5152056) > 0) {
				cm.gainItem(5152056, -1);
				cm.setFace(face[Math.floor(Math.random() * face.length)]);
				cm.sendOk("Your new appearance has been set. Do you like it?");
			} else {
				cm.sendOk("Sorry, you don't have the required membership card. I can't assist you.");
			}
			cm.dispose();
			return;
	}
}
