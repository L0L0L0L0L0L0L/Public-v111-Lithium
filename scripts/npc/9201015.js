/*
    Name:    Saleman
    Map:     Wedding Town
    Description:    680000000
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
			var chat = "Welcome to Wedding Town. I am Saleman. As long as you have our membership card, you can enjoy our professional services. #b";
			chat += "\r\n#L0##v5150020##t5150020#";
			chat += "\r\n#L1##v5151017##t5151017#";
			cm.sendSimple(chat);
			break;
		case 1:
			if (selection < 1) {
				if (cm.getPlayer().getGender() < 1)
					hair = [30050, 30300, 30410, 30450, 30510, 30570, 30580, 30590, 30660, 30910];
				else
					hair = [31150, 31220, 31260, 31310, 31420, 31480, 31490, 31580, 31590, 31610, 31630];

				for (var i = 0; i < hair.length; i++)
					hair[i] = hair[i] + parseInt(cm.getPlayer().getHair() % 10); // Get current hair color
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
			if ((select < 1 && cm.getPlayer().itemQuantity(5150020)) || (select > 0 && cm.getPlayer().itemQuantity(5151017))) {
				cm.gainItem(select < 1 ? 5150020 : 5151017, -1);
				cm.setHair(hair[selection]);
				cm.sendOk("Your new hairstyle has been set. Do you like it?");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, you don't have the required membership card. I can't assist you.");
			cm.dispose();
	}
}
