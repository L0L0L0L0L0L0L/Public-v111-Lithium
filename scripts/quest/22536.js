/*
	名字:	墮落城市探訪調查：內拉
	地圖:	墮落城市
	描述:	103000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 5) {
		qm.dispose();
		return;
		}
		if (status < 6) {
		qm.sendNext("What? You didn't understand what I was saying? Fine. I'll explain it again.Talk to me!");
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
		qm.sendSimple("Hmm? I don't recall seeing you around here before. What brings you to #m103000000#? Are you here to become a Thief? \r\n#L0##b(You ask her if she's noticed anyone who smells like herbs.)#l");
		break;
	case 1:
		qm.sendSimple("Smells like herbs? I don't know... I thought everyone uses potions these days! Why are you asking about herbs? Are you looking to buy some? \r\n#L0##b(You explain what happened to #p1061005#.)#l");
		break;
	case 2:
		qm.sendSimple("Hmm... An herb thief? I see. What? Wait, wait, wait a minute! Are you suggesting that the thief is from #m103000000#? \r\n#L0##bWell, #m103000000# is a Thief town, after all...#l");
		break;
	case 3:
		qm.sendSimple("We're not burglars! This is a Thief town, not a burglar town! Argh! It drives me crazy when... Geez! The things you're implying about us Thieves in #m103000000#! It's true that we can be a bit sneaky and petty, a little under-handed and cunning, yes. But we don't threaten other people's livelihood to get what we want! \r\n#L0##bReally?!#l");
		break;
	case 4:
		qm.sendSimple("Really! I know people get the wrong idea about us, but this...! Man, as someone born and raised in #m103000000#, I am deeply offended! I swear on my mother that the burglar that you're looking for is not from #m103000000#! \r\n#L0##bOh? Well, where is the burglar from then?#l");
		break;
	case 5:
		qm.sendAcceptDecline("How should I know?! You can't just assume that the burglar is from #m103000000#! That's completely unfair. You know what? I will hunt down the dirty rotten burglar myself! I'm going to grab that Sabitrama's Herb burglar with my own two hands and reclaim the honor of #m103000000#. I swear it! \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 4000 exp");
		break;
	case 6:
		qm.gainExp(870);
		Packages.server.quest.MapleQuest.getInstance(22536).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(22536));
		qm.sendOk("Fine! #bI'll investigate the burglar you're looking for, so stay right here#k.. I'll contact you when I get to the bottom of this. Argh!");
		break;
	case 7:
		qm.dispose();
}
}