/*
    Name:    Pan
    Map:     Ice Snow Plain Entrance
    Description: 932000000
*/

function start() {
	var chat = "#e<Party Quest: The Curse of the Ice Knight>#n \n\r\n\r\nJohn wanted to become brave and be recognized as a courageous person by everyone, but he was deceived by the Ice Man and turned into that state. Please help my friend John! If the curse isn't lifted quickly, John might lose his human heart forever, just like the Ice Man! \r\n\r\nNumber of players: 2~6 \r\nLevel range: 30~70 \r\nTime limit: 20 minutes#b";
	chat += "\r\n#L0#Enter the quest map";
	chat += "\r\n#L1#Exchange for #z1072510# (10 Cold Ice)";
	chat += "\r\n#L2#Exchange for #z1032100# (20 Cold Ice)";
	cm.sendSimple(chat);
}

function action(mode, type, selection) {
	switch (selection) {
		case 0:
			if (cm.getPlayer().getParty() == null) {
				cm.sendOk("Sorry, the monsters inside are dangerous. I can't let you go on your own.");
				cm.dispose();
				return;
			}
			if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
				cm.sendOk("If you want to proceed with this quest, please have your party leader talk to me.");
				cm.dispose();
				return;
			}
			var chat = "Sorry, your party does not meet the entry requirements. Some members are not qualified for this quest or are not in this map.\r\n\r\nNumber of players: 2~6 \r\nLevel range: 30~70 \r\n\r\n";
			var disqualified = 0;
			var party = cm.getPlayer().getParty().getMembers();
			for (var i = 0; i < party.size(); i++) {
				if (party.get(i).getLevel() < 30 || party.get(i).getLevel() > 70 || party.get(i).getMapid() != 932000000 || party.size() < 2) {
					chat += "#bName: " + party.get(i).getName() + " / (Level: " + party.get(i).getLevel() + ") / Map: #m" + party.get(i).getMapid() + "#\r\n";
					disqualified++;
				}
			}
			if (disqualified != 0) {
				cm.sendOk(chat);
				cm.dispose();
				return;
			}
			var em = cm.getEventManager("Iceman");
			var prop = em.getProperty("state");
			if (prop == null || prop == 0) {
				em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
				cm.dispose();
				return;
			}
			cm.sendOk("The Ice Knight Curse quest is currently in progress. Please try another channel.");
			break;
		case 1:
		case 2:
			item = [1072510, 1032100];
			qty = [10, 20];

			if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
				cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough slots in the equipment inventory."));
				cm.dispose();
				return;
			}
			if (cm.getPlayer().itemQuantity(4001529) < qty[selection - 1]) {
				cm.sendOk("Exchanging for #b#z" + item[selection - 1] + "##k requires #r" + qty[selection - 1] + "#k #v4001529##b#t4001529##k.");
				cm.dispose();
				return;
			}
			cm.gainItem(item[selection - 1], 1);
			cm.gainItem(4001529, -qty[selection - 1]);
			cm.sendOk("Thank you for helping John. Please take your item.");
	}
	cm.dispose();
}
