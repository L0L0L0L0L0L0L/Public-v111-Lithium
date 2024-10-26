/*
	名字:	小可愛
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
		cm.sendNext("I guess you have a better way of obtaining a Recyclable Rue Battery.");
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
			cm.sendNext("Please make good use of the Recyclable Rue Battery!");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23914)).getStatus() != 1) {
			cm.sendOk("Just looking at a balloon makes me happy. l feel like l could float into the air, too! Hehe.");
			cm.dispose();
			return;
			}
			cm.sendNext("I'm so happy I got a balloon! If I get another one, I'll be sure to give it to you. Huh? You don't want a balloon? So what do you want?");
			break;
	case 1:
		cm.sendYesNo("Oh. You're collecting Recyclable Batteries. I have one... Okay, how about this! I will give you the battery if you bring me one Morning Glory. What do you think?");
		break;
	case 2:
		if (!cm.getPlayer().itemQuantity(4000596) || cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.sendNext("Talk to me again with one Morning Glory in your possession and at least one slot available in the Etc tab of your inventory.");
			cm.dispose();
			return;
			}
			cm.gainItem(4000596, -1);
			cm.gainItem(4032750, 1);
			cm.sendNext("Doesn't recycling make you feel good?");
			break;
	case 3:
		cm.dispose();
}
}