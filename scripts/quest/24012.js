/*
	名字:	精靈的英雄 3轉
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
		qm.sendAcceptDecline("...It's been quite some time, Queen Mercedes. I see you've recovered much of your original strength since we last spoke. You have come in search of the Royal Power, and so I shall grant it unto thee.");
		break;
	case 1:
		qm.sendNext("Young Ruler of the Elves, rise and lead your people to victory.");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(24012).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(24012));
		qm.getPlayer().changeJob(2311);
		qm.dispose();
}
}