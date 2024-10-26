/*
	名字:	心願之鏡
	地圖:	瑞恩村
	描述:	140000000
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 6) {
		qm.sendNext("What are you talking about? You lose all your brain cells while you were trapped in ice or something? Just get yourself together and talk to me when you're ready!");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21201)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(21201).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("First you promise to defeat the Black Mage and make me a famous weapon, then you abandon me for hundreds of years, and now you're telling me you don't remember who I am? What the...?! Do you think I'll let you get away with that? You're the one who begged and pined for me!");
			break;
	case 1:
		qm.sendNextPrevS("I did tell #p1203000# to make a polearm for me if I could prove my worth.", 2);
		break;
	case 2:
		qm.sendNextPrevS("After all that begging, shouldn't you treat me with a little more love and respect? Ya know, a weapon like me's a rare and wonderful thing. I am the ultimate #p1201001# that can help you defeat the Black Mage. How could you ditch me for hundreds of years...", 8);
		break;
	case 3:
		qm.sendNextPrevS("Hey, I never begged for you.", 2);
		break;
	case 4:
		qm.sendNextPrevS("What? You never begged for me? Ha! #p1203000# told me you got on your knees, begged for me in tears, and... Wait a sec. Aran! Did you just remember who I am?!", 8);
		break;
	case 5:
		qm.sendNextPrevS("Maybe a little bit...", 2);
		break;
	case 6:
		qm.sendNextPrevS("Aran, it is you! *Sniff sniff* Wait, *ahem* I didn't get emotional, it's just allergies. I know the Black Mage has stripped you of your abilities so you probably don't even have the strength to lift me... but at least you remember me! I'm glad that your memory's starting to return.", 8);
		break;
	case 7:
		qm.sendYesNo("Even though you've lost your memory, you're still my master. You endured some very tough training in the past, and I'm sure your body still remembers the skills that got you through those hard times. Alright, I'll restore your abilities!");
		break;
	case 8:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendOk("I was going to give you a medal but your Equip tab is full.");
			qm.dispose();
			return;
			}
			qm.gainItem(1142130, 1);
			qm.getPlayer().changeJob(2110);
			Packages.server.quest.MapleQuest.getInstance(21201).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.sendNext("Your level isn't what it used to be back in your glory days, so I can't restore all your old abilities. But the few that I can restore should help you level up faster. Now hurry up and train so you can return to the old you.");
			break;
	case 9:
		qm.dispose();
}
}