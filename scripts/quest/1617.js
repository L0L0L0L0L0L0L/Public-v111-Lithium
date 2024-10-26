/*
	名字:	[十字獵人]十字獵人
	地圖:	補給品倉庫
	描述:	931050500
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("Indeed. It seems Starling was wrong about you.");
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
		qm.sendYesNo("Yes, yes, I'm sure you're eager to know all about our little operation. But first thing's first! I must test your aptitude. Are you ready to join the Silent Crusade? Well, are you?");
		break;
	case 1:
		qm.sendNextS("We shall see. Your test is simple enough: Defeat my puppy, Coco. Shall we begin?", 1);
		break;
	case 2:
		if (qm.getMap(931050510).getCharacters().size() < 1) {
			qm.getMap(931050510).resetFully();
			Packages.server.quest.MapleQuest.getInstance(1617).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.getPlayer().changeMap(qm.getMap(931050510), qm.getMap(931050510).getPortal(1));
			qm.getPlayer().startMapTimeLimitTask(300, qm.getMap(931050500));
			qm.dispose();
			return;
			}
			qm.sendNext("Ah, ha ha, this is embarrassing. You'll have to re-take the test. Just wait for a minute.");
			qm.dispose();
}
}