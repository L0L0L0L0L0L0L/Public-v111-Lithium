/*
	名字:	傀儡師的痕跡
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
		if (status > 1) {
		qm.sendNext("My information is the best on the whole continent! You'd be a fool not to trust me.");
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
		qm.sendNext("Are you busy? I have been looking all over Victoria Island in search of valuable information and found something that might intrigue you. It's about the #o9300346#...");
		break;
	case 1:
		qm.sendNextPrev("I don't know if you know this, but ever since you taught the #o9300346# a lesson, the entrance to the Evil Eye Cave doesn't work. It looks like the #o9300346# has moved to a new hideout.");
		break;
	case 2:
		qm.sendAcceptDecline("I received a report that someone witnessed the #o9300346# entering #bPuppeteer's Hideout#k in #bForest of Evil Energy 1#k at #b#m101000000##k. I heard it from a reliable source, so it's probably true. Rush over and defeat the #r#o9300346##k.");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(21734).forceStart(qm.getPlayer(), qm.getNpc(), null);
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21734)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(21734).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainExp(3700);
			}
			qm.sendNextS("You must have come back after defeating the #o9300346#... But what's with the long face? Did something happen?", 8);
			break;
	case 1:
		qm.sendNextPrevS("There wasn't any information on the Seal Stone of Victoria Island.", 2);
		break;
	case 2:
		qm.sendPrevS("Ah, that's what's bothering you. Hahaha, you don't have to worry about that.", 8);
		break;
	case 3:
		qm.dispose();
}
}