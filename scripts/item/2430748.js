/*
	名字:	高級融合票碎片
	地圖:	高級融合票碎片
	描述:	特殊消耗品
*/

function start() {
	if (im.getPlayer().itemQuantity(2430748) < 20) {
		im.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Need 20 fragments to make Premium Fusion Ticket."));
		im.dispose();
		return;
		}
	if (im.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		im.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Make sure you have enough space in your inventory."));
		im.dispose();
		return;
		}
		im.gainItem(2430748, -20);
		im.gainItem(4420000, 1);
		im.dispose();
}