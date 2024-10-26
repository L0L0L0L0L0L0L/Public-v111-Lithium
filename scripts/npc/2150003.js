/*
    Name:    Pabio
    Map:     Edelstein Hair Salon
    Description: 310000003
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
			var chat = "Welcome to the Edelstein Hair Salon. I am Pabio. Just have a membership card from our shop, and you can enjoy our professional services. #b";
			chat += "\r\n#L0##v5150053##t5150053#";
			chat += "\r\n#L1##v5151036##t5151036#";
			cm.sendSimple(chat);
			break;
		case 1:
			if (selection < 1) {
				if (cm.getPlayer().getGender() < 1)
					hair = [30900, 30910, 30920, 30930, 30940, 30950, 30990];
				else
					hair = [31910, 31920, 31930, 31940, 31950, 31990];

				for (var i = 0; i < hair.length; i++)
					hair[i] = hair[i] + parseInt(cm.getPlayer().getHair() % 10); // Read current hair color
				cm.sendStyle("Using our specialized machine, you can preview your appearance after the haircut. Choose a style you like.", hair);
			} else {
				var color = parseInt(cm.getPlayer().getHair() / 10) * 10;
				hair = [];

				for (var i = 0; i < 8; i++)
					hair[i] = color + i;
				cm.sendStyle("Using our specialized machine, you can preview your appearance after the dye job. Choose a color you like.", hair);
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
			cm.sendOk("Sorry, you do not have the required membership card. I'm afraid we cannot assist you.");
			cm.dispose();
	}
}
