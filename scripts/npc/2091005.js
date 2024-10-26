/*
	Name: Xiao Gong
	Map: Wulin Dojo Entrance
	Description: 925020001
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
			if (status < 5) {
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
			var chat = "#e<Wulin Dojo>#n\r\n\r\n";
			if (cm.getPlayer().getMap().getId() == 925020001) {
				if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(150100)).getCustomData() == null) {
					chat += "\r\nHey!! You there, look over here… This is your first time here, right? My master doesn’t want to see anyone, he’s very busy, but from your appearance, I don’t think he’ll mind, haha… haha… haha! But today you’re lucky… I’ll tell you, if you can defeat me, I’ll let you meet my master. What do you say?";
					chat += "\r\n#L0#Accept the challenge";
				}
				if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(150100)).getCustomData() != null) {
					chat += "My master is the strongest in Wulin. You want to challenge him? Well, you’ll definitely regret it. #b";
					chat += "\r\n#L1##v3994115#";
					chat += "#L2##v3994116#";
					chat += "#L3##v3994117#";
					chat += "\r\n#L4#Exchange belts";
					chat += "\r\n#L5#What is the Wulin Training Tower?";
				}
			}
			if (isRestingSpot(cm.getPlayer().getMap().getId())) {
				chat += "I didn’t expect you to get this far, but it won’t be so easy from now on. Do you want to continue the challenge?";
				chat += "\r\n#L6#Continue fighting";
				chat += "\r\n#L7#Record current progress";
			}
			if (cm.getPlayer().getMap().getId() != 925020001) {
				chat += "\r\n#L8#Leave here";
			}
			cm.sendSimple(chat);
			break;
		case 1:
			if (selection == 0) {
				if (cm.getMap(925020010).getCharacters().size() > 0) {
					cm.sendOk("Please wait, there are no available dojos at the moment.");
					cm.dispose();
					return;
				}
				cm.getMap(925020010).resetFully();
				cm.getPlayer().changeMap(cm.getMap(925020010), cm.getMap(925020010).getPortal(0));
				cm.dispose();
				return;
			}
			if (selection <= 3) {
				cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(150100)).setCustomData(selection < 2 ? 1 : selection < 3 ? 2 : 3);
				if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(150101)).getCustomData() == null) {
					cm.start_DojoAgent(true, false);
					cm.dispose();
					return;
				}
				cm.sendYesNo("My notebook records your last individual challenge. You can go directly to #b#m" + cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(150101)).getCustomData() + "##k floor. Do you want to skip the previous levels?");
			}
			if (selection == 4) {
				var chat = "Our master likes talented people, so if you gain a certain number of Wukong's symbols in the dojo, you can exchange them for a suitable belt here. So far, you have #b" + cm.getPlayer().itemQuantity(4001620) + " Wukong's symbols#k.";
				chat += "\r\n#L0##v1132112:# #t1132112# (50 Wukong's symbols required)";
				chat += "\r\n#L1##v1132113:# #t1132113# (100 Wukong's symbols required)";
				chat += "\r\n#L2##v1132114:# #t1132114# (200 Wukong's symbols required)";
				chat += "\r\n#L3##v1132115:# #t1132115# (250 Wukong's symbols required)";
				cm.sendSimple(chat);
			}
			if (selection == 5) {
				cm.sendOk("My master is the most powerful person in Wulin. He is responsible for creating this magical Wulin Training Tower, a large training facility composed of 47 floors, each representing an additional difficulty. Of course, with your skills, reaching the top floor is impossible.");
				cm.dispose();
			}
			if (selection == 6) {
				cm.dojoAgent_NextMap(true, true);
				cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(150101)).setCustomData(null);
				cm.dispose();
			}
			if (selection == 7) {
				cm.sendYesNo("If you record your current progress, you can continue from #b#m" + cm.getPlayer().getMap().getId() + "##k next time you challenge the Wulin Dojo. Do you want to record your current progress?");
			}
			if (selection == 8) {
				cm.sendYesNo("Are you ready to leave #b#m" + cm.getPlayer().getMap().getId() + "##k?");
			}
			select = selection;
			break;
		case 2:
			if (select <= 3) {
				map = parseInt(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(150101)).getCustomData());
				cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(150101)).setCustomData(null);
				cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(0));
				cm.dispose();
			}
			if (select == 4) {
				item = [1132112, 1132113, 1132114, 1132115];
				qty = [50, 100, 200, 250];
				if (cm.getPlayer().itemQuantity(4001620) < qty[selection]) {
					cm.sendOk("#b#t" + item[selection] + "##k requires " + qty[selection] + " Wukong's symbols.");
					cm.dispose();
					return;
				}
				if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
					cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough slots in equipment inventory"));
					cm.dispose();
					return;
				}
				cm.gainItem(4001620, -qty[selection]);
				cm.gainItem(item[selection], 1);
				cm.dispose();
				return;
			}
			if (select == 7) {
				cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(150101)).setCustomData(cm.getPlayer().getMap().getId());
				cm.sendOk("I’ve recorded your current challenge progress in my notebook. Please note that if you choose to continue challenging, your record will be erased, so please choose carefully.");
				cm.dispose();
			}
			if (select == 8) {
				cm.getPlayer().changeMap(cm.getMap(925020002), cm.getMap(925020002).getPortal(0));
				cm.dispose();
			}
	}
}

function isRestingSpot(id) {
	return (Math.floor(id / 100) % 100) % 6 == 0 && id != 925020001;
}
