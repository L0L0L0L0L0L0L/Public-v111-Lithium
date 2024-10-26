/*
	名字:	空白指南針
	地圖:	空白指南針
	描述:	特殊消耗品
*/

function start() {
	if (!(im.getPlayer().itemQuantity(3994102) && im.getPlayer().itemQuantity(3994103) && im.getPlayer().itemQuantity(3994104) && im.getPlayer().itemQuantity(3994105))) {
		im.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Collecting compasses with text N E W S can make gold compasses."));
		im.dispose();
		return;
		}
	if (im.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
		im.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Make sure you have enough space in your inventory."));
		im.dispose();
		return;
		}
		for (var i = 3994102; i < 3994106; i++)
		im.gainItem(i, -1);
		im.gainItem(2430007, -1);
		im.gainItem(2430008, 1);
		im.dispose();
}