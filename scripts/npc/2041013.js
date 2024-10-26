/*
    Name: Gina
    Map: Toy City Skin Care Center
    Description: 220000005
*/

var skin = Array(0, 1, 2, 3, 4, 5);

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
			var chat = "Welcome to the Toy City Skin Care Center. I'm Gina. Just hold our membership card, and you can get the skin you've always wanted~!#b";
			chat += "\r\n#L1##v5153015##t5153015#";
			cm.sendSimple(chat);
			break;
		case 1:
			cm.sendStyle("Using our specialized machine, you can preview your appearance after treatment. What kind of skin care would you like?", skin);
			break;
		case 2:
			if (cm.getPlayer().itemQuantity(5153015) > 0) {
				cm.gainItem(5153015, -1);
				cm.setSkin(selection);
				cm.sendOk("Your new skin color has been applied. Do you like it?");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, you do not have the required skin care voucher. Unfortunately, we cannot perform the treatment.");
			cm.dispose();
			break;
	}
}
