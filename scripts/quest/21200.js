/*
	名字:	武器選擇主人
	地圖:	瑞恩村
	描述:	140000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("It's extremely urgent. You'll regret it if you decline. Why, you ask? Because it's #babout your Polearm#k. In other words, it's about your past. Who knows? The Polearm could be the key to restoring your abilities...");
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
		qm.sendAcceptDecline("How is training going? Wow, you've reached such a high level! That's amazing. I knew you would do just fine on Victoria Island... Oh, look at me. I'm wasting your time. I know you're busy, but you'll have to return to the island for a bit.");
		break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(21200).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendOk("Your #b#p1201001##k in #b#m140000000##k is acting strange all of a sudden. According to the records, the Polearm acts this way when it is calling for its master. #bPerhaps it's calling for you#k. Please return to the island and check things out.");
		break;
	case 2:
		qm.dispose();
}
}

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 10) {
		qm.sendNext("Hey! At least say you tried!");
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
		qm.sendNext("Voom voom voom voom voom....");
		break;
	case 1:
		qm.sendNextPrevS("#b(The #p1201001# is producing an undulating echo. But who is that boy standing over there?)", 2);
		break;
	case 2:
		qm.sendNextPrevS("#b(You've never seen him before. He doesn't look human.)", 2);
		break;
	case 3:
		qm.sendNextPrevS("Yo, Aran! Do you not hear me? I said, do you not hear me! Ugh, how frustrating!", 8);
		break;
	case 4:
		qm.sendNextPrevS("#b(Hm? Who's voice was that? It sounds like an angry boy...)", 2);
		break;
	case 5:
		qm.sendNextPrevS("Ugh, my only master had to end up trapped in ice for hundreds of years, abandoning me completely, and is now completely ignoring me.", 8);
		break;
	case 6:
		qm.sendNextPrevS("Who...are you?", 2);
		break;
	case 7:
		qm.sendNextPrevS("Aran? Do you hear me now? It's me! Don't you recognize me? I'm your weapon, #b#p1201002# the Polearm#k!", 8);
		break;
	case 8:
		qm.sendNextPrevS("#b(...#p1201002#? A #p1201001# can talk?)", 2);
		break;
	case 9:
		qm.sendNextPrevS("What's with that suspicious look on your face? I know you've lost your memory, but did you forgot about me, too? How could you?!", 8);
		break;
	case 10:
		qm.sendNextPrevS("I'm so sorry, but I can't remember a thing.", 2);
		break;
	case 11:
		qm.sendYesNo("Sorry doesn't cut it! Do you know how lonely and bored I was for hundreds of years? I don't care what it takes! Remember me! Remember me now!");
		break;
	case 12:
		Packages.server.quest.MapleQuest.getInstance(21200).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.sendNextS("#b(The voice that claims to be #p1201002# the #p1201001# is yelling in frustration. You don't think this conversation is going anywhere. You better go talk to #p1201000# first.)", 3);
		break;
	case 13:
		qm.getPlayer().changeMap(qm.getMap(914090200), qm.getMap(914090200).getPortal(0));
		qm.dispose();
}
}