/*
	名字:	隱藏地圖
	地圖:	被遺忘的黑暗
	描述:	922020000
*/

function enter(pi) {
	if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Please make some space before leaving."));
		return false;
		}
		pi.gainItem(4031448, pi.getPlayer().itemQuantity(4031448) ? 0 : 1);
		pi.getPlayer().changeMap(pi.getMap(220070400), pi.getMap(220070400).getPortal(4)); //遺忘的迴廊
		return true;
}