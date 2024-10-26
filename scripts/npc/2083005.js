/*
	Name: Spring of Life
	Map: Dark Dragon King Cave Entrance
	Description: 240050400
*/

function start() {
	if (!cm.getPlayer().itemQuantity(4031454)) {
		cm.dispose();
		return;
	}
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough slots in the other items window"));
		cm.dispose();
		return;
	}
	cm.sendOk("You have poured some #bSpring Water#k into the cup.");
	cm.gainItem(4031454, -1);
	cm.gainItem(4031455, 1);
	cm.dispose();
}
