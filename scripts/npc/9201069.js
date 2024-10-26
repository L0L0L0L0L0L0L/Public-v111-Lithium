/*
    Name:    Lance
    Map:     New Leaf City - Shopping Mall
    Description:    600000001
*/

var status;
var face;

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
			var chat = "Welcome to the New Leaf City Shopping Mall! I'm Lance. With a membership card from our store, you can enjoy our professional services. #b";
			chat += "\r\n#L1##v5152057##t5152057#";
			cm.sendSimple(chat);
			break;
		case 1:
			if (cm.getPlayer().getGender() < 1) {
				face = [20050, 20052, 20053, 20055, 20056, 20057];
			} else {
				face = [21052, 21053, 21054, 21055, 21058, 21062];
			}
			cm.sendStyle("Use our special machine to preview your new look. Choose the style you like.", face);
			break;
		case 2:
			if (cm.getPlayer().itemQuantity(5152057) > 0) {
				cm.gainItem(5152057, -1);
				cm.setFace(face[selection]);
				cm.sendOk("Your new look has been set. Do you like it?");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, you don't have the required membership card. I can't assist you.");
			cm.dispose();
	}
}
