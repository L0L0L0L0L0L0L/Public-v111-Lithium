/*
	名字:	可疑男子
	地圖:	通往地底的路
	描述:	105100000
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
		if (status < 1) {
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
		cm.sendSimple("You again? I sure see you a lot. What do you want? \r\n\r\n#L0##bPlease make Leather Shoes with 20 pieces of Balrog Leather.#l");
		break;
	case 1:
		if (cm.getPlayer().itemQuantity(4001261) < 20) {
			cm.sendNext("This isn't enough Balrog Leather to make anything. Shoes just aren't going to happen.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.sendNext("See if you have enough material or if you have enough space available in Equip.");
			cm.dispose();
			return;
			}
			cm.gainItem(4001261, -20);
			cm.gainItem(1072375, 1);
			cm.sendOk("What do you think? Not a bad pair of shoes right? They may look plain, but that Balrog Leather makes them tough as nails!");
			cm.dispose();
}
}