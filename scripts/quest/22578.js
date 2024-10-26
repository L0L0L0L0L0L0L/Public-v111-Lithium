/*
	名字:	對於秘密團體的疑問
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
		if (status > 7) {
		qm.sendNext("Hmm... Master, you are quite a humble person.");
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
		qm.sendNext("Master! Master! Nicely done! Do you think your last mission was of great help to the people of Maple World?");
		break;
	case 1:
		qm.sendNextPrevS("#bWell, I defeated all the zombies in #m211000000#, so it must have been a good thing.", 2);
		break;
	case 2:
		qm.sendNextPrev("The more monsters you defeat, the better, I suppose? But what about that Black Key at the end? What do you think that was about?");
		break;
	case 3:
		qm.sendNextPrevS("#bI'm not sure. But this organization is all about doing good deeds, so it's got to be for a good purpose.", 2);
		break;
	case 4:
		qm.sendNextPrev("I suppose... But why do you think this organization carries out its activities in secret? How is anyone supposed to know of their good deeds if no one even knows they exist?");
		break;
	case 5:
		qm.sendNextPrevS("#bWell, like the saying goes, let not your left hand know what your right hand is doing!", 2);
		break;
	case 6:
		qm.sendNextPrev("Left hand? Right hand? What?! Are you saying you should let your left hand be a loser that doesn't know anything?");
		break;
	case 7:
		qm.sendNextPrevS("#bHaha, no! I think it just means you should keep your good deeds to yourself since it's not virtuous to brag about your good deeds.", 2);
		break;
	case 8:
		qm.sendAcceptDecline("I don't get it. I love to let people know what I'm up to. Anyway, it just seems so secretive and calculated. It's exciting, yet I don't understand it. Don't you agree, master? \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 10000 exp \r\n#fUI/UIWindow.img/QuestIcon/10/0# 2 sp");
		break;
	case 9:
		qm.gainExp(10000);
		qm.getPlayer().gainSP(2, 4);
		Packages.server.quest.MapleQuest.getInstance(22578).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(22578));
		qm.sendOkS("#bBut I'm sure there's a reason for it. It's for a good cause, so... I'll ask about it next time. Yeah, I'll just ask what the organization is really about when I'm given my next mission.", 2);
		break;
	case 10:
		qm.dispose();
}
}