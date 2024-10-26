/*
    Name:    Manny
    Map:     New Leaf City - Shopping Center
    Description:    600000001
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
			var chat = "Welcome to the New Leaf City Shopping Center. I am Manny. With our membership card, you can enjoy our professional services. #b";
			chat += "\r\n#L0##v5150053##t5150053#";
			chat += "\r\n#L1##v5151036##t5151036#";
			cm.sendSimple(chat);
			break;
		case 1:
			if (selection < 1) {
				if (cm.getPlayer().getGender() < 1)
					hair = [30700, 30710, 30720, 30730, 30740, 30750, 30760, 30770, 30780, 30790];
				else
					hair = [31700, 31710, 31720, 31730, 31740, 31750, 31760, 31770, 31780, 31790];

				for (var i = 0; i < hair.length; i++)
					hair[i] = hair[i] + parseInt(cm.getPlayer().getHair() % 10); // Read current hair color
				cm.sendStyle("Using our special machine, you can preview your new hairstyle. Choose a style you like.", hair);
			}
			if (selection > 0) {
				var color = parseInt(cm.getPlayer().getHair() / 10) * 10;
				hair = [];

				for (var i = 0; i < 8; i++)
					hair[i] = color + i;
				cm.sendStyle("Using our special machine, you can preview your new hair color. Choose a color you like.", hair);
			}
			select = selection;
			break;
		case 2:
			if (select < 1 && cm.getPlayer().itemQuantity(5150053) || select > 0 && cm.getPlayer().itemQuantity(5151036)) {
				cm.gainItem(select < 1 ? 5150053 : 5151036, -1);
				cm.setHair(hair[selection]);
				cm.sendOk("Your new hairstyle has been applied. Do you like it?");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, you don't have the required membership card. We cannot proceed without it.");
			cm.dispose();
	}
}
