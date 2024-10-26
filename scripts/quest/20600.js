/*
	名字:	沒有結束的修煉
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
		qm.sendAcceptDecline("#h0#. Have you been slacking off on training since reaching Level 90? We all know how powerful you are, but the training is not complete. Take a look at these Knight Commander. They train day and night, preparing themselves for the possible encounter with the Black Wizard.");
		break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(20600).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(20600));
		qm.sendOk("I strongly suggest you talk to the Knight Commander for some advice. Who knows? You might be able to find a new #bskill#k...");
		break;
	case 2:
		qm.dispose();
}
}