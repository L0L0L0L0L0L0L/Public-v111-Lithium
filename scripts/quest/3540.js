/*
	名字:	尋找遺失的記憶
	地圖:	弓箭手村
	描述:	100000000
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
		qm.sendNext("Wow, Evan! How nice to see you! Indeed, I have so many memories of you...");
		break;
	case 1:
		qm.sendNextPrev("Well, I wouldn't go so far as to call it a memory, but... When you, Gustav's shy little kid, stopped by on an errand... I had no idea that you'd rescue Camila! Just look at you now, a bona fide hero of Maple World!");
		break;
	case 2:
		qm.sendNextPrev("It's amazing how time flies.");
		break;
	case 3:
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(3540));
		Packages.server.quest.MapleQuest.getInstance(3540).forceComplete(qm.getPlayer(), qm.getNpc());
		Packages.server.quest.MapleQuest.getInstance(7081).forceStart(qm.getPlayer(), qm.getNpc(), 1);
		qm.dispose();
}
}