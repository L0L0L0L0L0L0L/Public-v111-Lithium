/*
	名字:	一口豬肉
	地圖:	寶貝龍
	描述:	寶貝龍
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 1) {
		qm.sendNext("How can you starve me like this. I'm just a baby. This is wrong!");
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
		qm.sendNext("No, no, no. This isn't what I need. I need something more nutritious, master!");
		break;
	case 1:
		qm.sendNextPrevS("#bHm... So you're not a herbivore. You might be a carnivore. You're a Dragon, after all. How does some #t4032453# sound?", 2);
		break;
	case 2:
		qm.sendAcceptDecline("What's a...#t4032453#? Never heard of it, but if it's yummy, I accept! Just feed me something tasty. Anything but plants!");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(22503).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendOkS("#b(Try giving #p1013000# some #t4032453#. You have to hunt a few #o1210100#s at the farm. Ten should be plenty...)", 2);
		break;
	case 4:
		qm.dispose();
}
}