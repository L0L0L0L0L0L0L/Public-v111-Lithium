/*
	名字:	如何找到朋友
	地圖:	維多利亞港
	描述:	104000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
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
		qm.sendAcceptDecline("Welcome to MapleStory! Have you made a lot of friends yet? I'd like to teach you how to use the find friends function.");
		break;
	case 1:
		qm.sendNext("It's really easy! Simply press R to bring up your Friend window. There, you can press the Find Friends button and search for friends with common interests. When you find soemone you like, simply add them as a Buddy.");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(28433).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.dispose();
}
}