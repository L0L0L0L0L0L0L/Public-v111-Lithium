/*
	名字:	知識的殿堂
	地圖:	櫻花處
	描述:	101050000
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24058)).getStatus() != 1) {
		cm.dispose();
		return;
		}
	if (cm.getPlayer().itemQuantity(4032963)) {
		cm.sendOk("You already have the Monster Picture Book.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.sendNext("I got the Monster Picture Book, but I don't have room in, my bag for it.");
		cm.dispose();
		return;
		}
		cm.sendNext("(You took the Monster Picture Book from the library. You can take the #bMysterious Portal#k to get back to #bPerion#k and give the item to #bWinston#k. The Mysterious Portal is on the right side of town.)");
		cm.gainItem(4032963, 1);
		cm.dispose();
}