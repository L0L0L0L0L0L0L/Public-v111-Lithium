/*
	名字:	畫框
	地圖:	失蹤煉金術士的家
	描述:	261000001
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3322)).getStatus() != 1) {
		cm.sendNext("It's a picture frame that features an alchemist standing in a classy manner. Is he the missing alchemist?");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().itemQuantity(4031697)) {
		cm.sendNext("The frame only contained the picture of De Lang.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.sendNext("Unable to take what's inside the frame because your Item Inventory is full.");
		cm.dispose();
		return;
		}
		cm.gainItem(4031697, 1);
		cm.sendOk("The hook behind the frame was unhooked, revealing a secret space within the frame. There inside, a silver pendant was found. After carefully removing the pendant, the frame was closed and placed back on the table.");
		cm.dispose();
}