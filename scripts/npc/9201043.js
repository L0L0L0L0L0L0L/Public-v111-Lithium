/*
    Name:    Hero Amias
    Map:     Amias's Training Grounds
    Description:    670010000
*/

function start() {
	cm.sendSimple("Hello, I am #b#p" + cm.getNpc() + "##k. Are you interested in my program?\r\n#L0##bEnter the Amias Challenge#l\r\n#L1#Exchange 10 keys for a ticket#l");
}

function action(mode, type, selection) {
	switch (selection) {
		case 0:
			if (cm.getPlayer().itemQuantity(4031592) > 0) {
				cm.getPlayer().changeMap(cm.getMap(670010100), cm.getMap(670010100).getPortal(0));
				cm.gainItem(4031592, -1);
				cm.dispose();
				return;
			}
			cm.sendOk("You must have a #v4031592##b#t4031592##k for me to let you enter.");
			break;
		case 1:
			if (cm.getPlayer().itemQuantity(4031593) < 10) {
				cm.sendOk("To exchange for a #v4031592##b#t4031592##k, you need 10 #v4031593##b#t4031593##k.");
				cm.dispose();
				return;
			}
			if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
				cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough slots in the other items inventory."));
				cm.dispose();
				return;
			}
			cm.gainItem(4031592, 1);
			cm.gainItem(4031593, -10);
			cm.sendOk("Here is your #v4031592##b#t4031592##k. Take good care of it.");
			break;
	}
	cm.dispose();
}
