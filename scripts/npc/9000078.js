/*
    Name: Yang En
    Map: Golden Temple
    Description: 950100000
*/

function start() {
	var chat = "Welcome to the Golden Temple. Do you have a visiting ticket? I can offer a discount here. #b";
	chat += "\r\n#L0#\t\tExchange 10 #z4032605# for #z4001431#";
	chat += "\r\n#L1##v4001431##t4001431##k#b 1,000,000 mesos";
	chat += "\r\n#L2##v4001432##t4001432##k#b 3,000,000 mesos (Unlimited entry within 1 hour)";
	cm.sendSimple(chat);
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Insufficient space in the other item inventory."));
			cm.dispose();
			return;
		}
		if (selection == 0) {
			if (cm.getPlayer().itemQuantity(4032605) < 10) {
				cm.sendOk("Sorry, you need 10 #t4032605# to exchange for #t4001431#.");
				cm.dispose();
				return;
			}
			cm.gainItem(4032605, -10);
			cm.gainItem(4001431, 1);
			cm.sendOk("Thank you for your purchase. Have a pleasant journey.");
			return;
		}
		if (cm.getPlayer().getMeso() < (selection == 1 ? 1000000 : 3000000)) {
			cm.sendOk("Sorry, please make sure you have enough mesos.");
			cm.dispose();
			return;
		}
		cm.gainMeso(-(selection == 1 ? 1000000 : 3000000));
		cm.gainItem(selection == 1 ? 4001431 : 4001432, 1, selection == 1 ? -1 : 1);
		cm.sendOk("Thank you for your purchase. Have a pleasant journey.");
	}
	cm.dispose();
}
