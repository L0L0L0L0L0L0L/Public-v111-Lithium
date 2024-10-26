/*
	Name: Jian
	Map: Hidden Tower Entrance <Preparation Map>
	Description: 921160000
*/

function start() {
	var chat = "#e<Party Quest: Prison Break>#n \r\n\r\nAlthough I want to escape right away, I can't refuse his request. In this city, people trapped in the aerial prison are looking for help to escape.\r\n\r\n Number of players: 2~6 \r\n Level range: 120+ \r\n Time limit: 20 minutes#b";
	chat += "\r\n#L0#Enter the quest map";
	chat += "\r\n#L1#Exchange for #z1132094#";
	chat += "\r\n#L2#Exchange for #z1132095#";
	chat += "\r\n#L3#Exchange for #z1132096#";
	chat += "\r\n#L4#Exchange for #z1132097#";
	cm.sendSimple(chat);
}

function action(mode, type, selection) {
	if (mode > 0 && selection < 1) {
		if (cm.getPlayer().getParty() == null) {
			cm.sendOk("Sorry, the monsters inside are dangerous. I cannot let you go on the adventure alone.");
			cm.dispose();
			return;
		}
		if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("If you want to undertake this quest, please ask your party leader to talk to me.");
			cm.dispose();
			return;
		}
		var chat = "Sorry, your party size does not meet the entry requirements. Some members are either not eligible for this quest or not in this map.\r\n\r\nNumber of players: 2~6 \r\nLevel range: 120+ \r\n\r\n";
		var chenhui = 0;
		var party = cm.getPlayer().getParty().getMembers();
		for (var i = 0; i < party.size(); i++) {
			if (party.get(i).getLevel() < 120 || party.get(i).getMapid() != 921160000 || party.size() < 2) {
				chat += "#bName: " + party.get(i).getName() + " / (Level: " + party.get(i).getLevel() + ") / Map: #m" + party.get(i).getMapid() + "#\r\n";
				chenhui++;
			}
		}
		if (chenhui != 0) {
			cm.sendOk(chat);
			cm.dispose();
			return;
		}
		var em = cm.getEventManager("Prison");
		var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
			cm.dispose();
			return;
		}
		cm.sendOk("The prison break quest is already in progress. Please try another channel.");
		cm.dispose();
	}
	if (mode > 0 && selection < 5) {
		if (cm.getPlayer().itemQuantity(4001534) < 20) {
			cm.sendOk("Exchanging for #b#z" + (1132093 + selection) + "##k requires 20 #v4001534##b#t4001534##k.");
			cm.dispose();
			return;
		}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Insufficient slots in the Equipment inventory"));
			cm.dispose();
			return;
		}
		cm.gainItem(1132093 + selection, 1);
		cm.gainItem(4001534, -20);
		cm.sendOk("Thank you for helping the people escape from prison. Please take your items.");
	}
	cm.dispose();
}
