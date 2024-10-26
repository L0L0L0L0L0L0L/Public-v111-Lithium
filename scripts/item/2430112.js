/*
	名字:	奇幻方塊碎片
	地圖:	奇幻方塊碎片
	描述:	特殊消耗品
*/

function start() {
	if (im.getPlayer().itemQuantity(2430112) < 10) {
		im.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Need 10 fragments to make magic powers."));
		im.dispose();
		return;
		}
	if (im.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.CASH).getNumFreeSlot() < 1) {
		im.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Make sure you have enough space in your inventory."));
		im.dispose();
		return;
		}
		im.gainItem(2430112, -10);
		im.gainItem(5062000, 1);
		im.dispose();
}