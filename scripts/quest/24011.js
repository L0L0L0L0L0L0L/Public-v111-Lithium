/*
	名字:	國王的義務
	地圖:	偉大的精神降臨
	描述:	910150100
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 6) {
		qm.sendNext("Don't blame yourself, love. You made the best choice you could.");
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
		qm.sendNext("...What happened to you, deary? I can't feel the Royal Power on you at all. All I'm getting is this nasty dark curse-y energy...");
		break;
	case 1:
		qm.sendNextPrevS("It's a long story.", 2);
		break;
	case 2:
		qm.sendNextPrev("I love me a long story! Remember, I'm a spirit, deary. I don't have much to do but float around and listen to stories. So come on, tell us!");
		break;
	case 3:
		qm.sendNextPrevS("(Tell her about the battle against the Black Mage, the curse, and present-day Maple World.)", 2);
		break;
	case 4:
		qm.sendNextPrevS("Maybe it's my fault. Maybe I should have stayed out of the fight against the Black Mage, and spared my people this suffering. #p1033210#, if you feel I should step down as ruler, I will.", 2);
		break;
	case 5:
		qm.sendNextPrev("Oh dear. Don't worry your little head. You're doing the best you can by the Elves. It's a right pity there's so much evil in Maple World.");
		break;
	case 6:
		qm.sendNextPrev("You don't think this mean old Black Mage would've left the Elves alone, do you? After he were done with the humans, you'd've been next, anyway. You were right to fight him the first time, and you're right to fight him this time...");
		break;
	case 7:
		qm.sendAcceptDecline("Don't you waste another moment second guessing yourself, deary. I'm not even gonna make you take the royal test again, neither. The Royal Power is all yours.");
		break;
	case 8:
		Packages.server.quest.MapleQuest.getInstance(24011).forceStart(qm.getPlayer(), qm.getNpc(), null);
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
		qm.sendNext("Don't turn me down, deary! I'm just looking for a chance to see the wide world out there!");
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
		qm.sendNext("You Elves are in a heap of trouble with this curse. Deary, I'm counting on you to lead your people to victory!");
		break;
	case 1:
		qm.sendNextPrev("You got a lot to do, love. Now, usually, you'd have to come see me again for your second and third tests, but I don't want to eat up any more of your time than I have to.");
		break;
	case 2:
		qm.sendAcceptDecline("From now on, I'll come visit YOU when you're ready for the next test! Doesn't that sound like fun?");
		break;
	case 3:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendNext("Oh dear, I think you need to make some room in your Equip inventory...");
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(24011).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(2310);
			qm.gainItem(1142337, 1);
			qm.dispose();
}
}