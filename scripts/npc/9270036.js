/*
    Name:    Eric
    Map:     Central Business District
    Description: 540000000
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
			var chat = "Welcome to the Central Business District. I’m Eric. With a membership card from our store, you can enjoy our professional services. #b";
			chat += "\r\n#L0##v5150053##t5150053#";
			chat += "\r\n#L1##v5151036##t5151036#";
			cm.sendSimple(chat);
			break;
		case 1:
			if (selection < 1) {
				// Gender-specific hairstyle ranges
				if (cm.getPlayer().getGender() < 1) {
					hair = [30800, 30810, 30820, 30830, 30840, 30850, 30860, 30870, 30880, 30890];
				} else {
					hair = [31800, 31810, 31820, 31830, 31840, 31850, 31860, 31870, 31880, 31890];
				}

				// Adjust for current hair color
				for (var i = 0; i < hair.length; i++) {
					hair[i] = hair[i] + parseInt(cm.getPlayer().getHair() % 10);
				}
				cm.sendStyle("Using our special machine, you can preview your new hairstyle. Choose the style you like.", hair);
			}
			if (selection > 0) {
				var color = parseInt(cm.getPlayer().getHair() / 10) * 10;
				hair = [];

				for (var i = 0; i < 8; i++) {
					hair[i] = color + i;
				}
				cm.sendStyle("Using our special machine, you can preview your new hair color. Choose the color you like.", hair);
			}
			select = selection;
			break;
		case 2:
			if (select < 1 && cm.getPlayer().itemQuantity(5150053) || select > 0 && cm.getPlayer().itemQuantity(5151036)) {
				cm.gainItem(select < 1 ? 5150053 : 5151036, -1);
				cm.setHair(hair[selection]);
				cm.sendOk("Your new hairstyle is done. Do you like it?");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, you don’t have the specified membership card. I cannot assist you.");
			cm.dispose();
	}
}
