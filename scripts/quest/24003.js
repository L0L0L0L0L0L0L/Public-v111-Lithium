/*
	名字:	和平的音樂
	地圖:	櫻花處
	描述:	910150001
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("(......)");
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
		qm.sendAcceptDecline("(Activate the Music Box to play a gentle melody.)");
		break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(24003).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(24003));
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(24000));
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("Game/QueenOfElf", 6));
		qm.sendOk("(Serene music fills the town. May your people find peace in their dreams...)");
		break;
	case 2:
		qm.dispose();
}
}