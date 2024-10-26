/*
	名字:	尋找回遺失的記憶
	地圖:	瑞恩村
	描述:	140000000
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
		qm.sendNext("What is it, Aran? Have you remembered something?");
		break;
	case 1:
		qm.sendNextPrev("Memories with Aran? I have many of those. I remember Aran when he was regaining his abilities, how he maintained his composure as a hero despite not remembering his past. Those are my treasured memories.");
		break;
	case 2:
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(3539));
		Packages.server.quest.MapleQuest.getInstance(3539).forceComplete(qm.getPlayer(), qm.getNpc());
		Packages.server.quest.MapleQuest.getInstance(7081).forceStart(qm.getPlayer(), qm.getNpc(), 1);
		qm.dispose();
}
}