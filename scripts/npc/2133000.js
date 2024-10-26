/*
    Name:    Eilin
    Map:     Deep Elven Forest
    Description: 300030100
*/

function start() {
	cm.sendSimple("#e<Party Quest: Toxic Fog Forest>#n\r\n\r\nThis forest was once full of joy, but since a monster arrived, it has disrupted the tranquility of the forest. I have been waiting for a hero to help restore the forest to its former state.\r\n\r\nNumber of players: 1~6 \r\nLevel range: 70~250 \r\nTime limit: 20 minutes\r\n#L0##bEnter the quest map#l\r\n#L1#Exchange #z1032060##l\r\n#L2#Exchange #z1032061##l\r\n#L3#Exchange #z1032101##l");
}

function action(mode, type, selection) {
	if (mode > 0 && selection < 1) {
		if (cm.getPlayer().getParty() == null) {
			cm.sendOk("Sorry, the monsters inside are very dangerous. I cannot let you venture alone.");
			cm.dispose();
			return;
		}
		if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("If you want to undertake this quest, please have your party leader speak to me.");
			cm.dispose();
			return;
		}
		var chat = "Sorry, your party does not meet the entry requirements. Some members are not eligible to attempt this quest or they are not in this map.\r\n\r\nNumber of players: 1~6 \r\nLevel range: 70~250\r\n\r\n";
		var disqualified = 0;
		var party = cm.getPlayer().getParty().getMembers();
		for (var i = 0; i < party.size(); i++) {
			if (party.get(i).getLevel() < 70 || party.get(i).getLevel() > 250 || party.get(i).getMapid() != 300030100 || party.size() < 1) {
				chat += "#bName: " + party.get(i).getName() + " / (Level: " + party.get(i).getLevel() + ") / Map: #m" + party.get(i).getMapid() + "#\r\n";
				disqualified++;
			}
		}
		if (disqualified != 0) {
			cm.sendOk(chat);
			cm.dispose();
			return;
		}
		var em = cm.getEventManager("Ellin");
		var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
			cm.dispose();
			return;
		}
		cm.sendOk("The Toxic Fog Forest quest is currently in progress. Please try another channel.");
	}
	if (mode > 0 && selection < 4) {
		var item = [1032060, 1032061, 1032101];
		var qty = [10, 20, 40];

		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough slots in the equipment inventory"));
			cm.dispose();
			return;
		}
		if (cm.getPlayer().itemQuantity(4001198) < qty[selection -1]) {
			cm.sendOk("To exchange for #b#z" + item[selection -1] + "##k, you need #r" + qty[selection -1] + "#k #v4001198##b#t4001198##k.");
			cm.dispose();
			return;
		}
		cm.gainItem(item[selection -1], 1);
		cm.gainItem(4001198, -qty[selection -1]);
		cm.sendOk("Thank you for your help with the Eilin Forest. Please take your item.");
	}
	cm.dispose();
}
