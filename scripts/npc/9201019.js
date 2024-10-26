/*
    Name:    Shakaha
    Map:     Wedding Town
    Description:    680000000
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
			var chat = "Welcome to Wedding Town. I am Shakaha. If you have our membership card, I can randomly change your appearance! #b";
			chat += "\r\n#L1##v5152021##t5152021#";
			cm.sendSimple(chat);
			break;
		case 1:
			cm.sendYesNo("Do you want to use #v5152021#? Your current appearance may be changed to a random new one.");
			break;
		case 2:
			if (cm.getPlayer().getGender() < 1)
				face = [20002, 20005, 20007, 20011, 20014, 20027, 20029];
			else
				face = [21001, 21005, 21007, 21017, 21018, 21020, 21022];

			if (cm.getPlayer().itemQuantity(5152021)) {
				cm.gainItem(5152021, -1);
				cm.setFace(face[Math.floor(Math.random() * face.length)]);
				cm.sendOk("Your new face has been set. Are you satisfied?");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, but you don't have the required membership card. I can't assist you.");
			cm.dispose();
	}
}
