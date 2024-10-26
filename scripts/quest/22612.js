/*
	名字:	奇怪的女子，吉可穆德
	地圖:	寶貝龍
	描述:	寶貝龍
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22612)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(22612).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("I'm really busy right now, so make it quick!");
			break;
	case 1:
		qm.sendNextPrevS("...You're the one I saw in the cave earlier! Why'd you wander off like that?", 2);
		break;
	case 2:
		qm.sendNextPrev("I don't know what you're talking about. I haven't been to any caves. In fact, I hate caves.");
		break;
	case 3:
		qm.sendNextPrev("You can't fool the great #p1013000#! It'll take more than a mask to hide your identity from me!", 1013000);
		break;
	case 4:
		qm.sendNextPrev("Hey... Your lizard's talking...");
		break;
	case 5:
		qm.sendNextPrev("I'm no lizard! I'm an Onyx Dragon!", 1013000);
		break;
	case 6:
		qm.sendNextPrev("An Onyx Dragon...?");
		break;
	case 7:
		qm.sendNextPrev("What were you doing there? Are you with the Black Wings? Or are you against them?", 1013000);
		break;
	case 8:
		qm.sendNextPrev("Quiet, kid! Don't you know this place's crawling with Black Wings? Ugh, I hate stubborn brats like you. Meet me at #m310020200# and I'll tell you what you want to know.");
		break;
	case 9:
		Packages.server.quest.MapleQuest.getInstance(22612).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.dispose();
}
}