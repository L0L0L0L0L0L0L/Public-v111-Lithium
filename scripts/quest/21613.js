/*
	名字:	狼的測試
	地圖:	狼之平原
	描述:	140010210
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 1) {
		qm.sendNext("What a foolish human being...");
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
		qm.sendNextS("We're a pack of wandering wolves in search of our missing pup. I hear that you've been taking care of our baby. We appreciate your kindness, but it's time for you to return our baby to us.", 8);
		break;
	case 1:
		qm.sendNextPrevS("Werewolf is my friend. I can't just hand over a friend.", 2);
		break;
	case 2:
		qm.sendAcceptDecline("We understand, but we won't leave without our pup. Tell you what, we'll test you to see if you are worthy of raising a wolf. #rGet ready to be tested by wolves.#k");
		break;
	case 3:
		if (qm.getMap(914030000).getCharacters().size() < 1) {
			Packages.server.quest.MapleQuest.getInstance(21613).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.getMap(914030000).resetFully();
			qm.getPlayer().changeMap(qm.getMap(914030000), qm.getMap(914030000).getPortal(1));
			qm.getPlayer().startMapTimeLimitTask(600, qm.getMap(140010210));
			qm.dispose();
			return;
			}
			qm.sendNext("The test of the wolves will begin shortly. Come talk to me in a bit.");
			qm.dispose();
}
}