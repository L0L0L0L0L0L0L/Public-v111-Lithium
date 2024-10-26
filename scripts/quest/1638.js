/*
	名字:	[十字獵人]時間的神官阿卡伊農
	地圖:	補給品倉庫
	描述:	931050500
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1638)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1638).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("I think Arkarium's back! Someone saw him at the Temple of Time, though just for a moment...");
			break;
	case 1:
		qm.sendNextPrevS("Who's Arkarium?", 2);
		break;
	case 2:
		qm.sendNextPrevS("You don't know THE Arkarium? He was one of the Black Mage's Commanders. After the Black Mage was sealed, he disappeared.", 4, 9073011);
		break;
	case 3:
		qm.sendNextPrevS("If one of the Black Mage's right-hand guys is back, does that mean the Black Mage is back, too?", 2);
		break;
	case 4:
		qm.sendNextPrevS("I'm not sure. But something is amiss in Maple World, that much is certain. The return of Arkarium, the appearance of the Mystic Gates... Evil forces are in motion.", 4, 9073011);
		break;
	case 5:
		Packages.server.quest.MapleQuest.getInstance(1638).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.gainExp(164200);
		qm.dispose();
}
}