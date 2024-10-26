/*
	名字:	生命煉成與失蹤的煉金術師
	地圖:	研究所中央通道
	描述:	261020000
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 3) {
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3314)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(3314).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
		if (!qm.getPlayer().hasDisease(Packages.client.MapleDisease.getBySkill(125))) {
			qm.sendNext("You didn't take the pill yet. You can't trust Russellon? I thought I've been trying to be an example as a senior at Alcadno.");
			qm.dispose();
			return;
			}
			qm.sendSimple("Hahaha.... You're looking pale. That means it's working. This experiment is a major success! Muahaha! I knew this would work on someone that's strong enough to destroy Roids! \r\n#L0##b(l knew this was a human experimentation!)#l");
			break;
	case 1:
		qm.sendSimple("You seem very surprised. Don't be! It's not a dangerous pill...except for the side effect of death...luckily, there's an antidote for this... \r\n#L0##b(This is NOT what I need!)#l");
		break;
	case 2:
		qm.sendSimple("So this proves that it's possible to temporarily change the human body state. This will make it much easier to work on Life Alchemy. This... will finally make his wish come true... \r\n#L0##bWho's he?#l");
		break;
	case 3:
		qm.sendNext("Yeah... that guy. He was the best there was at Life Alchemy. If we had him here, we'd already be done with our research. But... he's gone missing. \r\n\r\n#fUI/UIWindow.img/QuestIcon/5/0# \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 37420 exp \r\n\r\n#fUI/UIWindow2.img/QuestIcon/11/0# Insight 40");
		break;
	case 4:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3314)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 2) {
			qm.sendOk("Isn't your use inventory full? Please check.");
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(3314).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.addPartyTrait("insight", 40);//洞察力
			qm.gainItem(2050004, 10);
			qm.gainExp(37420);
			}
			qm.sendNextPrev("No one knows how or why he went missing. He had been getting antsy in days before he went missing, and started secretly conducting experiments that no one knew existed... no matter how much we asked, he never divulged any information on it. He was conducting experiments like a mad man... research, research, more research. That's all he did, in the name of Life Alchemy... then, that's when #bthat#k happened...");
			break;
	case 5:
		qm.sendNextPrev("Even in the town of alchemiests like Magatia, no one ever witnessed an explosion that big... I can't even begin to fathom what kind of experiments he conducted. What kind of a monster was he cooking up...? The head of the alchemist society had already searched his house, so he should know what happened... yet he's never revealed anything...");
		break;
	case 6:
		qm.sendNextPrev("Even this experiment started off as joint research between him and myself. But he's missing now, and it was impossible to go further with the experiment. I knew what to do with potions and pills, but that was still tough. I'm continuing this on his behalf, but... I don't understand why he thought of conducting a study on altering the state of the body...");
		break;
	case 7:
		qm.sendPrev("I am sure he's alive. There's a reason why he should be...");
		break;
	case 8:
		qm.dispose();
}
}