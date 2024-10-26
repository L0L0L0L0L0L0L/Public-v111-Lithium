/*
	名字:	另一個封印石的情報
	地圖:	弓箭手培訓中心
	描述:	100000201
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 6) {
		qm.sendNextS("Shall we read the letter a little later? Fine with me.");
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
		qm.sendNextS("I thought I just heard something from #m300000011#... Was that you, Aran? Did you find the Seal Stone?", 8);
		break;
	case 1:
		qm.sendNextPrevS("#b(You tell her what happened in #m300000011#.)", 2);
		break;
	case 2:
		qm.sendNextPrevS("I... I never thought someone like that would appear in a place like this. I'm sorry Aran. I should have stored it in a safer place.", 8);
		break;
	case 3:
		qm.sendNextPrevS("It isn't your fault, #p2131000#.", 2);
		break;
	case 4:
		qm.sendNextPrevS("You're still the same after all these years. After giving some thought about the Seal stone, I may have found a clue that could help us.", 8);
		break;
	case 5:
		qm.sendNextPrevS("A clue?", 2);
		break;
	case 6:
		qm.sendAcceptDecline("Yes, I found a letter that you wrote me a long time ago, and I remember reading something about the Seal Stone. Would you like to see it?");
		break;
	case 7:
		Packages.server.quest.MapleQuest.getInstance(21753).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendNextS("Hm... ? The letter...", 9);
		break;
	case 8:
		qm.sendNextPrevS("#v4032327#\r\n#b(You could not take the letter. The letter slipped right through your fingers and landed gently on the ground.)", 3);
		break;
	case 9:
		qm.sendNextPrevS("I do not know the law of time, but I think the reason I can't give you this letter is because #bwe belong to different time periods#k. This really saddens me, especially since you used to be one of us until recently...", 9);
		break;
	case 10:
		qm.sendNextPrevS("I am sure you know this, but I am a fairy that can live a long time. Even if you have awaken hundreds of years later, I'll probably be around. So Aran, #bI'll hold on to this letter close to my heart until you come looking for it in your time.", 9);
		break;
	case 11:
		qm.sendNextPrevS("No matter how many years pass, I will never forget this promise nor will I ever forget you, Aran. Until we meet again...", 9);
		break;
	case 12:
		qm.sendPrevS("#b(You should probably return to #p1201000#'s time and find #p2131000#. If you ask #p1002104#, you're sure you'll be able to track down #p2131000#.)", 2);
		break;
	case 13:
		qm.dispose();
}
}