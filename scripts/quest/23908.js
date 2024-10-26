/*
	名字:	寶貝龍的反應
	地圖:	寶貝龍
	描述:	寶貝龍
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 1) {
		qm.sendNext("Yeah? You think that there is something else we could be doing? Master, you really are a genius! Tell me what we should do!");
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
		qm.sendNext("Master! Doesn't the relationship between the town of #m310000000# and the group we joined strike you as...weird? We seem to be getting more and more involved with the Black Wings. Are you sure that's a good thing?");
		break;
	case 1:
		qm.sendNextPrevS("Hm. The more we help the Black Wings, the more I get the feeling that something is...off. The people in#m310000000# really hate the Black Wings. It really makes me wonder...", 2);
		break;
	case 2:
		qm.sendAcceptDecline("Me, too. But all we can do for now is to try and find out more about the mission given to us by the Black Wings, right?");
		break;
	case 3:
		qm.gainExp(2100);
		Packages.server.quest.MapleQuest.getInstance(23908).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(23908));
		qm.sendOk("Ahhh! I'm so confused. Are the Black Wings good guys or bad guys?");
		break;
	case 4:
		qm.dispose();
}
}