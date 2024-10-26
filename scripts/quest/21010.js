/*
	名字:	英雄的歸來
	地圖:	寒冷的森林１
	描述:	140090100
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 3) {
		qm.sendNext("Oh, no need to decline my offer. It's no big deal. It's just a potion. Well, let me know if you change your mind.");
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
		qm.sendNext("Hm, what's a human doing on this island? Wait, it's #p1201000#. What are you doing here, #p1201000#? And who's that beside you? Is it someone you know, #p1201000#? What? The hero, you say?");
		break;
	case 1:
		qm.sendNextPrev("#v4001170#");
		break;
	case 2:
		qm.sendNextPrev("Ah, this must be the hero you and your clan have been waiting for. Am I right, #p1201000#? Ah, I knew you weren't just accompanying an average passerby...");
		break;
	case 3:
		qm.sendAcceptDecline("Oh, but it seems our hero has become very weak since the Black Mage's curse. It's only makes sense, considering that the hero has been asleep for hundreds of years. #bHere, I'll give you a HP Recovery Potion.");
		break;
	case 4:
		qm.getPlayer().addHP(qm.getPlayerStat("HP") > 40 ? -25 : 0);
		qm.gainItem(2000022, qm.getPlayer().itemQuantity(2000022) ? 0 : 1);
		qm.sendNextS("Drink it first. Then we'll talk.", 9);
		break;
	case 5:
		qm.sendNextPrevS("#b(How do I drink the potion? I don't remember..)", 3);
		break;
	case 6:
		if (!qm.getPlayer().hasSummon())
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonHelper(true));
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonMessage(14));
		Packages.server.quest.MapleQuest.getInstance(21010).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}

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
		qm.sendNext("We've been digging and digging inside the Ice Cave in the hope of finding a hero, but I never thought I'd actually see the day... The prophecy was true! You were right, #p1201000#! Now that one of the legendary heroes has returned, we have no reason to fear the Black Mage!");
		break;
	case 1:
		qm.sendNextPrev("Oh, I've kept you too long. I'm sorry, I got a little carried away. I'm sure the other Penguins feel the same way. I know you're busy, but could you #bstop and talk to the other Penguins#k on your way to town? They would be so honored. \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v2000022# 5 #t2000022# \r\n#v2000023# 5 #t2000023# \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 16 exp");
		break;
	case 2:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21010)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(21010).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(2000022, 5);
			qm.gainItem(2000023, 5);
			qm.gainExp(16);
			}
			qm.sendNextPrevS("Oh, you've leveled up! You may have even received some skill points. In Maple World, you can acquire 3 skill points every time you level up. Press the #bK key #kto view the Skill window.", 9);
			break;
	case 3:
		qm.sendNextPrevS("#b(Everyone's been so nice to me, but I just can't remember anything. Am I really a hero? I should check my skills and see. But how do I check them?)", 3);
		break;
	case 4:
		if (!qm.getPlayer().hasSummon())
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonHelper(true));
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonMessage(15));
		qm.dispose();
}
}