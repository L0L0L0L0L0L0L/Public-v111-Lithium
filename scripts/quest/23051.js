/*
	名字:	黑色翅膀的新武器
	地圖:	陷阱！實驗室監獄
	描述:	931000312
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 0) {
		qm.sendNext("Eh? ls there something else you need to take care of here?");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23051)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(23051).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("You really destroyed the Black Wings' new weapon! I can't believe my eyes. You've upturned the status quo! The Resistance is lucky to have you! Truly lucky!");
			break;
	case 1:
		qm.sendYesNo("Oh. I was so happy, I forgot about our next move. Once #p2154009# finds out that his new weapon has been destroyed, he is sure to come down with his minions. We better scram before that happens. I'll use the Underground Base #t4032742#. Ready to go? One... two... three!");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(23051).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().changeMap(qm.getMap(310010000), qm.getMap(310010000).getPortal(0));
		qm.dispose();
}
}