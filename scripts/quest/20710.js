/*
	名字:	藏在垃圾桶內的東西
	地圖:	墮落城市
	描述:	103000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("What? Are you declining the mission? Fine, do it like that. I'll just report it straight to #p1101002#.");
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
		qm.sendAcceptDecline("Honestly I'm not really confident in you... But since you're a Cygnus Knight and all, and since no one else can go on a search right now, I guess I'm only left with you. Okay, let me explain to you what this mission is about.");
		break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(20710).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}