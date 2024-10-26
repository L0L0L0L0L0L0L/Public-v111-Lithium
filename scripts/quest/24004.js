/*
	名字:	櫻花處的結界
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
		qm.sendNextS("It's not a bad idea to get rid of the monsters outside first.", 2);
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
		qm.sendAcceptDecline("#b(You can see the wards to create the seal around Elluel. \r\nSpeaking the magic word will finish the spell, cutting the village off from the outside world for at least 100 years. \r\nActivate the seal?)");
		break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(24004).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(24004));
		qm.sendOk("#b(The seal is complete, and the town is safe.)");
		break;
	case 2:
		qm.dispose();
}
}