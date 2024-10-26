/*
	名字:	被搶走的天空之城封印石
	地圖:	特魯的情報商店
	描述:	104000004
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 4) {
		qm.sendNext("Mmm...? Are you too ashamed to see #p1201000#? Please don't think that way. We feel terrible that you had to take care of so many dangerous missions on your own.");
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
		qm.sendNextS("Welcome back. How did it go in #m200000000#? Were the occurrences there related to the Black Wings? Why do you seem so gloomy? Tell me what's wrong.", 8);
		break;
	case 1:
		qm.sendNextPrevS("#b(You tell him about the Seal Stone of #m200000000#.)", 2);
		break;
	case 2:
		qm.sendNextPrevS("Hmm... So there was a Seal Stone in #m200000000#, too, huh? That's a valuable piece of information. It stinks that you lost it, but... No, no, I'm not blaming you for it. I just think the Black Wings were thoroughly prepared this time.", 8);
		break;
	case 3:
		qm.sendNextPrevS("...");
		break;
	case 4:
		qm.sendAcceptDecline("Cheer up! Oh yeah, I think #p1201000# is waiting for news from you. Why don't you go see #b#p1201000# in #m140000000##k. You can tell her about what happened in #m200000000# as well.");
		break;
	case 5:
		Packages.server.quest.MapleQuest.getInstance(21740).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendOk("#p1201000# is also a part of this, and no one knows about your past better than #p1201000# does. So it's always important to #bkeep #p1201000# updated with your progress and consult with her#k.");
		break;
	case 6:
		qm.dispose();
}
}

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 4) {
		qm.sendNext("Please don't lose sleep over something like this.I mean it.");
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
		qm.sendNextS("Hi! It's been a long time, Aran. How is your training going? I'm glad you're here...I was really curious about how you were doing!", 8);
		break;
	case 1:
		qm.sendNextPrevS("#b(You tell #p1201000# about the Seal Stone of Orbis.)", 2);
		break;
	case 2:
		qm.sendNextPrevS("The Seal Stone of Orbis, huh? I see. That clears up a lot of things. What the Black Wings are after are Seal Stones, and there are more than one. That information alone is quite valuable for us.", 8);
		break;
	case 3:
		qm.sendNextPrevS("But I lost the Seal Stone...", 2);
		break;
	case 4:
		qm.sendYesNo("The Black Wings were probably planning this for a long time. Considering that, even obtaining the Seal Stone of Victoria Island was a great feat. Please have confidence in yourself.");
		break;
	case 5:
		qm.gainExp(150);
		Packages.server.quest.MapleQuest.getInstance(21740).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.sendOk("For now, the most important thing is that you become stronger. Mr. Tru and I will keep a lookout for any leads on the Seal Stones. You just concentrate on your training.");
		break;
	case 6:
		qm.dispose();
}
}