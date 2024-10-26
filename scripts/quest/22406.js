/*
	名字:	不合身的馬鞍
	地圖:	動物園
	描述:	230000003
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 10) {
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
		qm.sendNext("Master... Ughhh...");
		break;
	case 1:
		qm.sendNextPrevS("#bWhat is it? Are you ill?", 2);
		break;
	case 2:
		qm.sendNextPrev("I... I... can't... breathe...");
		break;
	case 3:
		qm.sendNextPrevS("#bYou can't breathe? Why? What's wrong?! Are you hurt?!", 2);
		break;
	case 4:
		qm.sendNextPrev("No, no, that's not it... Ughhhhh...");
		break;
	case 5:
		qm.sendNextPrevS("#bSo, what is it then? Tell me!", 2);
		break;
	case 6:
		qm.sendNextPrev("The saddle's too tight!");
		break;
	case 7:
		qm.sendNextPrevS("#bHuh...?", 2);
		break;
	case 8:
		qm.sendNextPrev("Ungh... I can't even move my wings! This saddle is much too small! It doesn't fit me! I don't think I could have you ride on me like this!");
		break;
	case 9:
		qm.sendNextPrevS("#bOh, no... What should we do?", 2);
		break;
	case 10:
		qm.sendAcceptDecline("I need a new saddle, master! You need to go back to #p2060005# and ask him to make another one.");
		break;
	case 11:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22406)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(22406).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(22406));
			}
			qm.sendNextS("#b(#p1013000#'s saddle looks much too small on him. You'd better go back to #p2060005# in the #m230000000# and ask for a new one. Hold off on Dragon riding for the time being.)", 2);
			break;
	case 12:
		qm.sendNextPrev("Oh no, master... Does this mean you're going to have to spend another ton of mesos to get a new saddle?");
		break;
	case 13:
		qm.sendPrevS("#b...Whew...", 2);
		break;
	case 14:
		qm.dispose();
}
}