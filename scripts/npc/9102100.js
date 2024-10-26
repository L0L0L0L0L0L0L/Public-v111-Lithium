/*
	Name:	Pet Trainer 1
	Map:	Pet Park
	Description:	100000202
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(4646)).getStatus() != 1) {
		cm.sendOk("There's something covered by grass.");
		cm.dispose();
		return;
	}
	if (cm.getPlayer().itemQuantity(4031921)) {
		cm.sendOk("What is this... um... it contains pet waste.");
		cm.dispose();
		return;
	}
	cm.sendYesNo("I see something covered by grass. Should I take it out?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough space in the other items window."));
			cm.dispose();
			return;
		}
		cm.sendOk("I found something hidden by #b#p1012006##k... it's a note.");
		cm.gainItem(4031921, 1);
	}
	cm.dispose();
}
