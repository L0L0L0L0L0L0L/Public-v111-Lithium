/*
    Name:    J.J.
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
			var chat = "Hello, we have the beautiful look you've always desired! The first thing people notice about you is your eyes, and we can help you find the perfect contact lenses for you! #b";
			chat += "\r\n#L0##v5152036##t5152036#";
			cm.sendSimple(chat);
			break;
		case 1:
			var teye = cm.getPlayer().getFace() % 100;
			color = [];

			teye += cm.getPlayer().getGender() < 1 ? 20000 : 21000;
			for (var i = 0; i < 8; i++)
				color[i] = teye + i * 100;
			cm.sendStyle("Using our special machine, you can preview how you look with different contact lenses. Choose the one you like.", color);
			break;
		case 2:
			if (cm.getPlayer().itemQuantity(5152036)) {
				cm.gainItem(5152036, -1);
				cm.setFace(color[selection]);
				cm.sendOk("Your new contact lenses have been applied. Are you satisfied?");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, you don't have the required membership card. We cannot assist you without it.");
			cm.dispose();
	}
}
