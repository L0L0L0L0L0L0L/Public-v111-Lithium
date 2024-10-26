/*
	名字:	獅子王的獎牌
	地圖:	獅子王的獎牌
	描述:	特殊消耗品
*/

function start() {
	if (im.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		im.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Please make some space."));
		im.dispose();
		return;
		}
	if (im.getPlayer().itemQuantity(4000630) < 50) {
		im.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "There needs to be 50 Purification Totems for a Noble Lion King Medal, 100 for Royal Lion King Medal."));
		im.dispose();
		return;
		}
		im.gainItem(2430158, -1);
		im.gainItem(im.getPlayer().itemQuantity(4000630) < 100 ? 4310009 : 4310010, 1);
		im.gainItem(4000630, im.getPlayer().itemQuantity(4000630) < 100 ? -50 : -100);
		im.dispose();
}