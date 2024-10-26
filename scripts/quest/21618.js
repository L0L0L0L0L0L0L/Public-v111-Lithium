/*
	名字:	狼的進化
	地圖:	狼之平原
	描述:	140010210
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 1) {
		qm.sendNext("What? You don't want to? Hey, I'm only giving you attention because you're my master! What's your problem?");
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
		qm.sendNextS("Hey, Aran. I can feel an incredible force trailing you. ls there someone extremely powerful with you?", 8);
		break;
	case 1:
		qm.sendNextPrevS("Not that I know of.", 2);
		break;
	case 2:
		qm.sendAcceptDecline("Really? Then what is this unsual force that I feel next to you? I can't stop wondering about it now. Come to #b#140000000##k. I want to check is out.");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(21618).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendOk("I'll be able to identify the force once I see it with my own eyes.");
		qm.dispose();
}
}

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		qm.sendNextS("What is this! You do have someone very powerful with you! Right beside you! Why are you acting like you don't know what I'm talking about?", 8);
		break;
	case 1:
		qm.sendNextPrevS("Someone powerful? Who?", 2);
		break;
	case 2:
		qm.sendNextPrevS("What do you mean, who? That wolf right there besides you. I believe the name is Werewolf...?", 8);
		break;
	case 3:
		qm.sendNextPrevS("Werewolf is powerful?", 2);
		break;
	case 4:
		qm.sendNextPrevS("You didn't know?! That's a Silver Wolf! A Silver Wolf grows with its master, which means the stronger the master gets. the more powerful the wolf becomes.", 8);
		break;
	case 5:
		qm.sendNextPrevS("Is that why Werewolf is considered powerful...?", 2);
		break;
	case 6:
		qm.sendNextPrevS("Yes, that's because it's heavily affected by you. It's even exuding a similar aura. I think your wolf is ready for the awakening.", 8);
		break;
	case 7:
		qm.sendNextPrevS("The awakening? What's that?", 2);
		break;
	case 8:
		qm.sendNextPrevS("It's a form of transformation that only Silver Wolves with a certain amount of power can undergo. Come on, you knew all this long ago.", 8);
		break;
	case 9:
		qm.sendNextPrevS("I don't remember.", 2);
		break;
	case 10:
		qm.sendNextPrevS("Sigh... The Silver Wolf won't be able to undergo the awakening then. Oh well, in that case, I'll have to make up for your shortcomings.", 8);
		break;
	case 11:
		if (cm.getPlayer().hasEquipped(1902017)) {
			qm.sendNext("Wait, the transformation failed. If you're currently equipping the Silver Wolf by any chance, you must unequip it and leave an empty slot in your Equip tab. That's the only way the transformation can take place.");
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21618)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(21618).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(1902017, -1);
			qm.gainItem(1902018, 1);
			}
			qm.sendNextPrevS("Ryko the Silver Wolf has been awakened. You can reference all the historical records you want, but you won't find a single wolf that can trump this one's power. I mean, you are the master of this wolf. I don't think your Ryko in the past was even this strong...", 8);
			break;
	case 12:
		qm.sendNextPrevS("My Ryko in the past...?", 2);
		break;
	case 13:
		qm.sendPrevS("Yes, the Ryko you had in the past. Don't you remember? I thought you named this wolf after your other one. Anyway, take good care of Ryko. It will never turn its back on you.", 8);
		break;
	case 14:
		qm.dispose();
}
}