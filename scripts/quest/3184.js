

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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3184)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(3184).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendOk("#b#eYou will receive the following rewards:#n#k \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 5000 exp");
			break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(3184).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.gainItem(4000051, -10);
		qm.gainItem(4000052, -10);
		qm.gainExp(5000);
		qm.dispose();
}
}