/*
	名字:	黑色翅膀的新武器
	地圖:	陷阱！實驗室監獄
	描述:	931000311
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 0) {
		qm.sendNext("Eh? Is there something else you need to take care of here?");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23050)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(23050).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("You destroyed the Black Wing's new weapon! I knew I was right about you! There is nothing sharper than the eyes of a bowman. I'm proud to call you a fellow member of the Resistance!");
			break;
	case 1:
		qm.sendYesNo("I'd love nothing more than to rub what we've done in #p2154009#'s face, but things could get hairy if he gathers all his minions. Let's get out of here. Use the Underground Base #t4032741# on my count. One... two... three!");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(23050).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().changeMap(qm.getMap(310010000), qm.getMap(310010000).getPortal(0));
		qm.dispose();
}
}