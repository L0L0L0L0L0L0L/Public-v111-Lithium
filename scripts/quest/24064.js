/*
	名字:	亞斯提那的呼喚
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
		if (status > 5) {
		qm.sendNext("You have grown so much!");
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
		qm.sendNext("Your Majesty...");
		break;
	case 1:
		qm.sendNextPrevS("#p1033102#! Are you all right?", 2);
		break;
	case 2:
		qm.sendNextPrev("I'm fine. Just a little fatigued.");
		break;
	case 3:
		qm.sendNextPrevS("That's a relief. #p1033100# and #p1033101# were all right, but I was particularly worried about you, #p1033102#.", 2);
		break;
	case 4:
		qm.sendNextPrev("You've been through worse than I, Your Highness!");
		break;
	case 5:
		qm.sendNextPrevS("No, I haven't suffered anything compared to what you went through...", 2);
		break;
	case 6:
		qm.sendAcceptDecline("You've grown so much. Your Highness. I remember when you were little, and when you went off to fight the Black Mage... You are truly worthy to lead the Elves. \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 1000 exp");
		break;
	case 7:
		qm.gainExp(1000);
		Packages.server.quest.MapleQuest.getInstance(24064).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(24064));
		qm.sendOk("We three elders have awakened, but the rest of the Elves are still cursed. But since we have our ruler, we aren't afraid of anything!");
		break;
	case 8:
		qm.dispose();
}
}