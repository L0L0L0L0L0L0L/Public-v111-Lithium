/*
	名字:	卡帕萊特的書櫥
	地圖:	熄火的研究室
	描述:	926120000
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3309)).getStatus() != 1) {
		cm.sendNext("Can't see anything. It's pitch black inside.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().itemQuantity(4031708)) {
		cm.sendNext("In the midst of darkness, you can feel a bookshelf on your finger tips... It must be that bookshelf from before. There's no use rummaging through the same thing over again, so you might as well leave this place.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.sendNext("Unable to take the book from the bookshelf due to your inventory being full...");
		cm.dispose();
		return;
		}
		cm.sendNext("(In the midst of darkness, you can feel a bookshelf on your finger tips... Looking closely, there appears to be a bundle of documents. This must be the document Bedin was talking about. Secure the document and head back to Bedin.");
		cm.gainItem(4031708, 1);
		cm.dispose();
}