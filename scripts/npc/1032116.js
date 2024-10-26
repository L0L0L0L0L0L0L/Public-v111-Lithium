/*
	名字:	魔法藥水圖鑒
	地圖:	魔法森林圖書館
	描述:	101000003
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2757)).getStatus() != 1) {
		cm.sendOk("#b(It's a book on potions.)");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().itemQuantity(4033005)) {
		cm.sendNext("You already got a Magical Potion Guide.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.sendNext("I found a Magical Potion Guide, but my Inventory is too full to take it.");
		cm.dispose();
		return;
		}
		cm.gainItem(4033005, 1);
		cm.dispose();
}