/*
	名字:	鍊金術的話，說不定有可能
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23264)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(23264).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.dispose();
			qm.gainExp(40000);
			qm.gainItem(4000419, -1);
			Packages.server.quest.MapleQuest.getInstance(23264).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeMap(qm.getMap(931050211), qm.getMap(931050211).getPortal(0));
}
}