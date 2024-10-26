/*
    Name: Mazla
    Map: Nashi Oasis Town
    Description: 260000000
*/

var status;
var select;

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
			var chat = "Welcome to Nashi Oasis Town. I am Mazla. Just hold our membership card, and you can enjoy our professional services. #b";
			chat += "\r\n#L0##v5150053##t5150053#";
			chat += "\r\n#L1##v5151036##t5151036#";
			cm.sendSimple(chat);
			break;
		case 1:
			if (selection < 1) {
				// For hair styling
				if (cm.getPlayer().getGender() < 1)
					hair = [30510, 30520, 30530, 30540, 30550, 30560, 30570, 30580, 30590];
				else
					hair = [31510, 31520, 31450, 31540, 31550, 31560, 31570, 31580, 31590];

				for (var i = 0; i < hair.length; i++)
					hair[i] = hair[i] + parseInt(cm.getPlayer().getHair() % 10); // Read current hair color
				cm.sendStyle("Use the special machine to preview your new hairstyle. Choose a style you like.", hair);
			}
			if (selection > 0) {
				// For hair coloring
				var color = parseInt(cm.getPlayer().getHair() / 10) * 10;
				hair = [];

				for (var i = 0; i < 8; i++)
					hair[i] = color + i;
				cm.sendStyle("Use the special machine to preview your new hair color. Choose a color you like.", hair);
			}
			select = selection;
			break;
		case 2:
			if ((select < 1 && cm.getPlayer().itemQuantity(5150053)) || (select > 0 && cm.getPlayer().itemQuantity(5151036))) {
				cm.gainItem(select < 1 ? 5150053 : 5151036, -1);
				cm.setHair(hair[selection]);
				cm.sendOk("Your new hairstyle has been completed. Do you like it?");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, you don't have the required membership card. Unfortunately, we cannot assist you with this.");
			cm.dispose();
			break;
	}
}
