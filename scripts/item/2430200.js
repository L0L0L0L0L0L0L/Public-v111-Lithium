/*
	名字:	閃電石
	地圖:	閃電石
	描述:	任務消耗品
*/

function start() {
	if (im.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31152)).getStatus() != 2) {
		im.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You have no idea how to use it."));
		im.dispose();
		return;
		}
	if (im.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		im.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Please make some space."));
		im.dispose();
		return;
		}
	if (!(im.getPlayer().itemQuantity(4000660) && im.getPlayer().itemQuantity(4000661) && im.getPlayer().itemQuantity(4000662) && im.getPlayer().itemQuantity(4000663))) {
		im.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "There needs to be 1 of each Stone for a Dream Key."));
		im.dispose();
		return;
		}
		for (var i = 4000660; i < 4000664; i++)
		im.gainItem(i, -1);
		im.gainItem(2430200, -1);
		im.gainItem(4032923, 1);
		im.dispose();
}