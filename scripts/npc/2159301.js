/*
	名字:	卡普利爾的背包
	地圖:	戒備深嚴的住宅
	描述:	931010010
*/

function start() {
	if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your etc. inventory."));
		cm.dispose();
		return;
		}
		cm.sendNext("#b(You've grabbed Gabrielle's clothes. Deliver them quickly to Albert.)");
		cm.gainItem(4032757, cm.getPlayer().itemQuantity(4032757) ? 0 : 1);
		cm.dispose();
}