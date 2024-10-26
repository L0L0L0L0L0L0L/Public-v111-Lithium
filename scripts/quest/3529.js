/*
	名字:	找回遺失的記憶
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
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		qm.sendNext("What is it, #h0#? Are you here for a mission?");
		break;
	case 1:
		qm.sendNextPrev("Memories? I don't know if there are any good memories between us... I do remember the first time you came to this place, though. You, the mere aspirant knight, were SO sure you'd go out and defeat the Black Mage. It was... awkward to hear.");
		break;
	case 2:
		qm.sendNextPrev("I guess you can call that a memory...");
		break;
	case 3:
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(3529));
		Packages.server.quest.MapleQuest.getInstance(3529).forceComplete(qm.getPlayer(), qm.getNpc());
		Packages.server.quest.MapleQuest.getInstance(7081).forceStart(qm.getPlayer(), qm.getNpc(), 1);
		qm.dispose();
}
}