/*
	名字:	第一個任務的結果
	地圖:	天空之城
	描述:	200000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("Oh, you're not interested. It's pretty fun though!");
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
		qm.sendAcceptDecline("You want to know if the plants near #m200000000# have grown exceptionally fast? How did you know? \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 23000 exp");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22593)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(22593).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(22593));
			qm.gainExp(5300);
			}
			qm.sendNext("Yes, it was quite a dilemma for us when the #b#o4230105#s started growing like crazy#k! Thankfully, someone that was passing by did some investigating on our behalf, and we were able to resolve the issue, but boy, it was a big deal!");
			break;
	case 2:
		qm.sendPrev("Why are you making that face? We've already resolved the issue so you don't need to worry about it.");
		break;
	case 3:
		qm.dispose();
}
}