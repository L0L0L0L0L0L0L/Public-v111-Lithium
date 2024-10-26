/*
	名字:	如果想要轉職為劍士的話，請前往勇士之村
	地圖:	勇士聖殿
	描述:	102000003
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
		qm.sendSimple("You do not wish to choose the path of a Warrior? Very well. There are four other paths you can choose. \r\n\r\n#b#L2#Magician#l\r\n#L3#Bowman#l\r\n#L4#Thief#l\r\n#L5#Pirate#l");
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
		qm.sendNext("So, you are the person Mai recommended. You seek to become a Warrior, am I right? I am Dances with Balrog, the Warrior Job Instructor. I instruct newcomers in the ways of battle.");
		break;
	case 1:
		qm.sendNextPrev("How much do you know about Warriors? Warriors have great strength and high HP, and face their enemies up-close with powerful attacks. Sounds fun, right?");
		break;
	case 2:
		qm.sendAcceptDecline("You look like you are more than qualified. If you wish to become a Warrior, I welcome you. You wish to become a Warrior? If you accept, I will use my power as the Job Instructor to bring you to the #bWarriors' Sanctuary in Perion#k right away. #rThere are still paths for you even if you change your mind, and I will help you if you do#k.");
		break;
	case 3:
		qm.getPlayer().changeMap(qm.getMap(102000003), qm.getMap(102000003).getPortal(0));
		Packages.server.quest.MapleQuest.getInstance(1401).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
		break;
	case 4:
		if (selection == 2)
			qm.sendNext("You wish to be a Magician? If that is what you wish, so be it. #bGrendel the Really Old#k will contact you shortly. Check the #bQuest Notifier on the left#k.");
		if (selection == 3)
			qm.sendNext("You wish to be a Bowman? If that is what you wish, so be it. #bAthena Pierce#k will guide you down that path. Check the #bQuest Notifier on the left#k.");
		if (selection == 4)
			qm.sendNext("You wish to be a Thief? If that is what you wish, so be it. #bDark Lord#k will contact you soon. Check the #bQuest Notifier on the left#k.");
		if (selection == 5) {
			qm.sendNext("You wish to be a Pirate? If that is what you wish, so be it. #bKyrin#k will contact you soon. Check the #bQuest Notifier on the left#k.");
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
		qm.sendNext("Hmm... Still unsure of your path? Perhaps the way of the Warrior is not for you.");
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
		qm.sendYesNo("I am glad to see you here in person. If you are ready, I will declare you a Warrior. There will be no going back.");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1401)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 2) {
			qm.sendOk("I was going to give you a gift to celebrate your Job Advancement, but you already have too much equipment. Why don't you empty #b2 slots#k in your #bEquip tab#k?");
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(1401).forceComplete(qm.getPlayer(), qm.getNpc());
			Packages.server.quest.MapleQuest.getInstance(2849).forceStart(qm.getPlayer(), qm.getNpc(), 1);
			qm.getPlayer().changeJob(100);
			qm.resetStats(35, 4, 4, 4);
			qm.expandInventory(1, 4);
			qm.expandInventory(4, 4);
			qm.gainItem(1302077, 1);
			qm.gainItem(1142107, 1);
			}
			qm.sendNext("Now that you have become a Warrior, you will be much more powerful. Try out your new strength and skills. You'll be pleasantly surprised.");
			break;
	case 2:
		qm.sendNextPrev("Your stats should be more appropriate for a Warrior, also. For Warriors, STR is the main stat and DEX is the secondary stat. If you don't follow, try using the #bAuto-Assign#k function.");
		break;
	case 3:
		qm.sendNextPrev("In celebration of you becoming a Warrior, I increased your Inventory space. Gather strong weapons and equipment, and push your limits.");
		break;
	case 4:
		qm.sendNextPrev("By the way...it's important that you not fall in battle now. If you do, you'll lose a little of the EXP you've accumulated. It's not a pleasant experience.");
		break;
	case 5:
		qm.sendNextPrev("This is all I can teach you for now. Take up your weapon, and train hard.");
		break;
	case 6:
		qm.dispose();
}
}