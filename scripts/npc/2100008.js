/*
    Name: Badr
    Map: Nashi Oasis Town
    Description: 260000000
*/

var status;
var face;

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
			var chat = "Welcome to Nashi Oasis Town. I am Badr. Just hold our membership card and you can enjoy our professional services. #b";
			chat += "\r\n#L1##v5152057##t5152057#";
			cm.sendSimple(chat);
			break;
		case 1:
			if (cm.getPlayer().getGender() < 1) {
				face = [20040, 20043, 20044, 20045, 20046, 20047, 20048, 20049];
			} else {
				face = [21041, 21042, 21043, 21044, 21045, 21046, 21047, 21048, 21049];
			}
			cm.sendStyle("Use the special machine to preview your new appearance and choose the one you like.", face);
			break;
		case 2:
			if (cm.getPlayer().itemQuantity(5152057) > 0) {
				cm.gainItem(5152057, -1);
				cm.setFace(face[selection]);
				cm.sendOk("Your new appearance has been set. Do you like it?");
			} else {
				cm.sendOk("Sorry, you don't have the specified membership card, so I can't assist you.");
			}
			cm.dispose();
			break;
	}
}
