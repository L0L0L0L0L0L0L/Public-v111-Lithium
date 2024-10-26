/*
	名字:	如果想要轉職為弓箭手的話，請前往弓箭手村
	地圖:	弓箭手培訓中心
	描述:	100000201
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 3) {
		qm.dispose();
		return;
		}
		if (status == 2) {
		qm.sendSimple("So you are choosing another path... Unfortunate, but it is your decision. Which path do you want to choose? \r\n#b#L1#Warrior#l\r\n#b#L2#Magician#l\r\n#b#L4#Thief#l\r\n#b#L5#Pirate#l");
		status = 3;
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
		qm.sendNext("Helo, #h0#. I've heard plenty about you from Mai. You are interested in becoming a Bowman, right? My name is Athena Pierce, Bowman Job instructor. Nice to meet you!");
		break;
	case 1:
		qm.sendNextPrev("How much do you know about Bowmen? We use bows or crossbows to attack enemies at long range, mainly. We're a bit slower than others, but our arrows never miss their mark!");
		break;
	case 2:
		qm.sendAcceptDecline("If you really wish to become a Bowman, I will bring you to the #bBowman Instructional School in Henesys#k using my power as the Job instructor. #rIf you are interested in other jobs, however, I will help you find your true path#k. Now, would you like to become a Bowman?");
		break;
	case 3:
		qm.getPlayer().changeMap(qm.getMap(100000201), qm.getMap(100000201).getPortal(0));
		Packages.server.quest.MapleQuest.getInstance(1403).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
		break;
	case 4:
		if (selection == 1)
			qm.sendNext("Warrior... If you want join them on their path of strength, wait for Dances with Balrog to contact you. Just keep on eye on the #bQuest Notifier on the left#k.");
		if (selection == 2)
			qm.sendNext("Magician... You want to join them on their path of magical power? Grendel the Really Old will be contacting you shortly. Just keep on eye on the #bQuest Notifier on the left#k.");
		if (selection == 4)
			qm.sendNext("Thief... The fighters in darkness, walkers of shadow. If you wish to join them on their path, Dark Lord will call upon you. Just keep on eye on the #bQuest Notifier on the left#k.");
		if (selection == 5) {
			qm.sendNext("Pirate... The flashy and boisterous brawlers. If you wish to walk their path, wait for Kyrin to call you. I will let her know. Just keep on eye on the #bQuest Notifier on the left#k.");
			}
			Packages.server.quest.MapleQuest.getInstance(1406).forceStart(qm.getPlayer(), qm.getNpc(), selection);
			break;
	case 5:
		qm.dispose();
}
}

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("You need to prepare some more? Please, take your time.");
		qm.dispose();
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
		qm.sendYesNo("Welcome to the Bowman Instructional School. It's good to meet face-to-face. Now then, I'll make you into a proper Bowman.");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1403)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 2 || Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
			qm.sendOk("Please empty #b2 slots in your Equip tab#k and #b1 slot in your Use tab#k. I would like to give you a small gift to commemorate you becoming a Bowman.");
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(1403).forceComplete(qm.getPlayer(), qm.getNpc());
			Packages.server.quest.MapleQuest.getInstance(2708).forceStart(qm.getPlayer(), qm.getNpc(), 1);
			qm.getPlayer().changeJob(300);
			qm.resetStats(4, 25, 4, 4);
			qm.expandInventory(1, 4);
			qm.expandInventory(4, 4);
			qm.gainItem(1142107, 1);
			qm.gainItem(1452051, 1);
			qm.gainItem(2060000, 1000);
			}
			qm.sendNext("Congratulations, you are now a Bowman. If you wish you to learn new skills as a Bowman, open the Skill window. I gave you a bit of #bSP#k to play around with, so try learning a skill.");
			break;
	case 2:
		qm.sendNextPrev("But skills aren't everything, are they? Your stats should reflect your job as a Bowman. A Bowman uses DEX as the main stat and STR as the secondary stat. If you don't know how much of which stat to raise, try using #bAuto-Assign#.");
		break;
	case 3:
		qm.sendNextPrev("Oh, and I gave you a small gift. I increased the space on your Equip and Use tabs. Use that space wisely!");
		break;
	case 4:
		qm.sendNextPrev("There's one more thing I must warn you about. Now that you have become a Bowman, if you fall in battle, you will lose some of the EXP you gained. Please don't forget.");
		break;
	case 5:
		qm.sendNextPrev("This is the extent of what I can teach you. Since I gave you a proper weapon, please train yourself as you travel the world.");
		break;
	case 6:
		qm.dispose();
}
}