/*
	名字:	武器向主人挑戰？
	地圖:	瑞恩村
	描述:	140000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("I'm not joking! Something is seriously wrong... Something must have happened to #p1201002#!");
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
		qm.sendAcceptDecline("How is the training going? I know you're busy, but please come to #b#m140000000##k immediately. The #b#p1201002##k has started to act weird again... But it's even weirder now. It's different from before. It's...darker than usual.");
		break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(21400).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}