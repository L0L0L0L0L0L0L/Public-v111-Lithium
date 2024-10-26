/*
	名字:	想要變成法師的話，請前往魔法森林
	地圖:	魔法森林圖書館
	描述:	101000003
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
		qm.sendSimple("You are not content with the path of a Magician? That is unfortunate, but I will respect your decision. Which path will you choose now? \r\n\r\n#b#L1#Warrior#l\r\n#L3#Bowman#l\r\n#L4#Thief#l\r\n#L5#Pirate#l");
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
		qm.sendNext("Ah, so you are the one that Mai was talking about. How do you do? I heard that you are interested in the path of a Magician. If that's the case, I will help guide you. I am Grendel the Really Old, the Magician Job Instructor.");
		break;
	case 1:
		qm.sendNextPrev("I'm sure you already know a little bit about Magicians. With high intelligence as our foundation, we learn all manner of magic spells to wield in battle. Range is not a concern for us, but our low HP is our weakness. We've come up with many ways around that, though, so don't worry too much.");
		break;
	case 2:
		qm.sendAcceptDecline("I see that you are more than qualified to become a Magician... would you like to become a Magician? If you accept, I will use my power as the Job Instructor to bring you to the #bMagic Library in Ellinia#k. I'll perform the Job Advancement once we meet in person. #rThere are still other paths open to you if you change your mind, and I will help you find them if you do.");
		break;
	case 3:
		qm.getPlayer().changeMap(qm.getMap(101000003), qm.getMap(101000003).getPortal(0));
		Packages.server.quest.MapleQuest.getInstance(1402).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
		break;
	case 4:
		if (selection == 1)
			qm.sendNext("You wish to be a Warrior? If that is what you wish, so be it. Dances with Balrog will be contacting you soon. Click on the #bQuest Notifier on the left#k.");
		if (selection == 3)
			qm.sendNext("You wish to be a Bowman? If that is what you wish, so be it. Athena Pierce will guide you down that path. Check the #bQuest Notifier on the left#k.");
		if (selection == 4)
			qm.sendNext("You wish to be a Thief? If that is what you wish, so be it. Dark Lord will contact you soon. Check the #bQuest Notifier on the left#k.");
		if (selection == 5) {
			qm.sendNext("You wish to be a Pirate? If that is what you wish, so be it. Kyrin will contact you soon. Check the #bQuest Notifier on the left#k.");
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
		qm.sendNext("Are you afraid? Don't be. You belong on this path.");
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
		qm.sendYesNo("Ahh, welcome. It's good to finally meet, face-to-face. I can already see that you will become a great Magician. Let's make this official right away.");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1402)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 2) {
			qm.sendOk("I was going to give you a gift to celebrate your Job Advancement, but your pockets are quite full. Would you empty at least #b2 slots#k in your #bEquip tab#k?");
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(1402).forceComplete(qm.getPlayer(), qm.getNpc());
			Packages.server.quest.MapleQuest.getInstance(2790).forceStart(qm.getPlayer(), qm.getNpc(), 1);
			qm.getPlayer().changeJob(200);
			qm.resetStats(4, 4, 20, 4);
			qm.expandInventory(1, 4);
			qm.expandInventory(4, 4);
			qm.gainItem(1372043, 1);
			qm.gainItem(1142107, 1);
			}//Seems like you were a little late in your Job Advancement, no? I thought you might not have all the SP you need, so I filled it out for you.
			qm.sendNext("With this, you will be able to use a wide variety of magic skills. I gave you a bit of #bSP#k, so open the #bSkill#k window and try learning a skill. If possible, try to learn some #battack magic#k.");
			break;
	case 2:
		qm.sendNextPrev("But remember, skills aren't everything. Your stats should support your skills as a Magician, also. Magicians use INT as their main stat, and LUK as their secondary stat. If raising stats is difficult, just use #bAuto-Assign#k.");
		break;
	case 3:
		qm.sendNextPrev("Now. one more word of warning for you. If you fall in battle from this point on, you will lose a portion of your total EXP. Be extra mindful of this, since you have less HP than most.");
		break;
	case 4:
		qm.sendNextPrev("This is all I can teach you. You have your wand for training, so use it well. I wish you luck on your journey.");
		break;
	case 5:
		qm.dispose();
}
}