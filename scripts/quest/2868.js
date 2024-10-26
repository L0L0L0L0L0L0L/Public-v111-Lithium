/*
	名字:	靈魂的幫助
	地圖:	墮落城市醫院
	描述:	103000004
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 0) {
		qm.sendNext("Are you scared...? Let me know when you're ready...");
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
		qm.sendNext("Why would I know rumors about a ghost in the Subway...? I didn't even know the rumors about ME...");
		break;
	case 1:
		qm.sendYesNo("You think a Shade made someone into a ghost..? Maybe... Maybe they don't know they're a ghost... Okay, I'll check it out with you...");
		break;
	case 2:
		qm.sendNext("Be sure you eliminate all the nearby monsters...so I can concentrate... Let's go...");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(2868).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(103020420), qm.getMap(103020420).getPortal(3));
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
		qm.sendNext("I can't find anything strange here... Maybe there was a ghost, but it's gone now... Let's just go back to Naora Hospital...");
		break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(2868).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().changeMap(qm.getMap(103000004), qm.getMap(103000004).getPortal(0));
		qm.gainExp(564);
		qm.dispose();
}
}