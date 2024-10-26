/*
	名字:	開始逃脫！
	地圖:	遇難者泥屋
	描述:	3000200
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("You're not done here? What could you POSSIBLY want to do on a mostly-deserted island?");
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
		qm.sendAcceptDecline("You're back! Great. I got the Ignition Device all hooked up, so we can get back to civilization. Nothing left to do here, right? Let's roll!");
		break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(2568).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(912060200), qm.getMap(912060200).getPortal(0));
		qm.dispose();
}
}