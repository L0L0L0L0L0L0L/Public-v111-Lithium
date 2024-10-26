/*
	Name: Lili Xiu Xiu
	Map: Peach Blossom Wonderland Hair Salon
	Description: 250000003
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
			var chat = "Welcome to the Peach Blossom Wonderland Hair Salon. I am Lili Xiu Xiu. Just hold our store's membership card to enjoy our professional services. #b";
			chat += "\r\n#L0##v5150052##t5150052#";
			chat += "\r\n#L1##v5151035##t5151035#";
			cm.sendSimple(chat);
			break;
		case 1:
			if (selection < 1) {
				if (cm.getPlayer().getGender() < 1)
					hair = [30400, 30410, 30420, 30430, 30440, 30450, 30460, 30470, 30480, 30490];
				else
					hair = [31400, 31410, 31420, 31430, 31440, 31450, 31460, 31470, 31480, 31490];

				for (var i = 0; i < hair.length; i++)
					hair[i] = hair[i] + parseInt(cm.getPlayer().getHair() % 10); // Read current hair color
				cm.sendYesNo("Would you like to use #v5150052#? Your current appearance might change to a random new look.");
			}
			if (selection > 0) {
				var color = parseInt(cm.getPlayer().getHair() / 10) * 10;
				hair = [];

				for (var i = 0; i < 8; i++)
					hair[i] = color + i;
				cm.sendYesNo("Would you like to use #v5151035#? Your current appearance might change to a random new look.");
			}
			select = selection;
			break;
		case 2:
			if (select < 1 && cm.getPlayer().itemQuantity(5150052) || select > 0 && cm.getPlayer().itemQuantity(5151035)) {
				cm.gainItem(select < 1 ? 5150052 : 5151035, -1);
				cm.setHair(hair[Math.floor(Math.random() * hair.length)]);
				cm.sendOk("Your new hairstyle has been set. Do you like it?");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, you do not have the required membership card. I'm afraid I cannot assist you.");
			cm.dispose();
	}
}
