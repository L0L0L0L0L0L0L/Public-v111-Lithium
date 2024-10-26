/*
	名字:	丹妮卡的呼喚
	地圖:	櫻花處
	描述:	101050000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 4) {
		qm.sendNext("Y-you don't want me here?");
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
		qm.sendNext("Your Majesty! I missed you so... I've been trying to act normal, but I was afraid I'd never see you again...");
		break;
	case 1:
		qm.sendNextPrevS("#p1033101#! Are you okay?", 2);
		break;
	case 2:
		qm.sendNextPrev("Don't worry about me! I'm fine, compared to the others! I lost my skills, but I'm not hurt.");
		break;
	case 3:
		qm.sendNextPrevS("Thank goodness!", 2);
		break;
	case 4:
		qm.sendAcceptDecline("How did you survive here on your own. Your Majesty? It must have been lonely! Don't worry. I'll be here to keep you company from now on! \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 1000 exp");
		break;
	case 5:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24063)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(24063).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(24063));
			qm.gainExp(1000);
			}
			qm.sendNext("I wish I could go with you, but I'm still too weak from the curse. I'd only get in your way, Your Majesty. #p1033100# would eliminate me if I tripped you up...");
			break;
	case 6:
		qm.sendPrev("I'll be here, training, for now. Your Majesty, please promise you'll #btrain really hard and free our people from the ice#k! Okay?");
		break;
	case 7:
		qm.dispose();
}
}