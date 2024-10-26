/*
	名字:	找回遺失的記憶
	地圖:	魔法森林圖書館
	描述:	101000003
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
		qm.sendNext("That is some greatly refined magic. Something possessed only by those who call themselves great wizards... Come to think of it, there was a beginner a long time ago who showed great potential to become a great wizard. The name was... #h0#.");
		break;
	case 1:
		qm.sendNextPrev("You were just a beginner who didn't even know how to use Energy Bolt. Now, look at you! You're all grown up! I'm so proud. I knew you could do it.");
		break;
	case 2:
		qm.sendNextPrev("Continue to grow and advance. As the one who has made you into a wizard, I can promise you that you will become a more powerful wizard...");
		break;
	case 3:
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(3524));
		Packages.server.quest.MapleQuest.getInstance(3524).forceStart(qm.getPlayer(), qm.getNpc(), null);
		Packages.server.quest.MapleQuest.getInstance(7081).forceStart(qm.getPlayer(), qm.getNpc(), 1);
		qm.dispose();
}
}