/*
	名字:	憤怒的對象在哪裡
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
		qm.sendNext("Huh? Master, you're not changing your mind are you? Stay strong!");
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
		qm.sendNext("The Black Wings who betrayed me and Master... They're in #m310000000#! Their base is supposed to be near the mines. Maybe we'll be able to find Hiver!");
		break;
	case 1:
		qm.sendNextPrevS("Maybe. But we can't attack random people just because they're a part of the Black Wings. After all, we were tricked by them at one point, too... The only person I want vengeance on is Hiver.", 2);
		break;
	case 2:
		qm.sendAcceptDecline("Okay, go undercover and hang out around #m310000000# until Hiver appears. Then, we'll get our revenge!");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(23909).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(23909));
		qm.gainExp(3000);
		qm.dispose();
}
}