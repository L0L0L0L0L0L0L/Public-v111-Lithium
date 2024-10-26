/*
    Name:    Pomack
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
			var chat = "I am Pomack, a contact lens beauty expert. I believe your eyes are the most important feature of your body. Let me help you find the perfect cosmetic contact lenses. #b";
			chat += "\r\n#L0##v5152035##t5152035#";
			cm.sendSimple(chat);
			break;
		case 1:
			var teye = cm.getPlayer().getFace() % 100;
			color = [];

			teye += cm.getPlayer().getGender() < 1 ? 20000 : 21000;
			for (var i = 0; i < 8; i++)
				color[i] = teye + i * 100;
			cm.sendYesNo("Would you like to use #v5152035#? You will receive a random pair of cosmetic contact lenses.");
			break;
		case 2:
			if (cm.getPlayer().itemQuantity(5152035)) {
				cm.gainItem(5152035, -1);
				cm.setFace(color[Math.floor(Math.random() * color.length)]);
				cm.sendOk("Your new contact lenses have been applied. Are you satisfied?");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, you don't have the required membership card. We cannot assist you without it.");
			cm.dispose();
	}
}
