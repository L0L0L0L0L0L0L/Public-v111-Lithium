/*
	Name:	Xiaowulang
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
			var chat = "Welcome to Showa Cosmetic Surgery. I am Xiaowulang. With our store's membership card, you can enjoy our professional services. #b";
			chat += "\r\n#L1##v5152057##t5152057#";
			cm.sendSimple(chat);
			break;
		case 1:
			var face;
			if (cm.getPlayer().getGender() < 1) {
				face = [20004, 20007, 20011, 20013, 20024, 20027, 20036, 20040, 20044, 20046, 20047, 20052];
			} else {
				face = [21003, 21014, 21016, 21021, 21023, 21026, 21033, 21035, 21042, 21045, 21048, 21054];
			}
			cm.sendStyle("Using our special machine, you can preview your new appearance. Choose the look you like.", face);
			break;
		case 2:
			if (cm.getPlayer().itemQuantity(5152057)) {
				cm.gainItem(5152057, -1);
				cm.setFace(face[selection]);
				cm.sendOk("Your new appearance has been updated. Do you like it?");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, you don't have the required membership card. I can't assist you.");
			cm.dispose();
	}
}
