/*
	名字:	詹姆士的下落（１）
	地圖:	菇菇森林路口
	描述:	106020000
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2325)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(2325).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("H-h-help! I'm so scared!");
			break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2325)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(2325).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.showNpcSpecialEffect(1300008, "out");
			qm.gainExp(1600);
			}
			qm.sendNextPrev("What? My brother sent you here? Whew...I'm safe now. Thank you so much.");
			break;
	case 2:
		qm.dispose();
}
}