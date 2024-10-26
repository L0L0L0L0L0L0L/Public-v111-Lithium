/*
	名字:	[十字獵人]前往遺跡發掘現場！
	地圖:	遺跡發掘隊營區
	描述:	102040200
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 0) {
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
		qm.sendNext("- Announcement - A bloodthirsty band of skeletons has appeared in the Excavation Site and they are stirring up a ruckus! Any brave adventurer who helps eliminate these undead beasts will be rewarded. Please see #r#p9040002##k in the #b#m102040200##k for details.");
		break;
	case 1:
		qm.sendYesNo("Would you like to move directly to #rPerion's #m102040200##k?");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(1603).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(102040200), qm.getMap(102040200).getPortal(0));
		qm.dispose();
}
}