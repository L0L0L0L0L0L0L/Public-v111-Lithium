/*
	Name: Natalie the Hairstylist
	Map: Archer Village Hair Salon
	Description: 100000104
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
			var chat = "Welcome to the Archer Village Hair Salon, I'm Natalie the hairstylist. As long as you have a membership card for our salon, you can enjoy our professional services.#b";
			chat += "\r\n#L0##v5150053##t5150053#";
			chat += "\r\n#L1##v5151036##t5151036#";
			cm.sendSimple(chat);
			break;
		case 1:
			if (selection < 1) {
				if (cm.getPlayer().getGender() < 1)
					hair = [30000, 30010, 30020, 30030, 30040, 30050, 30060, 30070, 30080, 30090];
				else
					hair = [31000, 31010, 31020, 31030, 31040, 31050, 31060, 31070, 31080, 31090];

				for (var i = 0; i < hair.length; i++)
					hair[i] = hair[i] + parseInt(cm.getPlayer().getHair() % 10); // Get the current hair color
				cm.sendStyle("With our special machine, you can preview how you’ll look with your new hairstyle. Choose the one you like.", hair);
			}
			if (selection > 0) {
				var color = parseInt(cm.getPlayer().getHair() / 10) * 10;
				hair = [];

				for (var i = 0; i < 8; i++)
					hair[i] = color + i;
				cm.sendStyle("With our special machine, you can preview how you'll look after dyeing your hair. Choose a color you like.", hair);
			}
			select = selection;
			break;
		case 2:
			if (select < 1 && cm.getPlayer().itemQuantity(5150053) || select > 0 && cm.getPlayer().itemQuantity(5151036)) {
				cm.gainItem(select < 1 ? 5150053 : 5151036, -1);
				cm.setHair(hair[selection]);
				cm.sendOk("Your new hairstyle is done! Do you like it?");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, without the specified membership card, I can't offer you my services.");
			cm.dispose();
	}
}
