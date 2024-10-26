/*
	名字:	王年海接連不斷的妄想
	地圖:	芽孢山丘
	描述:	100020000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 3) {
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
		qm.sendNext("I just don't believe it. That Stan is...the same miser who wouldn't speak to me for two years because I ate one of his candies. The same cheapskate that loaned me 3,000 mesos then calculated interest for each SECOND I was late... I just don't believe it!");
		break;
	case 1:
		qm.sendNextPrevS("#b(You had no idea that Chief Stan was such a grinch.)", 2);
		break;
	case 2:
		qm.sendNextPrev("I don't believe Stan would send such a strong adventurer my way to help my training center. It makes no sense. Stan has never helped me. But...fine. I'll test you once more but this is the last time. I know you and Stan are up to something.");
		break;
	case 3:
		qm.sendNextPrevS("#b(You try to tell him that you and Stan aren't trying to pull a fast one on him, but he ignores you.)", 2);
		break;
	case 4:
		qm.sendAcceptDecline("This test is simple. You just have to defeat #r100 Trainee Spores##k in the training center, that's all. It's not going to be easy finding them, since they hang out out amongst the Orange Mushrooms. Haha... Do you still want to enter?");
		break;
	case 5:
		Packages.server.quest.MapleQuest.getInstance(22518).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(910060100), qm.getMap(910060100).getPortal(1));
		qm.dispose();
}
}