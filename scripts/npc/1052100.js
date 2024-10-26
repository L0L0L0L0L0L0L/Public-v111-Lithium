/*
	Name: Owner Qian
	Map: Corrupted City Hair Salon
	Description: 103000005
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
			var chat = "Welcome to the Corrupted City Hair Salon! I'm Owner Qian. With a membership card, you can enjoy our professional services. #b";
			chat += "\r\n#L0##v5150053##t5150053#";
			chat += "\r\n#L1##v5151036##t5151036#";
			cm.sendSimple(chat);
			break;
		case 1:
			if (selection < 1) {
				if (cm.getPlayer().getGender() < 1)
					hair = [30100, 30110, 30120, 30130, 30140, 30150, 30160, 30170, 30180, 30190];
				else
					hair = [31100, 31110, 31120, 31130, 31140, 31150, 31160, 31170, 31180, 31190];

				for (var i = 0; i < hair.length; i++)
					hair[i] = hair[i] + parseInt(cm.getPlayer().getHair() % 10);
				cm.sendStyle("Using our machine, you can preview your new hairstyle. Choose a style you like.", hair);
			}
			if (selection > 0) {
				var color = parseInt(cm.getPlayer().getHair() / 10) * 10;
				hair = [];

				for (var i = 0; i < 8; i++)
					hair[i] = color + i;
				cm.sendStyle("Using our machine, you can preview your new hair color. Choose a color you like.", hair);
			}
			select = selection;
			break;
		case 2:
			if (select < 1 && cm.getPlayer().itemQuantity(5150053) || select > 0 && cm.getPlayer().itemQuantity(5151036)) {
				cm.gainItem(select < 1 ? 5150053 : 5151036, -1);
				cm.setHair(hair[selection]);
				cm.sendOk("Your new hairstyle is ready! Do you like it?");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, without the specified membership card, I cannot serve you.");
			cm.dispose();
	}
}
