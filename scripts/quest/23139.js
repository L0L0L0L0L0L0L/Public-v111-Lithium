/*
	名字:	取得解毒草
	地圖:	秘密廣場
	描述:	310010000
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23139)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(23139).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23139)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(23139).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(4033093, -1);
			qm.gainExp(3200);
			}
			qm.sendNext("Do you have the Feather Plants? Let me see.");
			break;
	case 1:
		qm.sendNextPrev("...This is only enough for half the antidote we need. But if #p1061005# says this is all he has, I don't know what more we can do...");
		break;
	case 2:
		qm.sendNextPrevS("#p1061005# says they sell Feather Plants in #m130000000#... I'll try there.", 2);
		break;
	case 3:
		qm.sendNextPrev("#m130000000#? Are you suggesting we beg the #p1101000# Knights for help? No! Absolutely not! Any self-respecting member of the Resistance would rather stay poisoned then ask them for anything!");
		break;
	case 4:
		qm.sendNextPrev("Don't you know? In #m300000000#'s time of need, we asked the #p1101000# Knights for help, and they did nothing! We're suffering under the Black Wings because of them!");
		break;
	case 5:
		qm.sendPrev("Maybe I can pad the Feather Plants out with some other herbs... Thanks for your help.");
		break;
	case 6:
		qm.dispose();
}
}