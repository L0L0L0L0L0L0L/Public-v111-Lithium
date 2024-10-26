/*
    Name: Qi Weng
    Map: Pirate's Treasure Warehouse
    Description: 925110000
*/

function start() {
	if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		cm.sendOk("Due to the blockade by pirates, Qi Weng cannot be rescued.");
		cm.dispose();
		return;
	}
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough space in the Etc. inventory."));
		cm.dispose();
		return;
	}
	cm.gainItem(4032497, cm.getPlayer().itemQuantity(4032497) ? 0 : 1);
	cm.getPlayer().changeMap(cm.getMap(251000000), cm.getMap(251000000).getPortal(0));
	cm.dispose();
}
