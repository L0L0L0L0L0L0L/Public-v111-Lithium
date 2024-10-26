/*
    Name: Duat
    Map: Pyramid Hill
    Description: 926010000
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
		case -1:
			cm.dispose();
			return;
		case 0:
			if (status < 3) {
				cm.dispose();
				return;
			}
			status--;
			break;
		case 1:
			status++;
			break;
	}
	switch (status) {
		case 0:
			if (cm.getPlayer().getMap().getId() > 926020000 && cm.getPlayer().getMap().getId() < 926020005) {
				if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
					cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough space in the Other Items inventory"));
					cm.dispose();
					return;
				}
				cm.gainItem(4001321 + (cm.getPlayer().getMap().getId() % 10), 1);
				cm.getPlayer().changeMap(cm.getMap(926010000), cm.getMap(926010000).getPortal(1));
				cm.dispose();
				return;
			}
			if (cm.getPlayer().getMap().getId() > 926010000 && cm.getPlayer().getMap().getId() < 926010005) {
				cm.getPlayer().changeMap(cm.getMap(926010000), cm.getMap(926010000).getPortal(1));
				cm.dispose();
				return;
			}
			if (cm.getPlayer().getMap().getId() > 926010000 && cm.getPlayer().getMap().getId() < 926013505) {
				cm.sendYesNo("Are you sure you want to leave #b#m" + cm.getPlayer().getMap().getId() + "##k?");
			}
			if (cm.getPlayer().getMap().getId() == 926010000) {
				var chat = "#e<Party Quest: Knight's Pyramid>#n\r\n\r\nIn the Pharaoh Yeti's tomb, to survive, you must eliminate all the threatening monsters and ultimately uncover the secrets of the treasure. However, taking Knight's treasure easily is not allowed.\r\n\r\n－#eParty Members#n: 2 \r\n－#elevel#n: 40 - 200#b";
				chat += "\r\n#L0#Enter the Pyramid";
				chat += "\r\n#L1#Yeti Pharaoh Tomb";
				chat += "\r\n#L2#Exchange for <Pharaoh Guardian> Medal";
				cm.sendSimple(chat);
			}
			break;
		case 1:
			if (cm.getPlayer().getMap().getId() > 926010000 && cm.getPlayer().getMap().getId() < 926013505) {
				cm.getPlayer().changeMap(cm.getMap(926010000), cm.getMap(926010000).getPortal(1));
				cm.dispose();
				return;
			}
			if (selection == 0) {
				var chat = "The Pyramid is divided into three areas according to the player's level:\r\n#b";
				chat += "#L1##v3994116#";
				chat += "#L2##v3994117#";
				chat += "#L3##v3994118#";
				cm.sendSimple(chat);
			}
			if (selection == 1) {
				status = 2;
				var chat = "Cough! Cough! The Yeti Pharaoh Tomb is filled with endless treasures. As long as you have the corresponding gems, I will let you enter: #b";
				chat += "\r\n#L0##v4001322##t4001322#";
				chat += "\r\n#L1##v4001323##t4001323#";
				chat += "\r\n#L2##v4001324##t4001324#";
				chat += "\r\n#L3##v4001325##t4001325#";
				cm.sendSimple(chat);
			}
			if (selection == 2) {
				var record = cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(7760));
				var data = record.getCustomData();
				if (data == null) {
					record.setCustomData(0);
					data = record.getCustomData();
				}
				var mons = parseInt(data);
				if (mons < 50000) {
					cm.sendOk("Please defeat at least 50,000 monsters in the Pyramid. Kills: " + mons);
					cm.dispose();
					return;
				}
				if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
					cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough space in the Equipment inventory"));
					cm.dispose();
					return;
				}
				if (cm.getPlayer().itemQuantity(1142142) || cm.getPlayer().hasEquipped(1142142)) {
					cm.sendOk("Oh! Cute adventurer! You already have a <Pharaoh Guardian> Medal.");
					cm.dispose();
					return;
				}
				cm.gainItem(1142142,1);
				record.setCustomData(0);
				cm.dispose();
			}
			break;
		case 2:
			if (cm.getPlayer().getParty() == null) {
				cm.sendOk("Sorry, the monsters inside are too dangerous. I cannot let you venture alone.");
				cm.dispose();
				return;
			}
			if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
				cm.sendOk("Sorry, to enter this area, the team leader must lead the team.");
				cm.dispose();
				return;
			}
			var chat = "Sorry, because your party size is not within the entry requirements, some members are not qualified for this task, or they are not in this map.\r\n\r\nNumber of players: 2 \r\nLevel range: " + (selection < 1 ? "40~45" : selection < 2 ? "45~50" : selection < 3 ? "50~60" : "60+") + "\r\n\r\n";
			var chenhui = 0;
			var party = cm.getParty().getMembers();
			for (var i = 0; i < party.size(); i++)
				if ((selection == 0 ? (party.get(i).getLevel() < 40 || party.get(i).getLevel() > 45) : selection == 1 ? (party.get(i).getLevel() < 45 || party.get(i).getLevel() > 50) : selection == 2 ? (party.get(i).getLevel() < 50 || party.get(i).getLevel() > 60) : party.get(i).getLevel() < 60) || party.get(i).getMapid() != 926010000 || party.size() != 2) {
					chat += "#bName: " + party.get(i).getName() + " / (Level: " + party.get(i).getLevel() + ") / Map: #m" + party.get(i).getMapid() + "##k\r\n";
					chenhui++;
				}
			if (chenhui != 0) {
				cm.sendOk(chat);
				cm.dispose();
				return;
			}
			if (cm.start_PyramidSubway(selection)) {
				cm.dispose();
				return;
			}
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The Pyramid is currently crowded, please try again later"));
			cm.dispose();
			break;
		case 3:
			if (!cm.getPlayer().itemQuantity(4001322 + selection)) {
				cm.sendOk("Sorry! You do not have the corresponding gem, so the tomb door cannot be opened.");
				cm.dispose();
				return;
			}
			if (cm.bonus_PyramidSubway(selection)) {
				cm.gainItem(4001322 + selection, -1);
				cm.dispose();
				return;
			}
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The Pyramid is currently crowded, please try again later"));
			cm.dispose();
	}
}
