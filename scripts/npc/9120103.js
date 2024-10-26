/*
	Name:	Sayaka
	Map:	Showa Cosmetic Surgery
	Description:	801000002
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
			var chat = "Welcome to Showa Cosmetic Surgery. I am Sayaka. As long as you have our store's membership card, I will randomly change your appearance for you!#b";
			chat += "\r\n#L1##v5152056##t5152056#";
			cm.sendSimple(chat);
			break;
		case 1:
			cm.sendYesNo("Would you like to use #v5152056#? Your current appearance may change to a random new look.");
			break;
		case 2:
			var face;
			if (cm.getPlayer().getGender() < 1) {
				face = [20004, 20007, 20011, 20013, 20024, 20027, 20036, 20040, 20044, 20046, 20047, 20052];
			} else {
				face = [21003, 21014, 21016, 21021, 21023, 21026, 21033, 21035, 21042, 21045, 21048, 21054];
			}

			if (cm.getPlayer().itemQuantity(5152056)) {
				cm.gainItem(5152056, -1);
				cm.setFace(face[Math.floor(Math.random() * face.length)]);
				cm.sendOk("Your new appearance has been updated. Are you satisfied?");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, you don't have the required membership card. I can't assist you.");
			cm.dispose();
	}
}
