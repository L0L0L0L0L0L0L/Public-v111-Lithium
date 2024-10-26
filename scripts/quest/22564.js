/*
	名字:	關於龍的知識3
	地圖:	魔法森林圖書館
	描述:	101000003
*/

var status = -1;

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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22564)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(22564).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("Hmmm. You look like a human, so what brings you to the Halflingers' village? Ack! That...that dragon next to you is...an Onyx Dragon? That would make you...the human that #p1032001# was talking about! The human with the Onyx Dragon?!");
			break;
	case 1:
		qm.sendNextPrevS("#b(Chief Tatamo must indeed be a Halflinger because he instantly recognized #p1013000# as an Onyx Dragon. Since he's a Halflinger, it is unlikely that he would hurt #p1013000#.)", 2);
		break;
	case 2:
		qm.sendNextPrev("Whoa! It's amazing that there are still Onyx Dragons right here in #p20000#! And it looks so young, it must have just hatched. I cannot believe my eyes!");
		break;
	case 3:
		qm.sendNextPrevS("#b(It seems #p1032001# must have been pretending he didn't recognize #p1013000# was an Onyx Dragon. He must've known all along...)", 2);
		break;
	case 4:
		qm.sendNextPrev("Come to think of it, Onyx Dragons are one of those special dragons that can only be whole when they make a Spirit Pact! Without that pact, an Onyx Dragon is nothing. Your dragon looks quite strong. Wait, are you his...?!");
		break;
	case 5:
		qm.sendNextPrevS("#bYes. I am his Dragon Master. #p1013000#, say hello.", 2);
		break;
	case 6:
		qm.sendNextPrev("I don't need to speak to anyone other than my master. Sniff.", 1013000);
		break;
	case 7:
		qm.sendNextPrevS("#bI'm sorry. He's a little shy.", 2);
		break;
	case 8:
		qm.sendNextPrev("No worries! I've heard that Onyx Dragons can be skittish. I still can't believe that I am looking at a bona fide Onyx Dragon with my own two eyes.");
		break;
	case 9:
		qm.sendNextPrevS("#bIf they're so skittish and cautious, how did they go extinct?", 2);
		break;
	case 10:
		qm.sendNextPrev("That's... Well, that's an all but forgotten story. Hundreds of years ago, there was a powerful, dark force in Maple World. It was he who destroyed all the Onyx Dragons.");
		break;
	case 11:
		qm.sendNextPrevS("#bBut why did he destroy them?", 2);
		break;
	case 12:
		qm.sendNextPrev("I couldn't say. All I know is that the Onyx Dragons fought against him and that they were obliterated as a result. I was still but a young Halflinger then, so I don't know the details.");
		break;
	case 13:
		qm.sendNextPrev("But it seems they weren't completely obliterated after all. I wonder how difficult life must be for this little creature. We have great facilities for raising dragons here in #m240000000#. Interested in settling down by any chance?");
		break;
	case 14:
		qm.sendNextPrev("No. I go where my master goes.", 1013000);
		break;
	case 15:
		qm.sendNextPrev("Ah, yes. Of course. I've also heard that Onyx Dragons treasure their relationships with their masters more than even their own instincts. I see its true.");
		break;
	case 16:
		qm.sendNextPrev("Onyx Dragons are supposedly spiritually connected to their masters. The master's power increases the Onyx Dragon strength, and the master, in turn, can harness that strength.");
		break;
	case 17:
		qm.sendNextPrev("But not just anyone can become the master of an Onyx Dragon. Onyx Dragons have a keen eye for those with strong spirits. They are extremely picky. You must have an extremely powerful spirit, my friend.");
		break;
	case 18:
		qm.sendNextPrev("I wish you'd consider leaving him here in #m240000000# but I know won't. I wonder...are there other Onyx Dragons still out there? Don't give up. I'll help #p1032001# find another of his race.");
		break;
	case 19:
		qm.sendNextPrev("I'll send a message to you if I discover anything. \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 2000 exp \r\n#fUI/UIWindow.img/QuestIcon/10/0# 1 sp");
		break;
	case 20:
		Packages.server.quest.MapleQuest.getInstance(22564).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().gainSP(1, 3);
		qm.gainExp(2000);
		qm.dispose();
}
}