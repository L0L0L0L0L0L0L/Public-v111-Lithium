/*
	名字:	奇怪的夢
	地圖:	客廳
	描述:	100030101
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 6) {
		qm.sendNext("Hm? Don't you want to tell #p1013101#? You have to be nice to your brother, dear.");
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
		qm.sendNext("Did you sleep well, Evan?");
		break;
	case 1:
		qm.sendNextPrevS("#bYes, what about you, Mom?", 2);
		break;
	case 2:
		qm.sendNextPrev("I did as well, but you seem so tired. Are you sure you slept okay? Did the thunder and lightning last night keep you up?");
		break;
	case 3:
		qm.sendNextPrevS("#bOh, no. It's not that, Mom. I just had a strange dream last night.", 2);
		break;
	case 4:
		qm.sendNextPrev("A strange dream? What kind of strange dream?");
		break;
	case 5:
		qm.sendNextPrevS("#bWell...", 2);
		break;
	case 6:
		qm.sendNextPrevS("#b(You explain that you met a dragon in your dream.)", 2);
		break;
	case 7:
		qm.sendAcceptDecline("Hahaha, a dragon? That's incredible. I'm glad he didn't swallow you whole! You should tell #p1013101# about your dream. I'm sure he'll enjoy it.");
		break;
	case 8:
		Packages.server.quest.MapleQuest.getInstance(22000).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendNextS("#b#p1013101##k went to the #b#m100030102##k to feed the Bull Dog. You'll see him right outside.", 1);
		break;
	case 9:
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.getEvanTutorial("UI/tutorial/evan/1/0"));
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
		qm.sendNext("Hey, Evan. You up? What's with the dark circles under your eyes? Didn't sleep well? Huh? A strange dream? What was it about? Whoa? A dream about a dragon?");
		break;
	case 1:
		qm.sendNextPrev("Muahahahahaha, a dragon? Are you serious? I don't know how to interpret dreams, but that sounds like a good one! Did you see a dog in your dream, too? Hahaha! \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 20 exp");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(22000).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.getEvanTutorial("UI/tutorial/evan/2/0"));
		qm.gainExp(20);
		qm.dispose();
}
}