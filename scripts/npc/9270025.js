/*
    Name:    Shan
    Map:     Central Business District
    Description: 540000000
*/

var skin = [0, 1, 2, 3, 4, 5];

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
			var chat = "Welcome to the Central Business District, I’m Shan. With our membership card, you can achieve the skin tone you’ve always desired!#b";
			chat += "\r\n#L1##v5153015##t5153015#";
			cm.sendSimple(chat);
			break;
		case 1:
			cm.sendStyle("Use our specialized machine to preview your appearance after the treatment. What kind of skin care would you like?", skin);
			break;
		case 2:
			if (cm.getPlayer().itemQuantity(5153015)) {
				cm.gainItem(5153015, -1);
				cm.setSkin(selection);
				cm.sendOk("Your new skin tone has been applied. Do you like it?");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, you don't have the required skin care voucher. We cannot assist you with this.");
			cm.dispose();
	}
}