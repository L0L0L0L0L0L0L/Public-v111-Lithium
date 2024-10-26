/*
	名字:	調查天空之城
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
		if (status == 2) {
		qm.sendNext("What? Do you have some other world-ending disaster to prevent?");
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
		qm.sendNext("Long time no see! You've leveled up a lot since the last time we met. You must be training really hard. Always hard-working. I'm not surprised. It's exactly what a hero like you would do. I'm sure #p1201000# will be happy to hear about your progress.");
		break;
	case 1:
		qm.sendNextPrev("Anyway, enough small talk. I realized that it might be more effective to search for information in places outside Victoria Island as well, so I've begun investigating in Ossyria. I began with #b#m200000000##k and immediately hit the jackpot.");
		break;
	case 2:
		qm.sendAcceptDecline("It seems like something strange is happening in #m200000000# in Ossyria. It's a bit different from when we were dealing with the puppeteer, but my instincts tell me it has to do with the Black Wings. Please head over to #m200000000#.");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(21736).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendNext("#b#p2012012# the Fairy#k in #m200000000# should know a thing or two. Go see #p2012012# and use the #bThere's something strange going on in #m200000000##k keyword to talk to her.");
		break;
	case 4:
		qm.sendPrev("This is the biggest mission we've had in a while. You nervous?");
		break;
	case 5:
		qm.dispose();
}
}