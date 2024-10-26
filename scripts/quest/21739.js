/*
	名字:	前往封印庭園的路
	地圖:	老婆之屋
	描述:	200050001
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("Mm, you haven't had an opportunity to face the intruder yet? You must take care of that immediately.");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21739)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(21739).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendYesNo("Did you stop the intruder? But you don't look very happy... What?! You lost the Seal Stone?!");
			break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21739)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(21739).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainExp(4800);
			}
			qm.sendNextS("Really... You lost the Seal Stone? There isn't much we can do about it, at this point. And just because it's gone #bdoesn't mean #m200000000# is in imminent danger#k. To be honest, I'm not even sure what it's for.", 9);
			break;
	case 2:
		qm.sendNextPrevS("But I have a feeling it's going to serve as the first step to something catastrophic. I don't know...I just have a hunch. I want to wish you good luck. I think you'll need a lot of it.", 9);
		break;
	case 3:
		qm.sendPrevS("#b(You lost the Seal Stone of Orbis. What should you do? Maybe you should go talk to #p1002104#.)", 2);
		break;
	case 4:
		qm.dispose();
}
}