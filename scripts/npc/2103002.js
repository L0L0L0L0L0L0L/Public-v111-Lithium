/*
	名字:	王妃的裝飾櫃
	地圖:	納希宮殿&amp;lt;國王房間&gt;
	描述:	260000303
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3923)).getStatus() != 1) {
		cm.sendNext("A treasure chest where the treasures are stored comes into sight. If you're not careful about opening this, then the guards will chase you down.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().itemQuantity(4031578)) {
		cm.sendNext("If you take more, then the guards might notice something...");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.sendNext("You can't receive the ring because you have too many items. Better check the Etc window of your Item Inventory and make some room.");
		cm.dispose();
		return;
		}
		cm.sendOk("You carefully opened the chest and took out a ring. You better get out of here now...");
		cm.gainItem(4031578, 1);
		cm.dispose();
}