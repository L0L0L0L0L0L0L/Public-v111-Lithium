/*
	名字:	潔淨的樹根
	地圖:	大木林之巔
	描述:	101020300
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20716)).getStatus() == 1) {
	if (cm.getPlayer().itemQuantity(4032142)) {
		cm.sendNext("You already got a Clear Tree Sap.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.sendNext("I found a Clear Tree Sap, but my Inventory is too full to take it.");
		cm.dispose();
		return;
		}
		cm.sendNext("You bottled up some of the clear tree sap.  #b#t4032142##k #v4032142#");
		cm.gainItem(4032142, 1);
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24078)).getStatus() == 1) {
	if (cm.getPlayer().itemQuantity(4032967)) {
		cm.sendNext("You already got a Clean Water.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.sendNext("I found a Clean Water, but my Inventory is too full to take it.");
		cm.dispose();
		return;
		}
		cm.sendNext("You got Clean Water from the top of the stump.");
		cm.gainItem(4032967, 1);
		cm.dispose();
		return;
		}
		cm.sendOk("A sweet scent of trees tickles my nose.");
		cm.dispose();
}