/*
	名字:	尋找漂亮的馬鞍
	地圖:	耶雷弗
	描述:	130000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 9) {
		qm.sendNext("Well, I guess you're not all that desperate for a saddle after all. Please leave #m130000000# at once.");
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
		qm.sendNext("What gives you the right to step into #m130000000# without permission? State your name, job, and purpose. If you lie or if your purpose is not adequate, you will not be allowed to enter.");
		break;
	case 1:
		qm.sendNextPrevS("#bThis is a restricted area? But I've seen so many people enter and leave freely...", 2);
		break;
	case 2:
		qm.sendNextPrev("This island may only be accessed by Empress #p1101000#'s Knights. Since you did not realize this, I will let it slide. Now leave immediately.");
		break;
	case 3:
		qm.sendNextPrevS("#bWa..wait! Can you just answer one question?", 2);
		break;
	case 4:
		qm.sendNextPrev("Oh? You do have a purpose here then? Then state your name, job, and purpose.");
		break;
	case 5:
		qm.sendNextPrevS("#bOkay... Evan. Dragon Master. Searching for a saddle. Look, all I need is a saddle, and I heard you can find great ones here. Just let me get a saddle and I'll be on my way...", 2);
		break;
	case 6:
		qm.sendNextPrev("Dragon Master? Are you like a Magician that commands a Bahamut?");
		break;
	case 7:
		qm.sendNextPrevS("#bHuh? Er, no...I don't think so?", 2);
		break;
	case 8:
		qm.sendNextPrev("Hm! You're a strange one. Dragon Master... Never heard of it. I must make a note to look into that. You asked about a saddle?");
		break;
	case 9:
		qm.sendAcceptDecline("The Knights' saddles aren't made here. We just don't have the resources for that. We outsource our saddle production. Would you like to find out where?");
		break;
	case 10:
		qm.sendNext("All our saddles are made by #b#p2060005##k at the #m230000003# #b#m230000000#. They are high quality saddles, but they cost so much you'll feel your eyeballs are popping out of your head. So prepare yourself.");
		break;
	case 11:
		qm.sendPrev("Is that all you need? Then please remove yourself from this island at once. You seem nice, but rules are rules. We don't permit outsiders to linger.");
		break;
	case 12:
		Packages.server.quest.MapleQuest.getInstance(22403).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}