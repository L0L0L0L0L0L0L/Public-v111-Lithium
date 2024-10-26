/*
	名字:	菲利屋司的請託
	地圖:	櫻花處
	描述:	910150001
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 0) {
		qm.sendNext("There must...be more...we can do...");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24002)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(24002).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("Maybe we're the lucky ones. While we sleep, Maple World will heal from the terrible things the Black Mage has done. I wonder what kind of world we'll wake up to?");
			break;
	case 1:
		qm.sendYesNo("Your Highness, I will dream of a more beautiful world when we awaken...");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(24002).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.sendOk("I wish you...sweet dreams...");
		break;
	case 3:
		qm.dispose();
}
}