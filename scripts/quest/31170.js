/*
	名字:	倒地的狂狼勇士
	地圖:	燃燒的神木村3
	描述:	272000300
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
		var reactor = 'action' + (qm.getPlayer().getJob() < 2000 ? 1 : qm.getPlayer().getJob() < 2200 ? 2 : qm.getPlayer().getJob() < 2300 ? 3 : qm.getPlayer().getJob() < 2400 ? 4 : 1);
		eval(reactor)(mode, type, selection);
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendNext("Hey, over here!");
		break;
	case 1:
		qm.sendNextPrevS("What's happening?! Huh? Is this Aran?!", 2);
		break;
	case 2:
		qm.sendNextPrev("You know my master? You seem like an outsider, but I don't think you're up to no good.");
		break;
	case 3:
		qm.sendNextPrev("I'm the Spirit of the Polearm, #p2144005#. Me and my buddy over there beat up the Black Mage and imprisoned him behind a powerful Seal. Unfortunately, that old jerk got off a powerful curse right before the heroes locked him up. That's why the master's out cold night now.");
		break;
	case 4:
		qm.sendNextPrev("Aran may never wake up after a cursing like that. I need to get the master somewhere safe before some monster decides they're ready for a snack. As you can imagine, I'm not much use when it comes to moving unconscious people, especially lunkheads like this. You wanna help out?");
		break;
	case 5:
		Packages.server.quest.MapleQuest.getInstance(31170).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.gainExp(301891);
		qm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendNext("Hey, over here!");
		break;
	case 1:
		qm.sendNextPrevS("Wha-how is this possible?! #p2144005#?!", 2);
		break;
	case 2:
		qm.sendNextPrev("How can there be two Arans?! Is this another one of the Black Mage's traps?!");
		break;
	case 3:
		qm.sendNextPrevS("Calm down. I'm Aran, but I'm from the future. I traveled through the crack created by #p2144010#.", 2);
		break;
	case 4:
		qm.sendNextPrev("The future?! Good! That means this moron won't get iced for a while and I'll get to keep on cracking skulls! Well, if you came back to the past just to stand around, maybe you can help me out.");
		break;
	case 5:
		Packages.server.quest.MapleQuest.getInstance(31170).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.gainExp(301891);
		qm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendNext("Hey, over here!");
		break;
	case 1:
		qm.sendNextPrevS("What's going on here? Why is Aran knocked out?!", 2);
		break;
	case 2:
		qm.sendNextPrev("Freud?! When did you get so...unwrinkled?! #p2144006# you're tiny too! Did the Black Mage do this?!");
		break;
	case 3:
		qm.sendNextPrevS("I'm not Freud, I'm Evan. This is Mir.", 2);
		break;
	case 4:
		qm.sendNextPrev("That's odd. Your energies are a near match for Freud and #p2144006#. I guess I'm just getting old and rusty. Glad to have you on board!");
		break;
	case 5:
		qm.sendNextPrev("I'm the Spirit of the Polearm, #p2144005#. Me and my buddy over there beat up the Black Mage and imprisoned him behind a powerful Seal. Unfortunately, that old jerk got off a powerful curse right before the heroes locked him up. That's why the master's out cold right now.");
		break;
	case 6:
		qm.sendNextPrev("Aran may never wake up after a cursing like that. I need to get the master somewhere safe before some monster decides they're ready for a snack. As you can imagine, I'm not much use when it comes to moving unconscious people, especially lunkheads like this. You wanna help out?");
		break;
	case 7:
		Packages.server.quest.MapleQuest.getInstance(31170).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.gainExp(301891);
		qm.dispose();
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendNext("Hey, over here!");
		break;
	case 1:
		qm.sendNextPrevS("What is this? Aran?! Are you hurt?!", 2);
		break;
	case 2:
		qm.sendNextPrev("Mercedes! You made it! How did you get away from the Black Mage's curse?");
		break;
	case 3:
		qm.sendNextPrevS("It's a long story, but the short answer is that I didn't. I've been recuperating for some time now.", 2);
		break;
	case 4:
		qm.sendNextPrev("What's that supposed to mean? You're always so cryptic. But, I suppose everybody's got their secrets. I'm glad you're safe. I wish master would get off his lazy behind and say hi.");
		break;
	case 5:
		qm.sendNextPrevS("Do not worry. Aran's strength will return in time. I have seen it with my own eyes.", 2);
		break;
	case 6:
		qm.sendNextPrev("What? Did you knock yourself in the head? You need to get some exercise and work that noodle out. Picking up a big sweaty lunkhead is just the remedy you need! Go on, get this idiot to safety!");
		break;
	case 7:
		Packages.server.quest.MapleQuest.getInstance(31170).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.gainExp(301891);
		qm.dispose();
}
}