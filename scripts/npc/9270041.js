/*
    Name:    Eileen
    Map:     Fallen City
    Description: 103000000
*/

var ticket = 4031731;
var cost = 20000;

function start() {
	var chat = "Hello, I'm Eileen from Singapore Airlines. How can I assist you today? #b";
	chat += "\r\n#L0#Buy a ticket to Singapore";
	chat += "\r\n#L1#Enter the waiting room";
	cm.sendSimple(chat);
}

function action(mode, type, selection) {
	switch (selection) {
		case 0:
			if (cm.getPlayer().getMeso() < cost) {
				cm.sendOk("Sorry, please make sure you have #b" + cost + "#k mesos.");
				cm.dispose();
				return;
			}
			if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
				cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Insufficient slots in the other item window."));
				cm.dispose();
				return;
			}
			cm.gainMeso(-cost);
			cm.gainItem(ticket, 1);
			cm.sendOk("Thank you for supporting Singapore Airlines.");
			break;
		case 1:
			em = cm.getEventManager("AirPlane");

			if (!cm.getPlayer().itemQuantity(ticket)) {
				cm.sendOk("You don't have #v" + ticket + "#, so I can't let you enter the waiting room.");
				cm.dispose();
				return;
			}
			if (em.getProperty("entry") == "false" && em.getProperty("docked") == "true") {
				cm.sendOk("Dear customer, please note the flight time. Ticket checking stops one minute before departure.");
				cm.dispose();
				return;
			}
			if (em.getProperty("entry") == "false") {
				cm.sendOk("Sorry, the boarding gate closed one minute before departure.");
				cm.dispose();
				return;
			}
			cm.gainItem(ticket, -1);
			cm.getPlayer().changeMap(cm.getMap(540010100), cm.getMap(540010100).getPortal(0));
			break;
	}
	cm.dispose();
}
