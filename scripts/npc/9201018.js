/*
    Name:    Tutra
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
			var chat = "Welcome to Wedding Town. I am Tutra. If you have our membership card, you can enjoy our professional services. #b";
			chat += "\r\n#L1##v5152022##t5152022#";
			cm.sendSimple(chat);
			break;
		case 1:
			if (cm.getPlayer().getGender() < 1)
				face = [20000, 20001, 20003, 20004, 20005, 20006, 20007, 20008, 20018, 20019];
			else
				face = [21001, 21002, 21003, 21004, 21005, 21006, 21007, 21012, 21018, 21019];

			cm.sendStyle("Using our special machine, you can preview your appearance after the change. Choose a style you like.", face);
			break;
		case 2:
			if (cm.getPlayer().itemQuantity(5152022)) {
				cm.gainItem(5152022, -1);
				cm.setFace(face[selection]);
				cm.sendOk("Your new face has been set. Do you like it?");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, but you don't have the required membership card. I can't assist you.");
			cm.dispose();
	}
}
