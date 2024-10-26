/*
    Name:    Robert
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
			var chat = "I am a lens beautician in Wedding Town. I believe your eyes are the most important feature of your body, so let me provide you with a suitable lens. #b";
			chat += "\r\n#L0##v5152025##t5152025#";
			chat += "\r\n#L1##v5152026##t5152026#";
			cm.sendSimple(chat);
			break;
		case 1:
			var teye = cm.getPlayer().getFace() % 100;
			var color = [];

			teye += cm.getPlayer().getGender() < 1 ? 20000 : 21000;
			for (var i = 0; i < 8; i++) {
				color[i] = teye + i * 100;
			}
			if (selection < 1) {
				cm.sendYesNo("Do you want to use #v5152025#? You will randomly receive a pair of beautiful lenses.");
			}
			if (selection > 0) {
				cm.sendStyle("Using our special machine, you can preview your appearance with the new lenses. Choose the one you like.", color);
			}
			select = selection;
			break;
		case 2:
			if ((select < 1 && cm.getPlayer().itemQuantity(5152025)) || (select > 0 && cm.getPlayer().itemQuantity(5152026))) {
				cm.gainItem(select < 1 ? 5152025 : 5152026, -1);
				cm.setFace(select < 1 ? color[Math.floor(Math.random() * color.length)] : color[selection]);
				cm.sendOk("Your new lenses have been set. Do you like them?");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, you don't have the required membership card. I can't assist you.");
			cm.dispose();
	}
}
