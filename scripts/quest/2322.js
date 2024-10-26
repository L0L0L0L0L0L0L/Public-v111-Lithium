/*
	名字:	跨越城牆（２）
	地圖:	菇菇森林路口
	描述:	106020000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendOk("Oh, really? You think you have a better idea?! Come talk to me when you get stuck outside the Castle Walls.");
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
		qm.sendYesNo("Like I told you, we can't be relieved just because the barrier has been broken. The castle of the Mushking Empire is impenetrable from the outside, so it won't be easy for you to enter. First, would you mind investigating the outer walls of the castle?");
		break;
	case 1:
		qm.sendNext("Head over to the to the castle from the #bSplit Road of Destiny#k, past the Mushroom Forest. Good luck.");
		break;
	case 2:
		qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2322)).setStatus(1);
		qm.getPlayer().updateQuest(qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2322)), true);
		qm.dispose();
}
}