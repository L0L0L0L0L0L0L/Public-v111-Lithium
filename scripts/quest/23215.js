/*
	名字:	惡魔能量的覺醒
	地圖:	秘密廣場
	描述:	310010000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendOk("Really? Are you sure it's going well?");
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
		qm.sendYesNo("How's your training going, #h0# good?");
		break;
	case 1:
		qm.sendNextS("#p2151009#, I wanted to speak with you.", 16);
		break;
	case 2:
		qm.sendNextPrev("(Eh? #h0# wants to speak to me? Glee!) Ah, yes? About what?");
		break;
	case 3:
		qm.sendNextPrevS("I would like to repeat my previous training.", 16);
		break;
	case 4:
		qm.sendNextPrev("Previous training? Guess you've hit another wall, then. I don't think repeating that training is going to help, #h0#...");
		break;
	case 5:
		qm.sendNextPrevS("I understand, but I seem to be out of options.", 16);
		break;
	case 6:
		qm.sendNextPrev("Hm. Wait...wait! I've got an idea. Ohh, I've got a really good idea! You want to get back to your old power level, right, #h0#? In that case, you should practice against #h0#! Or, more specifically, #h0# from the past.");
		break;
	case 7:
		qm.sendNextPrev("Normally, the #m270000100# is the only place where you can tinker with time, but I found another, #h0#. Word is, there's something wrong with time in #m220000000#.");
		break;
	case 8:
		qm.sendNextPrev("There's a place called #b#m220050300##k on #m220000000#'s Clocktower Bottom Floor. I can stabilize the Crack in Time so you can travel to where you need to go.");
		break;
	case 9:
		qm.sendNextPrev("Yeah, I know I look funny like this, but this form allows me to move between dimensions. I'll meet you at the place...I'm taking the scenic route.");
		break;
	case 10:
		qm.sendNextPrev("Entering the Crack in Time will shift you to a point in the past, but don't worry about messing things up. The way this works, your actions won't affect the future.");
		break;
	case 11:
		Packages.server.quest.MapleQuest.getInstance(23215).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(220050300), qm.getMap(220050300).getPortal(2));
		qm.dispose();
}
}

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 1) {
		qm.sendNext("Hey, no worries. I doubt you're going to forget everything AGAIN. That would just be silly.");
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
		qm.sendNext("You made it back, #h0#! How are you feeling?");
		break;
	case 1:
		qm.sendNextPrevS("Fighting myself from the past wasn't easy, but I remembered many of the skills I had forgotten.", 2);
		break;
	case 2:
		qm.sendYesNo("Excellent! I was hoping it would work like that. You really do feel stronger now. Hey, #h0#, do you want me to write all this down for you?");
		break;
	case 3:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 2) {
			qm.sendOk("You'll need to empty at least #b3 slots#k in your #bEquip tab#k before you can complete your job advancement.");
			qm.dispose();
			return;
			}
			qm.gainItem(1142344, 1);
			qm.gainItem(1322127, 1);
			qm.getPlayer().changeJob(3112);
			Packages.server.quest.MapleQuest.getInstance(23215).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.sendOk("Sounds like you've gotten all your old powers back. For now, #h0#, I suggest you focus on training steadily and improving your basics.");
			qm.dispose();
}
}