/*
	名字:	混濁的玻璃珠
	地圖:	混濁的玻璃珠
	描述:	任務消耗品
*/

function start() {
	if (im.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		im.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Please make some space."));
		im.dispose();
		return;
		}
		im.gainItem(2430071, -1);
	if (Math.random() < 0.2) {
		im.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You've retrieved a Mirror of Insight from the shattered Opalescent Glass Marble."));
		im.gainItem(4032616, 1);
		im.dispose();
		return;
		}
		im.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The Opalescent Glass Marble has shattered. Nothing is inside."));
		im.dispose();
}