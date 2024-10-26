/*
	名字:	过去回忆
	地圖:	精靈之島
	描述:	101050020
*/

var status = -1;

function start(mode, type, selection) {
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
		qm.sendNextS("It's been a long time since I've been this way. Heh, I remember the time Athena Pierce ran away from home, long ago, before we had even heard of the Black Mage...", 16);
		break;
	case 1:
		qm.sendNextPrevS("I suppose it wouldn't hurt to make a little trip down memory lane.", 16);
		break;
	case 2:
		qm.dispose();
		Packages.server.quest.MapleQuest.getInstance(24069).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(910150210), qm.getMap(910150210).getPortal(0)); //過去的記憶
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
		qm.sendNext("M-Mercedes!");
		break;
	case 1:
		qm.sendNextPrevS("So this is where you were hiding! Astilda was worried sick. Why didn't you tell anyone where you were going?", 2);
		break;
	case 2:
		qm.sendNextPrev("Sob... Sob...!");
		break;
	case 3:
		qm.sendNextPrevS("Stop crying! Good Elves don't cry.", 2);
		break;
	case 4:
		qm.sendNextPrev("Hic...");
		break;
	case 5:
		qm.sendNextPrevS("Don't cry.", 2);
		break;
	case 6:
		qm.sendNextPrev("Don't...!");
		break;
	case 7:
		qm.sendNextPrevS("Good girl! Now, do you want to tell me why you were crying?", 2);
		break;
	case 8:
		qm.sendNextPrev("I...I can't use Dual Bowguns.");
		break;
	case 9:
		qm.sendNextPrevS("Huh? You want to learn how to use Dual Bowguns.", 2);
		break;
	case 10:
		qm.sendNextPrev("Yeah! I wanted to be cool like you, Mercedes! But why can't I learn how to use them? Normal bows are boring...");
		break;
	case 11:
		qm.sendNextPrevS("Hm... Dual Bowguns...can only be mastered by a select few...", 2);
		break;
	case 12:
		qm.sendNextPrev("Select who?");
		break;
	case 13:
		qm.sendNextPrevS("Sorry, I was just talking to myself. Dual Bowguns are a lot of hard work to learn. You still want to use them?", 2);
		break;
	case 14:
		qm.sendNextPrev("Is...is it really, really hard?");
		break;
	case 15:
		qm.sendNextPrevS("Yes. Since you need to be able to aim two bowguns at a time, and you can only use one hand for each. And a bowgun isn't as strong as a regular bow. And you need to be really good at running.", 2);
		break;
	case 16:
		qm.sendNextPrev("I'm not good at running...");
		break;
	case 17:
		qm.sendNextPrevS("You're not? But you're really good at shooting a bow, aren't you? I've seen you practice, and you're always getting bulls' eyes.", 2);
		break;
	case 18:
		qm.sendNextPrev("You saw me?");
		break;
	case 19:
		qm.sendNextPrevS("Athena, if you keep practicing with your bow, you'll be a master archer someday. Even without Dual Bowguns, you'll be strong enough. Who knows? Maybe, someday, you'll be teaching young Bowmen how to shoot.", 2);
		break;
	case 20:
		qm.sendNextPrev("Really?");
		break;
	case 21:
		qm.sendNextPrevS("Of course!", 2);
		break;
	case 22:
		qm.sendNextPrevS("(Athena was a good girl, but stubborn. It's hard to believe how much she grew up...)", 2);
		break;
	case 23:
		qm.dispose();
		qm.gainExp(3500);
		Packages.server.quest.MapleQuest.getInstance(24069).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().changeMap(qm.getMap(101050020), qm.getMap(101050020).getPortal(2)); //過去的記憶
}
}