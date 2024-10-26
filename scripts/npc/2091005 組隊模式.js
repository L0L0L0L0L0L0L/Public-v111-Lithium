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
				if (cm.getInfoQuest(2091005).equals("")) {
					chat += "\r\nHey!! You over there... This is your first time here, right? My master doesn't want to see anyone, he's very busy. From your appearance, I don't think he will mind, haha... Haha! But today you are very lucky... I'll tell you, if you can defeat me, I'll let you meet my master. How about it?";
					chat += "\r\n#L0#Accept Challenge";
				}
				if (cm.getInfoQuest(2091005).equals("1")) {
					chat += "My master is the strongest in Wulin. You want to challenge him? Well, you will surely regret it. #b";
					chat += "\r\n#L1#Solo Challenge";
					chat += "\r\n#L2#Team Entry";
					chat += "\r\n#L3#Exchange Belt";
					chat += "\r\n#L4#Reset My Training Points";
					chat += "\r\n#L5#What is the Wulin Training Tower";
				}
			}
			if (isRestingSpot(cm.getPlayer().getMap().getId())) {
				if (cm.getMap().getCharacters().size() != 1 && !cm.isLeader()) {
					cm.sendOk("What are you doing? Have your party leader speak to me.");
					cm.dispose();
					return;
				}
				chat += "I didn't expect you to make it this far, but it's not going to be easy from now on. Do you want to continue challenging?";
				chat += "\r\n#L6#Continue Fighting";
				if (cm.getMap().getCharacters().size() == 1 && !cm.isLeader()) {
					chat += "\r\n#L7#Record Current Results";
				}
			}
			if (cm.getPlayer().getMap().getId() != 925020001) {
				chat += "\r\n#L8#Leave Here";
			}
			cm.sendSimple(chat);
			break;
		case 1:
			if (selection == 0) {
				if (cm.getMap(925020010).getCharacters().size() > 0) {
					cm.sendOk("Please wait a moment, there is no available dojo right now.");
					cm.dispose();
					return;
				}
				cm.getMap(925020010).resetFully();
				cm.getPlayer().changeMap(cm.getMap(925020010), cm.getMap(925020010).getPortal(0));
				cm.dispose();
			}
			if (selection == 1) {
				if (cm.getParty() != null) {
					cm.sendOk("Hey!! Are you mistaken? Solo challenges do not allow party entries.");
					cm.dispose();
					return;
				}
				if (cm.getQuestRecord(150000).getCustomData() == null) {
					cm.start_DojoAgent(true, false);
					cm.dispose();
					return;
				}
				cm.sendYesNo("I have recorded your last solo challenge in my notebook. You went to #b#m" + cm.getQuestRecord(150000).getCustomData() + "##k layer. I can now let you continue directly. Do you want to skip the previous levels?");
			}
			if (selection == 2) {
				if (cm.getParty() != null) {
					cm.sendNext("What are you trying to do? You are not the party leader!");
					cm.dispose();
					return;
				}
				if (!cm.isLeader()) {
					cm.sendNext("Where do you think you can go? You are not the party leader!");
					cm.dispose();
					return;
				}
				cm.start_DojoAgent(true, true);
				cm.dispose();
			}
			if (selection == 3) {
				var chat = "Our master likes talented people, so if you have gained enough training points, you can exchange them for a belt based on your training points. So far, your total training points are: #b" + cm.getDojoPoints() + "";
				chat += "\r\n#L0##v1132000# #t1132000# (200)";
				chat += "\r\n#L1##v1132001# #t1132001# (1800)";
				chat += "\r\n#L2##v1132002# #t1132002# (4000)";
				chat += "\r\n#L3##v1132003# #t1132003# (9200)";
				chat += "\r\n#L4##v1132004# #t1132004# (17000)";
				cm.sendSimple(chat);
			}
			if (selection == 4) {
				cm.sendYesNo("Honestly, you know if you reset your training points, they will go back to #b 0#k, right? This is not necessarily a bad thing. If you start over, you can receive belts again. Do you want to reset your training points?");
			}
			if (selection == 5) {
				cm.sendOk("My master is the most powerful person in Wulin. He is responsible for creating this magical Wulin Training Tower. The Wulin Training Tower is a large training facility consisting of 38 floors, each representing additional difficulty. Of course, with your skills, reaching the top floor is impossible.");
				cm.dispose();
			}
			if (selection == 6) {
				cm.dojoAgent_NextMap(true, true);
				cm.getQuestRecord(150000).setCustomData(null);
				cm.dispose();
			}
			if (selection == 7) {
				cm.sendYesNo("If you record the current results, you can continue from #b#m" + cm.getPlayer().getMap().getId() + "##k when you challenge the Wulin Dojo next time. Do you want to record your current results?");
			}
			if (selection == 8) {
				cm.sendYesNo("Are you ready to leave #b#m" + cm.getPlayer().getMap().getId() + "##k?");
			}
			select = selection;
			break;
		case 2:
			if (select == 1) {
				map = parseInt(cm.getQuestRecord(150000).getCustomData());
				cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(0));
				cm.getQuestRecord(150000).setCustomData(null);
				cm.dispose();
			}
			if (select == 3) {
				var record = cm.getDojoRecord();
				required = record == 0 ? 200 : record == 1 ? 1800 : record == 2 ? 4000 : record == 3 ? 9200 : 17000;

				if (record == selection && cm.getDojoPoints() >= required) {
					var item = 1132000 + record;
					if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
						cm.playerMessage(1, "Not enough space in the equipment inventory.");
						cm.dispose();
						return;
					}
					cm.gainItem(item, 1);
					cm.setDojoRecord(false);
					cm.dispose();
					return;
				}
				cm.sendOk("You either already have it or have insufficient training points. You should try exchanging for a weaker belt first.");
				cm.dispose();
			}
			if (select == 4) {
				cm.setDojoRecord(true);
				cm.sendOk("All your training points have been reset. Consider it a new start and train hard.");
				cm.dispose();
			}
			if (select == 7) {
				cm.getQuestRecord(150000).setCustomData(cm.getPlayer().getMap().getId());
				cm.sendOk("I have recorded your challenge results in my notebook. Please note, if you choose to continue challenging, your record will be deleted. So choose wisely.");
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
