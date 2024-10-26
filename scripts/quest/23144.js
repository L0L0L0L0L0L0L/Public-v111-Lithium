/*
	名字:	傑利麥勒的陷阱
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
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		qm.sendNextS("We can't just stand by and do nothing! #p2159348# is a victim here! #p2151003#, you have to let me go save her! Please!", 2);
		break;
	case 1:
		qm.sendNextPrev("I can't! This is obviously a trap, and I don't have the agents to spare to send with you.");
		break;
	case 2:
		qm.sendNextPrevS("Then I'll go alone!", 2);
		break;
	case 3:
		qm.sendNextPrev("It's too dangerous!");
		break;
	case 4:
		qm.sendNextPrevS("#p2159348# is my friend!", 2);
		break;
	case 5:
		qm.sendNextPrev("......");
		break;
	case 6:
		qm.sendNextPrev("...I understand. But if you're captured, there won't be anyone to rescue you OR #p2159348#! Don't take any risks you can avoid.");
		break;
	case 7:
		qm.sendNextPrev("...Should I have accepted the #p1101000# Knight's offer of help?");
		break;
	case 8:
		Packages.server.quest.MapleQuest.getInstance(23144).forceStart(qm.getPlayer(), qm.getNpc(), null);
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
		qm.sendNextS("#p2159348#!", 3);
		break;
	case 1:
		qm.sendNextPrevS("#h0#...?", 1);
		break;
	case 2:
		qm.sendNextPrevS("You're back to normal? Come on, let's get out of here!", 3);
		break;
	case 3:
		qm.sendNextPrevS("Why are you...? You dummy! This is a trap! #p2154009# wanted you to bring a lot of Resistance members here so he could destroy them!", 1);
		break;
	case 4:
		qm.sendNextPrevS("We can talk later. Let's get out of here!", 3);
		break;
	case 5:
		qm.sendNextPrevS("I can't! I'm...I'm #p2154009#'s test subject! Even if I run away with you, I'll only cause more trouble for the Resistance, whether I want to...or not.", 1);
		break;
	case 6:
		qm.sendNextPrevS("Who cares about that? You're my friend!", 3);
		break;
	case 7:
		qm.sendNextPrevS("......", 1);
		break;
	case 8:
		qm.sendNextPrevS("I wasn't sure at first, to be honest. Everyone thought you might be a Black Wing spy... But now we know that's not true! This is all #p2154009#'s fault! You shouldn't blame yourself for any of this!", 3);
		break;
	case 9:
		qm.sendNextPrevS("You...you're a good friend.", 1);
		break;
	case 10:
		qm.sendNextPrevS("#p2159348#?", 3);
		break;
	case 11:
		qm.sendNextPrevS("But I really can't run away. If I do, I'll blow up...", 1);
		break;
	case 12:
		qm.sendNextPrevS("!!", 3);
		break;
	case 13:
		qm.sendNextPrevS("And if you stay, you'll blow up with me! You've got to get out of here!", 1);
		break;
	case 14:
		qm.sendNextPrevS("What?! ls there no way to stop it from happening?", 3);
		break;
	case 15:
		qm.sendNextPrevS("#p2154009# used me as bait. He planned to wait for you to show up, then blow me up, along with you and everyone you brought with you. But there is one way to escape...", 1);
		break;
	case 16:
		qm.sendNextPrevS("How? Tell me!", 3);
		break;
	case 17:
		qm.sendNextPrevS("I have a Town Return Scroll. I was saving it so I could go home, but I didn't want to cause any more trouble for you. I thought if I stayed here, I could just quietly...disappear.", 1);
		break;
	case 18:
		qm.sendNextPrevS("But seeing you now makes me miss town! Clever #p2151003#... Brave Belle... Cool Brighton... Cute Checky and Wendelline... Tough Elex... I miss them all!", 1);
		break;
	case 19:
		qm.sendNextPrevS("And they all miss you!", 3);
		break;
	case 20:
		qm.sendNextPrevS("I love them so much...and that's why I can't go back. As long as Gellimer has control of me, I'm a danger to everyone around me.", 1);
		break;
	case 21:
		qm.sendNextPrevS("Then we just have to free you from Gellimer!", 3);
		break;
	case 22:
		qm.sendNextPrevS("You're right. They'll try. But it's foo dangerous... I can't put them through anything else...", 1);
		break;
	case 23:
		qm.sendNextPrevS("If I can just save you...I'll be happy.", 1);
		break;
	case 24:
		qm.sendNextPrevS("...#p2159348#!", 3);
		break;
	case 25:
		qm.sendNextPrevS("I'm counting on you to beat the Black Wings. Don't let #p2154009# do this to anyone else!", 1);
		break;
	case 26:
		qm.sendNextPrevS("Stop!", 3);
		break;
	case 27:
		qm.dispose();
		Packages.server.quest.MapleQuest.getInstance(23144).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().changeMap(qm.getMap(931000632), qm.getMap(931000632).getPortal(0));
}
}