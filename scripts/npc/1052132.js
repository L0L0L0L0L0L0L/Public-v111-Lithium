/*
	名字:	名藥店的抽屜4
	地圖:	墮落城市藥店
	描述:	103000002
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2852)).getStatus() != 1) {
		cm.sendOk("You can't open the drawer without permission.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().itemQuantity(4033036)) {
		cm.sendNext("You already took the item from the drawer.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.sendNext("Make sure you have enough space in your Etc inventory for the First-Aid Medicine.");
		cm.dispose();
		return;
		}
		cm.sendNext("You take the First-Aid Medicine out of the drawer.");
		cm.gainItem(4033036, 1);
		cm.dispose();
}