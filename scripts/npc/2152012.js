/*
	名字:	鬼靈精
	地圖:	埃德爾斯坦
	描述:	310000000
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case - 1:
		cm.dispose();
		return;
	case 0:
		if (status == 1) {
		cm.sendNext("Huh? So you don't need batteries for recycling? You are foolish to ignore the importance of recycling.");
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
		if (cm.getPlayer().itemQuantity(4032750)) {
			cm.sendNext("Hello. Please line up in the back if you want a balloon from Checky. What? You want a Recyclable Rue Battery? Why are you asking for another one when you already have one?");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23914)).getStatus() != 1) {
			cm.sendOk("Please line up in the back if you want a balloon from Checky.");
			cm.dispose();
			return;
			}
			cm.sendNext("Hello. Stand in line to get a balloon from Checky. Hmm, you seem a little old to still want a balloon, but if you do a good job standing in a straight line, maybe Checky will give you a balloon, too.");
			break;
	case 1:
		cm.sendYesNo("You don't want a balloon? So what do you need? A used Rue Battery? Oh I know, you want to recycle them! Okay, but I can't give them to you for free. I'll give them to you in exchange for Pet Foods.");
		break;
	case 2:
		if (!cm.getPlayer().itemQuantity(2120000) || cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.sendNext("Do you have the Pet Foods? How about emptying some slots in your Etc tab?");
			cm.dispose();
			return;
			}
			cm.gainItem(2120000, -1);
			cm.gainItem(4032750, 1);
			cm.sendNext("Now go reduce, reuse, and recycle.");
			break;
	case 3:
		cm.dispose();
}
}