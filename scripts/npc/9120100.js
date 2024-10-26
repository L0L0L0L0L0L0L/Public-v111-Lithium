/*
	Name:	Honda
	Map:	Showa Hair Salon
	Description:	801000001
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
			var chat = "Welcome to the Showa Hair Salon. I am Honda. With our store's membership card, you can enjoy our professional services. #b";
			chat += "\r\n#L0##v5150053##t5150053#";
			chat += "\r\n#L1##v5151036##t5151036#";
			cm.sendSimple(chat);
			break;
		case 1:
			if (selection < 1) {
				var hair;
				if (cm.getPlayer().getGender() < 1) {
					hair = [30600, 30610, 30620, 30630, 30640, 30650, 30660, 30670, 30680, 30690];
				} else {
					hair = [31600, 31610, 31620, 31630, 31640, 31650, 31660, 31670, 31680, 31690];
				}
				for (var i = 0; i < hair.length; i++) {
					hair[i] = hair[i] + parseInt(cm.getPlayer().getHair() % 10); // Read current hair color
				}
				cm.sendStyle("Using our special machine, you can preview your new hairstyle. Choose a style you like.", hair);
			}
			if (selection > 0) {
				var color = parseInt(cm.getPlayer().getHair() / 10) * 10;
				hair = [];
				for (var i = 0; i < 8; i++) {
					hair[i] = color + i;
				}
				cm.sendStyle("Using our special machine, you can preview your new hair color. Choose a color you like.", hair);
			}
			select = selection;
			break;
		case 2:
			if (select < 1 && cm.getPlayer().itemQuantity(5150053) || select > 0 && cm.getPlayer().itemQuantity(5151036)) {
				cm.gainItem(select < 1 ? 5150053 : 5151036, -1);
				cm.setHair(hair[selection]);
				cm.sendOk("Your new hairstyle has been styled. Do you like it?");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, you don't have the required membership card. I can't assist you.");
			cm.dispose();
	}
}
