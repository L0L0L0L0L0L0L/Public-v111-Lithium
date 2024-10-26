/*
	名字:	公主的真相
	地圖:	結婚禮堂
	描述:	106021600
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
		qm.sendNextS("Thank you so much, #b#h0##k. You are the hero that has saved our empire from danger. I'm so grateful for what you've done, I don't know how to thank you. And please understand why I can't show you my face.", 1);
		break;
	case 1:
		qm.sendNextPrevS("It's humiliating to say this, but ever since I was a baby, my family has kept my face veiled from the world. They feared of men falling hopelessly in love with me. I've grown so accustomed to it that I even shy away from women. I know, it's rude of me to have my back turned against the hero, but I'll need some time to muster my courage before I can greet you face to face.", 3);
		break;
	case 2:
		qm.sendNextPrevS("I see... \r\n#b(Wow, how pretty could she be?)", 3);
		break;
	case 3:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2334)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(2334).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(2334));
			qm.showNpcSpecialEffect(1300002, "face");
			qm.gainExp(1000);
			}
			qm.sendNextPrevS("#b(What the--)", 3);
			break;
	case 4:
		qm.sendNextPrevS("#b(Is that what's considered pretty in the world of mushrooms?!)", 3);
		break;
	case 5:
		qm.sendNextPrevS("I'm so shy, I'm blushing. Anyways, thank you, #b#h0##k.", 1);
		break;
	case 6:
		qm.dispose();
}
}