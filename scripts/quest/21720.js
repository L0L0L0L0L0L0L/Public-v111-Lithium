/*
	名字:	傀儡師的警告
	地圖:	特魯的情報商店
	描述:	104000004
*/

var status = -1;

function end(mode, type, selection) {
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21720)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(21720).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNextS("What can I do for you? Tru sent me a message saying that you've been training diligently in Victoria Island while helping him with his work. What is it? What? The Black Wings?", 8);
			break;
	case 1:
		qm.sendNextPrevS("#b(You tell her about the Puppeteer and the Black Wings, and about their mission.)", 2);
		break;
	case 2:
		qm.sendNextPrevS("I see... I didn't know there was a group called the Black Wings... They must be fools if they're trying to revive the Black Mage, knowing how dangerous he is.", 8);
		break;
	case 3:
		qm.sendNextPrevS("That...that's true...\r\r#b(She's definitely not afraid to speak her mind.)", 2);
		break;
	case 4:
		qm.sendNextPrevS("The Book of Prophecy states that the hero will revive and fight against the Black Mage. I wasn't sure if that was true, but this confirms that the Black Mage is still around.", 8);
		break;
	case 5:
		qm.sendNextPrevS("Aren't you scared?", 2);
		break;
	case 6:
		qm.sendYesNo("Am I scared? Not at all! What is there to worry about? If the Black Mage appears, you will protect me! In fact, I'm excited about the fight! Don't you feel the same way, Aran?");
		break;
	case 7:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21720)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(21720).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainExp(720);
			}
			qm.sendNextS("You are steadily becoming more powerful, and I'll be here to keep motivating you. You have nothing to be afraid of. You will not lose the battle. You didn't emerge from ice only to lose to the Black Mage, did you? This time, you'll finish him, once and for all!", 8);
			break;
	case 8:
		qm.sendPrevS("To do so, there's only one thing you can do. Train, train, train. Head to Victoria Island and continue training. Let's make sure you become so powerful that the Black Mage doesn't stand a chance!", 8);
		break;
	case 9:
		qm.dispose();
}
}