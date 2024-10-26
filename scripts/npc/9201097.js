/*
    Name:    Yoku
    Map:     Valley of the Dead
    Description:    610010004
*/

var item = [4032007, 4032006, 4032008, 4032009];
var Prizes = [2022042, 2022043, 2022060, 2022061, 2022062, 2022068, 2022069, 2022071, 2022072, 2022073, 2022094, 2022100, 2022101, 2022102, 2022112, 2022119, 2022153, 2022154, 2022156, 2022179, 2022181, 2022182, 2022185, 2022189, 2022190, 2022193, 2022194, 2022195, 2022265, 2022280, 2022285];

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
			if (status < 3) {
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
			var chat = "Hello, I am Yoku. If you collect 100 of any of these items, I can exchange them for something else. How about it? #b";
			for (var i = 0; i < item.length; i++)
				chat += "\r\n#L" + i + "##v" + item[i] + "##z" + item[i] + "##l";
			cm.sendSimple(chat);
			break;
		case 1:
			select = selection;
			cm.sendYesNo("Are you sure you want to exchange #r100#k#b#t" + item[selection] + "##k for something else?");
			break;
		case 2:
			var x = (select == 0 || select == 1) ? 4 : 6;
			var itemid = Math.floor(Math.random() * Prizes.length);

			if (cm.getPlayer().itemQuantity(item[select]) < 100) {
				cm.sendOk("Hey there! You don't have enough #t" + item[select] + "#.");
				cm.dispose();
				return;
			}
			if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
				cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Insufficient slots in the Use tab."));
				cm.dispose();
				return;
			}
			cm.sendOk("Oh! Great job! I think we might become good friends.");
			cm.gainItem(item[select], -100);
			cm.gainExp(100 * cm.getPlayer().getLevel());
			cm.gainItem(Prizes[itemid], x);
			cm.dispose();
			break;
	}
}
