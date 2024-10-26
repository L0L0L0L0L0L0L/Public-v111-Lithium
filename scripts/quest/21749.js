/*
	名字:	回到過去的路
	地圖:	特魯的情報商店
	描述:	104000004
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 4) {
		qm.sendNext("And here I thought we agreed on everything! Just think about it, and we'll talk more about this afterwards.");
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
		qm.sendNext("Oh, hello there. You've leveled up so much that I didn't even recognize you at first. This task should be a breeze for you then. What task, you ask?");
		break;
	case 1:
		qm.sendNextPrev("While you were training, #p1201000# and I have been thoroughly looking into your past and the Seal Stone. And guess what? We received an interesting piece of information just recently. Do you know the town that consists of toys for kids known as #m220000000#?");
		break;
	case 2:
		qm.sendNextPrev("There are two clocktowers in #m220000000# that control time. These towers allow time in #m220000000# to remain frozen. I hear the clocks stop time because the toys will become useless if the kids grow up.");
		break;
	case 3:
		qm.sendNextPrev("But apparently, one of the clocktowers broke. No one knows why or how, but the broken clocktower has #bcreated a time gap in #m220000000#, allowing people to travel to the past#k. Oh, and this is where it gets interesting...");
		break;
	case 4:
		qm.sendAcceptDecline("Based on the information we've collected from people that've entered the time portal, we were able to conclude that the time they traveled to in #m220000000# is #bclose to the time when you were around#k! The way people dressed, the items they used, the surroundings, it all points to that time! We might be able to find more information on the Seal Stone then, don't you think?");
		break;
	case 5:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21749)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(21749).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(21749));
			}
			qm.sendNextS("I mean, I am not worried about the Seal Stone itself. I just thought there was a possibility of you meeting someone that knew you back in that time period.", 1);
			break;
	case 6:
		qm.sendPrevS("#bThe right clocktower#k... Specifically, the Helios Tower, is the broken one. Inside #bthe building that resembles a pink bunny head#k, you will find a device that manages time. #bTake the ladder to the top of Helios Tower and continue going up#k. You'll be able to enter the past from there.", 1);
		break;
	case 7:
		qm.dispose();
}
}