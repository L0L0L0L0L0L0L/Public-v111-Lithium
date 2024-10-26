/*
	名字:	龍的種類與特徵(下)
	地圖:	粗岩地帶
	描述:	102020400
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 2) {
		qm.sendNext("What? You don't need any help? Come on, just give it some more thought. I'd really love to help you out.");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22546)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(22546).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("Finally! You're back. I heard from #p1032104# that you traveled all around Victoria Island to get that book. So, did it contain the info you needed? What did you want to find out, anyway?");
			break;
	case 1:
		qm.sendNextPrevS("#bl wanted to learn about Onyx Dragons...", 2);
		break;
	case 2:
		qm.sendAcceptDecline("Onyx dragons? Well, those have been extinct for quite some time, as you probably learned from that book. Are you doing a research project? You're a scholar in the making, I tell you. I'd be happy to lend a hand to your research. \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 600 exp");
		break;
	case 3:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22546)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(22546).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainExp(600);
			}
			qm.sendNext("There are lots of books about dragons in #m101000003# but there aren't there aren't any other books that discuss Onyx Dragons in particular. If a new book about Onyx Dragons ever arrives in #m101000003#, I'll let you know.");
			break;
	case 4:
		qm.sendNextPrev("Oh, by the way, I have a friend in #m240000000# named #b#p2081000##k of the Halflingers. I'll ask and see if he knows anything about Onyx Dragons.");
		break;
	case 5:
		qm.sendNextPrev("Onyx Dragons... I hear they're covered in dark, clear scales and have golden horns. Your little lizard has golden horns...but it doesn't have the dark scales... Hmmm.");
		break;
	case 6:
		qm.sendNextPrevS("#b(He might try to kill #p1013000# if he finds out he's a dragon!) He isn't a dragon. He's just a lizard!", 2);
		break;
	case 7:
		qm.sendPrev("Ah, geez. Did I imply otherwise? Of course it's a lizard. Hmm, but Onyx Dragons...");
		break;
	case 8:
		qm.dispose();
}
}