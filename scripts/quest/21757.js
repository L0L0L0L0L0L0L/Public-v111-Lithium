/*
	名字:	女皇的策士那因哈特
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
		qm.sendNext("What, are you not going to show it to me? Then you can't give it to the Empress.");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21757)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(21757).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendYesNo("How can I help you? If you're not here to become a knight, you're not welcome here. And what is that you have there? Is that for the Empress? I can't let you deliver that. It might be something dangerous even #p1061019# isn't aware of. I'll have to take a look at it.");
			break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21757)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(21757).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(4032330, -1);
			qm.gainExp(1000);
			}
			qm.sendNextS("Hmmm, this contains some very interesting tidbits. It even has some stuff about the Teardrop of Shinsoo... Well, anyway, I'll look it over more carefully.", 8);
			break;
	case 2:
		qm.sendNextPrevS("The Black Wings might be targeting this place next.", 2);
		break;
	case 3:
		qm.sendPrevS("Even if that's the case, it is a matter that will be handled in #m130000000#. It's really none of your business. There is no guarantee that you are not one of the Black Wings. Thanks for the information, but I'm going to have to ask you to leave.", 8);
		break;
	case 4:
		qm.dispose();
}
}