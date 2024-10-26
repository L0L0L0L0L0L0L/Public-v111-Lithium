/*
	名字:	捉拿小偷！
	地圖:	瑞恩村
	描述:	140000000
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("That's a lie. I know you avoid eye contact when you lie! Old habits die hard!");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21301)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(21301).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendYesNo("Did you slay the #o9001013#? Yippy! You're my master, indeed! Now, give me the Red Jade you found! I'll reattach it and... Wait, why aren't you saying anything? Don't tell me you didn't bring it back.");
			break;
	case 1:
		qm.sendNextS("What? You didn't bring the Red Jade?! Why not? Did you forget?! Yikes, I never thought the Black Mage's curse would turn you into a dummy...", 8);
		break;
	case 2:
		qm.sendNextPrevS("No. I can't let this drive me to despair. Now more than ever, I must stay optimistic and alert. Argh...", 8);
		break;
	case 3:
		qm.sendNextPrevS("You can go back if you want, but I'm sure the thief has already fled the scene. You'll just have to make a new Red Jade. You've made one before, so you remember the required materials, don't you? So hurry it up.", 8);
		break;
	case 4:
		qm.sendNextPrev("#v4001173#");
		break;
	case 5:
		qm.sendNextPrevS("No hope, No dreams. Noooo!", 8);
		break;
	case 6:
		qm.sendNextPrevS("#b(#p1201002# is becoming volatile. You should leave the premise for now. You're sure #p1201000# could help you somehow.)", 2);
		break;
	case 7:
		Packages.server.quest.MapleQuest.getInstance(21301).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.dispose();
}
}