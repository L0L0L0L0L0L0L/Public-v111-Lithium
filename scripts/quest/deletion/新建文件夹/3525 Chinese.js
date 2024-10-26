/*
	名字:	找回遺失的記憶
	地圖:	弓箭手培訓中心
	描述:	100000201
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
		qm.sendNext("……從你的敏捷的身影來看，應該是位優秀的弓箭手……在很久之前，有一位很有潛力的初心者找到我，說要想成為弓箭手。");
		break;
	case 1:
		qm.sendNextPrev("沒想到，當初連弓箭都不會使用的人，如今已經變成了優秀的弓箭手！真了不起……");
		break;
	case 2:
		qm.sendNextPrev("請繼續努力，作為把你帶上弓箭手之路的人，我確信，你一定可以變成更強大的弓箭手……");
		break;
	case 3:
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(3525));
		Packages.server.quest.MapleQuest.getInstance(3525).forceStart(qm.getPlayer(), qm.getNpc(), null);
		Packages.server.quest.MapleQuest.getInstance(7081).forceStart(qm.getPlayer(), qm.getNpc(), 1);
		qm.dispose();
}
}