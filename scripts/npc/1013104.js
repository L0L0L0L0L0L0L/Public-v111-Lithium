/*
	名字:	雞蛋桶
	地圖:	前院
	描述:	100030102
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22007)).getStatus() != 1) {
		cm.sendOk("#b(You don't need to take an egg now.)");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().itemQuantity(4032451)) {
		cm.sendNext("#b(You have already obtained an Egg. Take the Egg you have and give it to Utah.)");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.sendNext("(You cannot carry any more items because your Inventory is full. Empty a slot in your Etc window and try again.)");
		cm.dispose();
		return;
		}
		cm.sendNext("#b(You have obtained an Egg. Deliver it to Utah.)");
		cm.gainItem(4032451, 1);
		cm.dispose();
}