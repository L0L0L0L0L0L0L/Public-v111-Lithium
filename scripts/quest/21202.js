/*
	名字:	尋找最強的武器
	地圖:	大將翁的鐵舖
	描述:	914021000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 3) {
		qm.sendNext("Haha, that's a wise decision. How good of a weapon could an old man like me make?");
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
		qm.sendNextS("Hmm.. What's a young person like you doing in this secluded place?", 8);
		break;
	case 1:
		qm.sendNextPrevS("I've come to get the best Polearm there is!", 2);
		break;
	case 2:
		qm.sendNextPrevS("The best Polearm? You should be able to purchase it in some town or other...", 8);
		break;
	case 3:
		qm.sendNextPrevS("I hear that you are the best blacksmith in all of Maple World! I want nothing less than a weapon made by you!", 2);
		break;
	case 4:
		qm.sendAcceptDecline("I'm too old to make weapons now, but...I do have a Polearm that I made way back when. It's still in in excellent shape. But I can't give it to you because that Polearm is extremely sharp, so sharp it could even hurt its master. Do you still want it?");
		break;
	case 5:
		Packages.server.quest.MapleQuest.getInstance(21202).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendOk("Well, if you say so... I can't object to that. I'll tell you what. I'll give you a quick test, and if you pass it, the #p1201001# is yours. Head over to the #bTraining Center#k and take on the #r#o9001012#s#k that are there. Your job is to bring back #b30 Sign of Acceptances#k.");
		break;
	case 6:
		qm.dispose();
}
}

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 1) {
		qm.sendNext("Hm? Are you hesitant to take it now after all that? Well, give it more thought if you'd like. It'll be yours in the end anyway.");
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
		qm.sendNext("Oh, have you brought me the #t4032311#? You're stronger than I thought! But more importantly, I am impressed with the amount of courage you displayed when you agreed to take this dangerous weapon without any hesitation. You deserve it. The #p1201001# is yours.");
		break;
	case 1:
		qm.sendNextPrev("#b(After a long time passed, #p1203000# handed you the #p1201001#, which was carefully wrapped in cloth.)");
		break;
	case 2:
		qm.sendYesNo("Here, this is #p1201002#, the Polearm you've asked for. Please take good care of it.");
		break;
	case 3:
		qm.dispose();
		qm.removeAll(4032311);
		Packages.server.quest.MapleQuest.getInstance(21202).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().changeMap(qm.getMap(914090201), qm.getMap(914090201).getPortal(0));
}
}