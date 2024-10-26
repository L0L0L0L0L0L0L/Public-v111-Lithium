/*
    Name:    Seymour
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
			var chat = "Welcome to Wedding Town. I am Seymour. As long as you have our membership card, you can enjoy our professional services. #b";
			chat += "\r\n#L0##v5150019##t5150019#";
			chat += "\r\n#L1##v5151016##t5151016#";
			cm.sendSimple(chat);
			break;
		case 1:
			if (selection < 1) {
				if (cm.getPlayer().getGender() < 1)
					hair = [30000, 30020, 30110, 30130, 30160, 30190, 30240, 30270, 30430];
				else
					hair = [31000, 31030, 31050, 31070, 31090, 31150, 31310, 31910, 34010];

				for (var i = 0; i < hair.length; i++)
					hair[i] = hair[i] + parseInt(cm.getPlayer().getHair() % 10); // Get current hair color
				cm.sendYesNo("Do you want to use #v5150019#? Your current appearance may change to a random new style.");
			}
			if (selection > 0) {
				var color = parseInt(cm.getPlayer().getHair() / 10) * 10;
				hair = [];

				for (var i = 0; i < 8; i++)
					hair[i] = color + i;
				cm.sendYesNo("Do you want to use #v5151016#? Your current appearance may change to a random new style.");
			}
			select = selection;
			break;
		case 2:
			if ((select < 1 && cm.getPlayer().itemQuantity(5150019)) || (select > 0 && cm.getPlayer().itemQuantity(5151016))) {
				cm.gainItem(select < 1 ? 5150019 : 5151016, -1);
				cm.setHair(hair[Math.floor(Math.random() * hair.length)]);
				cm.sendOk("Your new hairstyle has been set. Do you like it?");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, you don't have the required membership card. I can't assist you.");
			cm.dispose();
	}
}
