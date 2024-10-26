/*
	名字:	倘若擁有相同的敵人
	地圖:	公園一角
	描述:	931050710
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 11) {
		qm.sendNext("If you can't prove it, we have nothing more to talk about.");
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
		qm.sendNext("...I didn't expect to see you again. Who are you guys, anyway? I know you and your lizard aren't with the Black Wings.");
		break;
	case 1:
		qm.sendNextPrevS("That's no lizard! His name is #p1013000#, and he's an Onyx Dragon! We're here to fight the Black Wings.", 2);
		break;
	case 2:
		qm.sendNextPrev("Really? Did they take over your town, too?");
		break;
	case 3:
		qm.sendNextPrevS("Ahaha, no, not quite. I'm after that #p1013203# jerk! He tricked me! And did you know that he's trying to resurrect the Black Mage? That guy's bad for Onyx Dragons, too!", 2);
		break;
	case 4:
		qm.sendNextPrev("Hm... You do know that #p1013203# is one of the leaders of the Black Wings, right? Jeez, it's hard to keep track of all the plots they have going...");
		break;
	case 5:
		qm.sendNextPrevS("But what about you? Are you also an enemy of the Black Wings?", 2);
		break;
	case 6:
		qm.sendNextPrev("That's right. I'm Resistance. We won't rest until we free #m310000000# from the Black Wings!");
		break;
	case 7:
		qm.sendNextPrevS("Hey, that's a pretty good goal!", 2);
		break;
	case 8:
		qm.sendNextPrev("Yes, it is. Now, you have to promise not to tell anyone else about us. And next time we meet, pretend you don't know me...");
		break;
	case 9:
		qm.sendNextPrevS("What're you talking about? Since we both hate the Black Wings, we should team up! I bet we could beat them faster if we did!", 2);
		break;
	case 10:
		qm.sendNextPrev("And who are you, again? I'm not going to trust some stranger! What if you're really a Black Wings spy? Or what if you're some weakling? No, the Resistance works alone.");
		break;
	case 11:
		qm.sendNextPrev("Don't underestimate the power of Onyx Dragons! The Black Mage would've never been defeated without our help!", 1013000);
		break;
	case 12:
		qm.sendAcceptDecline("Your lizard's talking again. If you're so tough, why don't you prove it?");
		break;
	case 13:
		Packages.server.quest.MapleQuest.getInstance(22613).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendOk("There's a path behind the mine. If you follow it, you'll reach Gelimer's Lab. He's a vicious scientist working for the Black Wings. You beat up his servants and bring me 30 Black Wing Emblems, and THEN we can talk.");
		break;
	case 14:
		qm.dispose();
}
}