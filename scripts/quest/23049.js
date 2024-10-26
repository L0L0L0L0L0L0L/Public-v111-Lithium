/*
	名字:	黑色翅膀的新武器
	地圖:	陷阱！實驗室監獄
	描述:	931000310
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 0) {
		qm.sendNext("Are you kidding me? Is there something else you need to take care of here?");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23049)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(23049).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("You successfully destroyed the Black Wings' new weapon! Ha! I can't believe it! You did something even I couldn't do. I'm proud that you're a part of the Resistance.");
			break;
	case 1:
		qm.sendYesNo("Wait, we don't have time for this. Once #p2154009# realizes that his new weapon has been destroyed, he'll rush down with his minions. We need to get out of here now. Use the Underground Base #t4032740#. On my count. One... two... three!");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(23049).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().changeMap(qm.getMap(310010000), qm.getMap(310010000).getPortal(0));
		qm.dispose();
}
}