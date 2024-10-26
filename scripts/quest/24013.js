/*
	名字:	精靈的英雄 4轉
	地圖:	偉大的精神降臨
	描述:	910150100
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("I can awaken the power within you. What gives you cause for hesitation?");
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
		qm.sendAcceptDecline("...Mercedes, Ruler of the Elves... You already possess the qualifications of rulership. I grant unto you the Royal Power.");
		break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(24013).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(24013));
		qm.getPlayer().changeJob(2312);
		qm.dispose();
}
}