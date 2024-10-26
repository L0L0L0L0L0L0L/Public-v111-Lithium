/*
	名字:	英勇搭救
	地圖:	被破坏的新叶城
	描述:	600000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
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
		qm.sendYesNo("Now that I've thought about it, I bet those aliens were trying to catch anybody that saw them before they could tell the rest of us! We have to get them out and spread the word!");
		break;
	case 1:
		qm.sendNext("It's your time to shine! Go rescue all those good folks. I'm not sure how you're going to get them out, but you have to try!");
		break;
	case 2:
		qm.sendNextPrev("You said you saw them near the base. I heard some folks talking about rectangular containers in the fields. I bet those are actually jail cells! Go click on them and see if you can break them out!");
		break;
	case 3:
		qm.sendNextPrev("I'm going to give you some Return to New Leaf City scrolls, but remember they're for the people you Rescue ONLY!");
		break;
	case 4:
		qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28749)).setStatus(1);
		qm.getPlayer().updateQuest(qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28749)), true);
		qm.dispose();
}
}

function end(mode, type, selection) {
	switch (mode) {
	case 0:
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		qm.sendOk("What are you waiting for? I'll never get voted into office again if I let everybody get enslaved by aliens!");
		break;
	case 1:
		qm.dispose();
}
}