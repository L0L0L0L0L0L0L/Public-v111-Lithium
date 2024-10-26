/*
	名字:	沃美妮
	地圖:	弓箭手村護膚中心
	描述:	100000105
*/

var skin = Array(0, 1, 2, 3, 4, 5);

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
		var chat = "Well, hello! Welcome to the Henesys Skin-Care! Would you like to have a firm, tight, healthy looking skin like mine?  With a #b#t5153015##k, you can let us take care of the rest and have the kind of skin you've always wanted~!#b";
		chat += "\r\n#L1##v5153015##t5153015#";
		cm.sendSimple(chat);
		break;
	case 1:
		cm.sendStyle("With our specialized machine, you can see yourself after the treatment in advance. What kind of skin-treatment would you like to do? Choose the style of your liking.", skin);
		break;
	case 2:
		if (cm.getPlayer().itemQuantity(5153015)) {
			cm.gainItem(5153015, -1);
			cm.setSkin(selection);
			cm.sendOk("Enjoy your new and improved skin!");
			cm.dispose();
			return;
			}
			cm.sendOk("Um... you don't have the skin-care coupon you need to receive the treatment. Sorry, but I am afraid we can't do it for you...");
			cm.dispose();
}
}