/*
	名字:	生存的法則
	地圖:	秘密據點
	描述:	103000003
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
		qm.sendYesNo("If you want to survive in Kerning City, you need to get stronger. Perhaps if you can complete my training, you'll stand a chance...");
		break;
	case 1:
		qm.sendYesNo("The training is simple enough. #bJust eliminate the Octopuses in the Thieves' Hideout#k. Shall we begin?");
		break;
	case 2:
		if (qm.getMap(910310100).getCharacters().size() < 1) {
			Packages.server.quest.MapleQuest.getInstance(2850).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.getMap(910310100).resetFully();
			qm.getPlayer().changeMap(qm.getMap(910310100), qm.getMap(910310100).getPortal(1));
			qm.getPlayer().startMapTimeLimitTask(180, qm.getMap(103000003));
			qm.dispose();
			return;
			}
			qm.sendNext("Ah... please wait. I think someone else is in there right now. Please come back in a bit.");
			qm.dispose();
}
}

function end(mode, type, selection) {
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
		if (qm.getMap().getAllMonstersThreadsafe().size() > 0) {
			qm.sendOk("Eliminate all the Octopuses here. Even you should be able to handle this.");
			qm.dispose();
			return;
			}
			qm.sendNext("Piece of cake, right?");
			break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2850)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(2850).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainExp(475);
			}
			qm.sendNextPrev("So you CAN hold your own. But this is just the beginning! You have a long way to go!");
			break;
	case 2:
		qm.sendNextPrev("You made it this far, so let me give you some advice. You can't trust anyone in Kerning City! Now leave.");
		break;
	case 3:
		qm.getPlayer().changeMap(qm.getMap(103000000), qm.getMap(103000000).getPortal(16));
		qm.dispose();
}
}