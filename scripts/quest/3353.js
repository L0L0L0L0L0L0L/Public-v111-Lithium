/*
	名字:	特力的願望
	地圖:	閒人勿入
	描述:	261020401
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 0) {
		qm.sendOk("What? No? If you don't want to, I won't force you... But you must know that I really worked hard to get this information. Like, I really went far and put in a LOT of effort... *Sniff sniff*");
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
		qm.sendNext("Aha! Hello, my explorer friend! It's been a long time since I last saw you. I really missed you! Why, you ask? Well... I got the answers to your questions! You know, the one about that alchemist with the dark personality!");
		break;
	case 1:
		qm.sendAcceptDecline("I dug up some very juicy clues on him. You seemed so interested, I didn't want to let you down! But now is the time to meet him, at last.");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(3353).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(926120200), qm.getMap(926120200).getPortal(0));
		qm.dispose();
}
}