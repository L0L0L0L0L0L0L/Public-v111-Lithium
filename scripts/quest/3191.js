

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 4) {
		qm.sendNext("Patience is a virtue, my friend...");
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
		qm.sendNext("I think #bLich#k is behind this. The forbidden magic is similar, too...");
		break;
	case 1:
		qm.sendNextPrevS("Then we should go defeat them quickly. We don't know when the zombies will attack the town again...", 2);
		break;
	case 2:
		qm.sendNextPrev("Wait. Lich is not an easy monster to defeat. You must cut off its magic source to defeat it. But no one has found the source...even I couldn't find it. Unless we stop the source, Lich will revive again no matter how many time we do this.");
		break;
	case 3:
		qm.sendNextPrevS("Then what should we do?", 2);
		break;
	case 4:
		qm.sendAcceptDecline("We can't stop Lich from reviving, but we can stop it from using forbidden magic. We can put a barrier around the Forest of Dead Trees so that Lich cannot create more zombies. Want to give it a try?");
		break;
	case 5:
		Packages.server.quest.MapleQuest.getInstance(3191).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendNext("I think #bLich#k is behind this. The forbidden magic is similar, too...");
		break;
	case 6:
		qm.sendPrev("To set up the barrier, we need to make a #bBarrier Totem#k. I can use my magic to make one, but I need Lich's #bRed Contract Orb#k and #bBible of the Corrupt#k. Can you get them?");
		break;
	case 7:
		qm.dispose();
}
}