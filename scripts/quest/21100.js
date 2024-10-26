/*
	名字:	5位英雄
	地圖:	瑞恩村
	描述:	140000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 5) {
		qm.sendNext("What's stopping you? I promise, I won't be disappointed even if the #p1201001# shows no reaction to you. Please, rush over there and grab the #p1201001#. Just #bclick#k on it.");
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
		qm.sendNextS("There isn't much record left of the heores that fought against the Black Mage. Even in the Book of Prophecy, the only information available is that there were five of them. There is nothing about who they were or what they looked like. Is there anything you remember? Anything at all?", 8);
		break;
	case 1:
		qm.sendNextPrevS("I don't remember a thing...", 2);
		break;
	case 2:
		qm.sendNextPrevS("As I expected. Of course, the curse of the Black Mage was strong enough to wipe out all of your memory. But even if that's the case, there has got to be a point where the past will uncover, especially now that we are certain you are one of the heroes. I know you've lost your armor and weapon during the battle but... Oh, yes, yes. I almost forgot! Your #bweapon#k!", 8);
		break;
	case 3:
		qm.sendNextPrevS("My weapon?", 2);
		break;
	case 4:
		qm.sendNextPrevS("I found an incredible weapon while digging through blocks of ice a while back. I figured the weapon belonged to a hero, so I brought it to town and placed it somewhere in the center of the town. Haven't you seen it? #bThe #p1201001##k... \r\r#v4032372#\r\rIt looks like this...", 8);
		break;
	case 5:
		qm.sendNextPrevS("Come to think of it, I did see a #p1201001# in town.", 2);
		break;
	case 6:
		qm.sendAcceptDecline("Yes, that's it. According to what's been recorded, the weapon of a hero will recognize its rightful owner, and if you're the hero that used the #p1201001#, the #p1201001# will react when you grab the #p1201001#. Please go find the #b#p1201001# and click on it.");
		break;
	case 7:
		Packages.server.quest.MapleQuest.getInstance(21100).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.sendOkS("If the #p1201001# reacts to you, then we'll know that you're #bAran#k, the hero that wielded a #p1201001#.", 8);
		break;
	case 8:
		qm.dispose();
}
}