/*
	名字:	對於秘密團體的疑惑
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
		if (status > 3) {
		qm.sendNext("Well, if you say so, master, I suppose you're right but it still bothers me. Please give it some more thought, master.");
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
		qm.sendNext("Look, master. Don't you think the mission you just completed for the Black Wings is a little strange? Things just don't add up. I thought dropping off the Free Spirit you got from #t4000594# was supposed to be a good thing...");
		break;
	case 1:
		qm.sendNextPrevS("#bDoesn't it seem unnecessary for them to have wrapped it in a pouch like that? And what about the fact that you could only unwrap the pouch in front of the #m922030010#? If the intention was to free it, why does it matter where you let it go?", 2);
		break;
	case 2:
		qm.sendNextPrev("And then, did you hear the Guards screaming when you unwrapped the pouch? Remember how mad they were that we were getting in their way? Do you think the Guards were bad guys?");
		break;
	case 3:
		qm.sendNextPrev("And what about what #o9300390# said to us as it was disappearing... I don't know, it just bothers me. He called us thieves. I don't know, killing evil monsters should make me feel better, but I feel terrible!");
		break;
	case 4:
		qm.sendAcceptDecline("That #p1013203# or whatever his name is told us not to worry, but something tells me that this last mission wasn't for such a good cause. Don't you agree, master? \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 20000 exp \r\n#fUI/UIWindow.img/QuestIcon/10/0# 1 sp");
		break;
	case 5:
		qm.gainExp(20000);
		qm.getPlayer().gainSP(1, 5);
		Packages.server.quest.MapleQuest.getInstance(22585).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(22585));
		qm.sendOk("So, the Black Wings... I don't want to be suspicious of them but I can't help it...");
		break;
	case 6:
		qm.dispose();
}
}