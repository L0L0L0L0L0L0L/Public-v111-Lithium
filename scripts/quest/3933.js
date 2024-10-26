/*
	名字:	亞廷的沙影團
	地圖:	納希民宅
	描述:	260000200
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 0) {
		qm.sendNext("Do you need time to prepare yourself for a fight like this?Don't tense up too much!");
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
		qm.sendNext("I didn't think you'd be this strong. I feel like you have what it takes to become a member of the Sand Bandits. The most important aspect of being a member is power, and I think you have that. I also... want to test you one more time, just to make sure you're the right one. What do you think? Can you handle it?");
		break;
	case 1:
		qm.sendAcceptDecline("To truly see your strength, I'll have to face you myself. Don't worry, I'll summon my other self to face off against you. Are you ready?");
		break;
	case 2:
		qm.sendNext("Good, I like your confidence.");
		break;
	case 3:
		if (qm.getMap(926000000).getCharacters().size() < 1) {
			Packages.server.quest.MapleQuest.getInstance(3933).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.getMap(926000000).resetFully();
			qm.getPlayer().changeMap(qm.getMap(926000000), qm.getMap(926000000).getPortal(1));
			qm.getPlayer().startMapTimeLimitTask(900, qm.getMap(260000200));
			qm.dispose();
			return;
			}
			qm.sendOk("Ah... please wait. I think someone else is in there right now. Please come back in a bit.");
			qm.dispose();
}
}