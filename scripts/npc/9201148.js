/*
    Name:    Beautiful Nurse
    Map:     Archer Village Plastic Surgery Clinic
    Description:    100000103
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
			var chat = "Welcome to the Archer Village Plastic Surgery Clinic. I am the Beautiful Nurse. With our membership card, you can enjoy our professional services. #b";
			chat += "\r\n#L1##v5152057##t5152057#";
			cm.sendSimple(chat);
			break;
		case 1:
			if (cm.getPlayer().getGender() < 1)
				face = [20014, 20016, 20018, 20021, 20023, 20026, 20030, 20036, 20044, 20046, 20053, 20057];
			else
				face = [21011, 21018, 21021, 21025, 21027, 21031, 21034, 21042, 21045, 21053, 21058];

			cm.sendStyle("Using our special machine, you can preview your appearance after surgery. Choose the look you like.", face);
			break;
		case 2:
			if (cm.getPlayer().itemQuantity(5152057)) {
				cm.gainItem(5152057, -1);
				cm.setFace(face[selection]);
				cm.sendOk("Your new appearance has been updated. Do you like it?");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, you don't have the required membership card. I'm afraid I can't assist you.");
			cm.dispose();
	}
}
