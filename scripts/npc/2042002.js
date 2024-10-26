var Text = [
	["What is the Monster Carnival? Hahaha! It might be an experience you will never forget. It’s a competition where you can challenge other travelers.", "I know that fighting each other with real weapons can be very dangerous, and I wouldn’t recommend such barbaric behavior. So this is a place where everyone can enjoy the excitement and fun of combat. How do you feel? Aren't you excited?"],
	["First, you can choose to participate in either type of Monster Carnival. When you enter my office, the party leader can open a room to wait for opponents or join another party's room. Just be aware of the team size; the entry mode requires both teams to have the same number of members: 2V2 or 3V3.", "After starting the Monster Carnival, each team of players will fight monsters to gain more party CP. CP can be used to summon creatures, items, or skills to hinder the other team from gaining CP. Don’t worry if your team’s CP is less than the opponent’s, as the total CP does not deplete, only the available CP of your team.", "During the match, players cannot attack other players or monsters (the monsters that the opposing team and the monsters they target are invisible). Monsters will drop potions to replenish energy, which are automatically used when picked up and cannot be stored or taken out of the game map. Potions in the player’s consumption slot are also prohibited from use.", "After the designated match time ends, monsters and items will disappear. The side with more CP wins. Both sides participating in the match will receive different rewards based on the results." ]
];

var select = -1;
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
			if (status < 2) {
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
			if (cm.getPlayer().getMap().getId() == 103000000) {
				var chat = "#e<Monster Carnival>#n\r\n\r\nWelcome to the Monster Carnival stage. If you have not participated in the Monster Carnival before, you should listen to the rules. #b";
				chat += "\r\n#L0#Participate in Monster Carnival I";
				chat += "\r\n#L1#Participate in Monster Carnival II";
				chat += "\r\n#L2#Rules of the Monster Carnival";
				chat += "\r\n#L3#Exchange items for #z4001254#";
			}
			if (cm.getPlayer().getMap().getId() % 5 == 1) {
				cm.sendOk("#e<Team Mission: Monster Carnival>#n \n\r\n\r\nThe Monster Carnival has started. Pay attention to your surroundings, eliminate as many monsters as possible, and earn more CP points.");
				cm.dispose();
				return;
			}
			if (cm.getPlayer().getMap().getId() % 5 > 2) {
				var chat = "What a spectacular performance! I hope the Monster Carnival brings you joy.\r\n#bYour score this time: #r" + (cm.getCarnivalParty().getTotalCP() < 1000 ? "D" : cm.getCarnivalParty().getTotalCP() < 2000 ? "C" : cm.getCarnivalParty().getTotalCP() < 3000 ? "B" : "A") + "#k";
				chat += "\r\n#L4#Leave here";
			}
			if (cm.getPlayer().getMap().getId() == 980000010) {
				var chat = "#e<Monster Carnival>#n\r\n\r\nHow is the Monster Carnival stage? The feeling of competing with opponents is very exciting, right? I hope the Monster Carnival brings you joy. #k";
				chat += "\r\n#L5#Leave here";
			}
			cm.sendSimple(chat);
			break;
		case 1:
			if (selection == 0) {
				if (cm.getPlayer().getLevel() > 30 && cm.getPlayer().getLevel() < 200) {
					cm.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("MULUNG_TC"));
					cm.getPlayer().changeMap(cm.getMap(980000000), cm.getMap(980000000).getPortal(4));
					if (!cm.getPlayer().getMap().containsNPC(2042000)) {
						cm.getPlayer().getMap().spawnNpc(2042000, new java.awt.Point(276, -1));
					}
					cm.dispose();
					return;
				}
				if (cm.getPlayer().getLevel() < 30) {
					cm.sendOk("You must be at least level 30 to participate in Monster Carnival. Speak to me when you are strong enough.");
					cm.dispose();
					return;
				}
				cm.sendOk("Sorry, only players between levels 30 and 200 can participate in Monster Carnival.");
				cm.dispose();
				return;
			}
			if (selection == 1) {
				if (cm.getPlayer().getLevel() > 70 && cm.getPlayer().getLevel() < 200) {
					cm.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("MULUNG_TC"));
					cm.getPlayer().changeMap(cm.getMap(980030000), cm.getMap(980030000).getPortal(4));
					cm.dispose();
					return;
				}
				if (cm.getPlayer().getLevel() < 70) {
					cm.sendOk("You must be at least level 70 to participate in Monster Carnival II. Speak to me when you are strong enough.");
					cm.dispose();
					return;
				}
				cm.sendOk("Sorry, only players between levels 70 and 200 can participate in Monster Carnival II.");
				cm.dispose();
				return;
			}
			if (selection == 2) {
				var chat = "#e<Monster Carnival>#n\r\n\r\nIf you have any questions about the Monster Carnival, feel free to ask. #b";
				chat += "\r\n#L0#What is the Monster Carnival";
				chat += "\r\n#L1#Detailed information about the Monster Carnival";
				cm.sendSimple(chat);
			}
			if (selection == 3) {
				var chat = "#e<Monster Carnival>#n\r\n\r\nIf you have #z4001254#, you can use it to exchange for items.";
				chat += "\r\n#L2##b#v1122162##z1122162##k (100 #z4001254#)";
				chat += "\r\n#L3##b#v1102327##z1102327##k (150 #z4001254#)";
				cm.sendSimple(chat);
			}
			if (selection == 4) {
				if (cm.getPlayer().getMap().getId() % 5 == 3 && cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(29021)).getStatus() == 1) {
					cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(7054)).setCustomData(parseInt(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(7054)).getCustomData()) + 1);
					cm.getPlayer().updateQuest(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(7054)), true);
				}
				cm.gainExp(cm.getPlayer().getLevel() * cm.getCarnivalParty().getTotalCP());
				cm.getCarnivalParty().removeMember(cm.getChar()); // Clear the current Monster Carnival points
				cm.getPlayer().changeMap(cm.getMap(980000000), cm.getMap(980000000).getPortal(0));
				cm.dispose();
				return;
			}
			if (selection == 5) {
				cm.getPlayer().changeMap(cm.getMap(980000000), cm.getMap(980000000).getPortal(0));
				cm.dispose();
				return;
			}
			break;
		case 2:
			if (selection < 2) {
				if (select < 0) select = selection;
				cm.sendNext(Text[select][status - 2]);
			}
			if (selection > 1) {
				if (cm.getPlayer().itemQuantity(4001254) < (selection < 3 ? 100 : 150)) {
					cm.sendOk("Please check again. Exchanging " + (selection < 3 ? "#v1122162# requires 100 #t4001254#." : "#v1102327# requires 150 #t4001254#.") + "");
					cm.dispose();
					return;
				}
				if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
					cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough slots in the equipment inventory."));
					cm.dispose();
					return;
				}
				cm.gainItem(selection < 3 ? 1122162 : 1102327, 1);
				cm.gainItem(4001254, -(selection < 3 ? 100 : 150));
				cm.sendOk("Please take your item. Thank you for your continued support of the Monster Carnival.");
				cm.dispose();
			}
			break;
		default:
			Text[select][status - 2] == undefined ? cm.dispose() : cm.sendNextPrev(Text[select][status - 2]);
			break;
		case 5:
			Text[select][status - 2] == undefined ? cm.dispose() : cm.sendPrev(Text[select][status - 2]);
	}
}
