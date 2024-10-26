/*
    Name:    Botox
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
			var chat = "Welcome to Edelstein. I am Botox. Just have a membership card from our shop, and you can enjoy our professional services. #b";
			chat += "\r\n#L1##v5152057##t5152057#";
			cm.sendSimple(chat);
			break;
		case 1:
			if (cm.getPlayer().getGender() < 1)
				face = [20013, 20016, 20026, 20030, 20036, 20043, 20047];
			else
				face = [21002, 21013, 21024, 21026, 21035, 21044, 21046];

			cm.sendStyle("Using our specialized machine, you can preview your appearance after the makeover. Choose a look you like.", face);
			break;
		case 2:
			if (cm.getPlayer().itemQuantity(5152057)) {
				cm.gainItem(5152057, -1);
				cm.setFace(face[selection]);
				cm.sendOk("Your new appearance has been updated. Do you like it?");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, you do not have the required membership card. I'm afraid I cannot assist you.");
			cm.dispose();
	}
}
