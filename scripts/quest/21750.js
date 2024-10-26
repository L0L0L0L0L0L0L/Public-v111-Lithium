/*
	名字:	記得的人
	地圖:	亞泰爾營地
	描述:	300000000
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 4) {
		qm.sendNext("No? I don't quite understand. Could you explain it again?");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21750)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(21750).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNextS("Aran...? Are my eyes deceiving me? Is it really you, Aran? You're alive? Oh, thank goodness! Thank you, Aran. Thank you!", 8);
			break;
	case 1:
		qm.sendNextPrevS("I'm very sorry, but I don't remember you.", 2);
		break;
	case 2:
		qm.sendNextPrevS("What...? What do you mean? Aran. It's you, isn't it? You're Aran. You're the hero that saved us. Aran, don't you remember?", 8);
		break;
	case 3:
		qm.sendNextPrevS("#b(You explain the situation as well as you can.)", 2);
		break;
	case 4:
		qm.sendYesNo("I see... I didn't realize you lost your memory. I can't believe you woke up hundreds of years later. This must be the past for you then.");
		break;
	case 5:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21750)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(21750).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainExp(500);
			}
			qm.sendNext("Let me reintroduce myself then. My name is #p2131000#, #p2131000# is #ba good friand of Aran#k. A few months ago, I fled and you left to battle the Black Mage on your own.");
			break;
	case 6:
		qm.sendNextPrev("While you were fighting against the Black Mage, the rest of us were able to board an ark and escape to Victoria Island, although we ended up in this forest instead of the south plains due to a dragon attack.");
		break;
	case 7:
		qm.sendNextPrev("But we couldn't just sit and do nothing, so we decided to settle and start new lives here. We've been slowly establishing a town in hopes of starting anew.");
		break;
	case 8:
		qm.sendNextPrev("Because we're trying to establish a town here in Victoria Island, where we know no one, all of our young men are out pulling their weight. Here, there are only women, children, and the injured.");
		break;
	case 9:
		qm.sendPrev("But, Aran, how did you get here anyway?");
		break;
	case 10:
		qm.dispose();
}
}