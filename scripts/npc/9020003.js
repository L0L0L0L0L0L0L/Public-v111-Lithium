/*
	Name: Little Dolphin
	Map: Dangerous Sea Junction <Preparation Room>
	Description: 923040000
*/

function start() {
	var chat = "#e<Party Quest: Rescue Kant>#n\r\n\r\nOh no!! Kant seems to be in danger. He said he would personally investigate the abnormal behavior of the sea creatures, but he hasn't returned since he left. Something must have happened to him. I need to find Kant and help him. Can you assist?\r\n\r\n Number of players: 2~6 \r\n Level range: 120+ \r\n Time limit: 20 minutes#b";
	chat += "\r\n#L0#Enter the quest map";
	chat += "\r\n#L1#Exchange for #z1022123# (50 Pianus Scales)";
	chat += "\r\n#L2#Exchange for a Pet Random Scroll (5 Pianus Scales)";
	cm.sendSimple(chat);
}

function action(mode, type, selection) {
	switch (selection) {
		case 0:
			if (cm.getPlayer().getParty() == null) {
				cm.sendOk("Sorry, the monsters inside are very dangerous. I cannot let you go on this adventure alone.");
				cm.dispose();
				return;
			}
			if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
				cm.sendOk("If you want to proceed with this mission, please have your party leader speak with me.");
				cm.dispose();
				return;
			}
			var chat = "Sorry, your party does not meet the entry requirements. Some members may not be eligible for this mission, or they might not be in this map.\r\n\r\nNumber of players: 2~6 \r\nLevel range: 120+ \r\n\r\n";
			var chenhui = 0;
			var party = cm.getPlayer().getParty().getMembers();
			for (var i = 0; i < party.size(); i++) {
				if (party.get(i).getLevel() < 120 || party.get(i).getMapid() != 923040000 || party.size() < 2) {
					chat += "#bName: " + party.get(i).getName() + " / (Level: " + party.get(i).getLevel() + ") / Map: #m" + party.get(i).getMapid() + "#\r\n";
					chenhui++;
				}
			}
			if (chenhui != 0) {
				cm.sendOk(chat);
				cm.dispose();
				return;
			}
			var em = cm.getEventManager("Kenta");
			var prop = em.getProperty("state");
			if (prop == null || prop == 0) {
				em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
				cm.dispose();
				return;
			}
			cm.sendOk("The mission to rescue Kant is already in progress. Please try another channel.");
			break;
		case 1:
		case 2:
			item = [1022123, 2048010];
			qty = [50, 5];

			if (cm.getPlayer().itemQuantity(4001535) < qty[selection - 1]) {
				cm.sendOk("To exchange for #b#z" + item[selection - 1] + "##k, you need #r" + qty[selection - 1] + "#k #v4001535##b#t4001535##k.");
				cm.dispose();
				return;
			}
			if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
				cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Insufficient slots in the Equip inventory"));
				cm.dispose();
				return;
			}
			cm.gainItem(selection == 1 ? item[selection - 1] : 2048010 + java.lang.Math.floor(java.lang.Math.random() * 4) | 0, 1);
			cm.gainItem(4001535, -qty[selection - 1]);
			cm.sendOk("Thank you for helping Kant. Please take your items.");
	}
	cm.dispose();
}
