/*
	名字:	後悔
	地圖:	秘密廣場
	描述:	310010000
*/

var status = -1;

function start(mode, type, selection) {
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
		qm.sendNext("Where's #p2159348#? Weren't you going to get her?");
		break;
	case 1:
		qm.sendNextPrevS("(You explain #p2154009#'s trap, and the explosion that swallowed #p2159348# up...)", 2);
		break;
	case 2:
		qm.sendNextPrev("Then #p2159348# is...");
		break;
	case 3:
		qm.sendNextPrevS("......", 2);
		break;
	case 4:
		qm.sendNextPrev("What a fool I've been! I should have kept a closer eye on her when she first got here... I should have realized what #p2154009# was up to...");
		break;
	case 5:
		qm.sendNextPrev("I shouldn't have been too prideful to accept the #p1101000# Knights' help when they offered to send us Feather Plant...");
		break;
	case 6:
		qm.sendNextPrev("I thought we could take down the Black Wings on our own, but I guess I was wrong. At the end of the day, #p2154009# still fooled us, and #p2159348#...");
		break;
	case 7:
		qm.sendNextPrev("I'm sorry, but could you give me some time alone? I'm sure you need some time, too...");
		break;
	case 8:
		Packages.server.quest.MapleQuest.getInstance(23145).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(23145));
		qm.gainExp(10000);
		qm.dispose();
}
}