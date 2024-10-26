/*
	名字:	抓住影子武士！
	地圖:	武陵道場後路
	描述:	925040000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("I apologize for not recognizing you sooner. Never in my wildest dreams did I think I'd get to see that skill performed before my very eyes. Please, forgive me.");
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
		qm.sendAcceptDecline("Who would have thought that the hero's successor would reappear after hundreds of years...? Will you bring prosperity to Maple World or will you end its existence? I suppose it really doesn't matter. Alright, I'll tell you what I know about the Seal Stone of Mu Lung.");
		break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(21747).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendNextS("The Seal Stone of Mu Lung is located at the Sealed Temple. You will find the entrance deep inside the Mu Lung Temple. You can enter the Sealed Temple if you find the pillar with the word 'Entrance" written on it. The password is: #bActions speak louder than words.", 1);
		break;
	case 2:
		qm.sendNextPrevS("Maybe that Shadow Knight is already at the Sealed Temple. But someone who poses this kind of challenge probably isn't there just for the item. He's there to see me, but I think it would be best for the hero's successor to face the Shadow Knight.", 1);
		break;
	case 3:
		qm.sendNextPrevS("Please do everything you can to stop the Shadow Knight from bringing doom to our temple. Please continue the legacy of your predecessors.", 1);
		break;
	case 4:
		qm.sendPrevS("(He has mistaken you for a hero's successor. But what does he mean when he mentions continuing the legacy of the heroes? You'll have to stop the Shadow Knight first before asking him.)", 3);
		break;
	case 5:
		qm.dispose();
}
}

function end(mode, type, selection) {
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
		qm.sendYesNo("Were you able to defeat #o9300351#? But you don't look too happy. I'm guessing it's not because you lost the battle...");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21747)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(21747).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainExp(7300);
			}
			qm.sendNextS("I see. So you lost the Seal Stone of #m250000000#... That's unfortunate, but there is nothing you can do about it. l, too, do not have a clue why the heroes left the Seal Stone in #m250000000#.", 9);
			break;
	case 2:
		qm.sendNextPrevS("Are you sure the heroes left the Seal Stone in #m250000000#?", 3);
		break;
	case 3:
		qm.sendNextPrevS("Yes, I suppose you weren't aware of that. #bA long, long time ago, the heroes left the Seal Stone in #m250000000#, and the chief made #m925040100# to keep it safe.", 9);
		break;
	case 4:
		qm.sendNextPrevS("The heroes...", 3);
		break;
	case 5:
		qm.sendNextPrevS("Hardly anyone knows the existence of something like that nowadays. Honestly, #bI'm not even sure that losing the Seal Stone will have any negative effects on #m250000000##k. We just valued it since it was something the heroes left us for safekeeping.", 9);
		break;
	case 6:
		qm.sendNextPrevS("#b(So the heroes left the Seal Stone in #m250000000#, hmm...?)", 3);
		break;
	case 7:
		qm.sendNextPrevS("It's unfortunate that we lost something the heroes left us, but it's comforting to know that the hero's successor is here. Please complete what the heroes couldn't.", 9);
		break;
	case 8:
		qm.sendPrevS("#b(#m250000000# has been lost... You better consult with #p1002104#.)", 3);
		break;
	case 9:
		qm.dispose();
}
}