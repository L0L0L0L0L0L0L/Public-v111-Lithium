/*
	名字:	仍舊沒有結束的修煉
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
		qm.sendNext("Well, what you're doing right now doesn't make you appear humble. You just look complacent, and that's never a good thing.");
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
		qm.sendAcceptDecline("Have you mastered your new skills? Since it looks like you have mastered those skills, it's time for you to learn a #bnew skill#k, don't you think so?");
		break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(20610).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(20610));
		qm.sendOk("#bChief Knights#k must have acquired another skill. I strongly suggest you go there and learn that skill with them as well. Maybe the Chief Knight may object to it, but mastering the skill is all about your ability to make a specific skill your own.");
		break;
	case 2:
		qm.dispose();
}
}