/*
	名字:	準備逃脫
	地圖:	發電廠大廳
	描述:	310050000
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 3) {
		qm.sendNext("Don't you dare look down on me just because I'm a rabbit. I happen to be quite a high-ranking member of the Black Wings!");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23951)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(23951).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("What? What do you want?");
			break;
	case 1:
		qm.sendNextPrevS("Er, is there anyone higher-ranked than you that I could talk to?", 2);
		break;
	case 2:
		qm.sendNextPrev("Are you looking down on me because I'm a rabbit? Hey buddy, even though I'm a bunny, I still outrank you! Show me some respect!");
		break;
	case 3:
		qm.sendNextPrevS("Okay... I found a broken #o6150000#. I think we have an infiltrator.", 2);
		break;
	case 4:
		qm.sendYesNo("What?! Let's go! You! Follow me!");
		break;
	case 5:
		Packages.server.quest.MapleQuest.getInstance(23951).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().changeMap(qm.getMap(310050200), qm.getMap(310050200).getPortal(1));
		qm.gainItem(4000608, -30);
		qm.dispose();
}
}