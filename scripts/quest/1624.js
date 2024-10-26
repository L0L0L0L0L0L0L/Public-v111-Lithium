/*
	名字:	[十字獵人]桃花仙境的十字獵人
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1624)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1624).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("Hey, you! Remember me? We met in Orbis? Well? You DO remember me, right?");
			break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(1624).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.dispose();
}
}