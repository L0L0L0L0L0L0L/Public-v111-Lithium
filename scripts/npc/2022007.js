/*
	名字:	冰河
	地圖:	冰封絕壁
	描述:	921120700
*/

function start() {
	if (!cm.getPlayer().itemQuantity(4032649)) {
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "消耗道具視窗的欄位不足"));
		cm.dispose();
		return;
		}
		cm.gainItem(4032649, -1);
		cm.gainItem(2022698, 1);
		cm.sendOk("拿到了一些#b#z2022698##k。");
		cm.dispose();
}