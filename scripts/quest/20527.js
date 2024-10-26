/*
	名字:	騎士的品格
	地圖:	耶雷弗
	描述:	130000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 0) {
		qm.sendNext("You don't want to learn about powerful mounts? Fine. But leave your medal of knights behind too.");
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
		qm.sendNext("Oh no, you're at Level 100 and you're still riding a regular Mimiana? That's so very unfortunate. How can you call yourself an Advanced Knight when you are acting like just another regular Knight?");
		break;
	case 1:
		qm.sendAcceptDecline("I keep having to remind you this, but your actions do affect the reputation of the Empress Please act suitably for your status for the sake of the Empress. Go to #b#p1102002##k and you'll learn more about #bEnhanced Monster Riding#k.");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(20527).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(20527));
		qm.sendOk("You didn't forget where #p1102002# is located, did you? you can find #p1102002# at #b#m130010220##k, the optimal place to raise your Mimiana.");
		break;
	case 3:
		qm.dispose();
}
}