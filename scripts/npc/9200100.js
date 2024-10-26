/*
    Name: Dr. Lenu
    Map: Ellinia Plastic Surgery
    Description: 100000103
*/

var status;
var select;
var color = [];

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
			var chat = "Hello! We have the look you've always dreamed of~! The first thing people notice about you is your eyes, and we can help you find the perfect cosmetic lenses!#b";
			chat += "\r\n#L0##v5152010##t5152010# (Random Eye Color)";
			chat += "\r\n#L1##v5152013##t5152013# (Choose Eye Color)";
			cm.sendSimple(chat);
			break;

		case 1:
			// Determine base face ID for the player's current gender
			var baseEye = cm.getPlayer().getFace() % 100;
			baseEye += cm.getPlayer().getGender() < 1 ? 20000 : 21000;

			// Prepare color options (8 options based on gender)
			for (var i = 0; i < 8; i++) {
				color[i] = baseEye + i * 100;
			}

			// Random eye color option
			if (selection == 0) {
				cm.sendYesNo("Would you like to use #v5152010#? You will receive a random cosmetic lens.");
			}

			// Choose eye color option
			if (selection == 1) {
				cm.sendStyle("Using this special machine, you can preview and choose the cosmetic lens you like.", color);
			}

			select = selection;
			break;

		case 2:
			// Check if the player has the appropriate coupon
			if ((select == 0 && cm.getPlayer().itemQuantity(5152010) > 0) ||
				(select == 1 && cm.getPlayer().itemQuantity(5152013) > 0)) {

				// Use random cosmetic lens coupon
				if (select == 0) {
					cm.gainItem(5152010, -1);
					cm.setFace(color[Math.floor(Math.random() * color.length)]);
				}
				// Use selectable cosmetic lens coupon
				else if (select == 1) {
					cm.gainItem(5152013, -1);
					cm.setFace(color[selection]);
				}

				cm.sendOk("Your new cosmetic lenses have been applied. Do you like your new look?");
				cm.dispose();
			} else {
				cm.sendOk("Sorry, without the proper membership card, I cannot offer my services.");
				cm.dispose();
			}
			break;
	}
}
