/*
	名字:	勒塞倫的書桌
	地圖:	研究所B-1區
	描述:	261020200
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3314)).getStatus() != 1) {
		cm.sendNext("It's a simple, small desk that can only hold small items. The book that was found on the desk revealed a plethora of complex equations that would confuse anyone reading the book...");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().itemQuantity(2022198)) {
		cm.sendNext("Russellon might not be pleased if more pills are taken from here.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
		cm.sendNext("Unable to take the pill because your Item Inventory is full.");
		cm.dispose();
		return;
		}
		cm.sendOk("There seems to be a number of small pills on the desk. Just take one from there...");
		cm.gainItem(2022198, 1);
		cm.dispose();
}