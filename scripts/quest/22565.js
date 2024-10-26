/*
	名字:	永不放棄
	地圖:	寶貝龍
	描述:	寶貝龍
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 1) {
		qm.sendNext("Oh, I see. I'm so disappointed... Must I do this alone? Huh? What? Oh, your hand slipped? I knew you'd help! I love you, master!");
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
		qm.sendNext("Master, do you think I'm the only survivor of my race? Are the others really all gone? Why were they killed? And why was I spared? I just can't figure it out, and it makes me so sad...");
		break;
	case 1:
		qm.sendNextPrevS("#p1013000#...", 2);
		break;
	case 2:
		qm.sendAcceptDecline("But I refuse to give up. I beat the odds, so there must be others. I will find them! Master, you'll help, wont you? \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 3000 exp \r\n#fUI/UIWindow.img/QuestIcon/10/0# 2 sp");
		break;
	case 3:
		qm.gainExp(3000);
		qm.getPlayer().gainSP(2, 3);
		Packages.server.quest.MapleQuest.getInstance(22565).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(22565));
		qm.sendOk("All right, then. We'll give that #p1032001# or whatever his name is, time to find out more. In the meanwhile, we'll get stronger. Let's become heroes! Let's go help people!");
		break;
	case 4:
		qm.dispose();
}
}