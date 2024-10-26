/*
	名字:	[十字獵人]業務報告
	地圖:	神木村
	描述:	240000000
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
		qm.sendNext("The Mystic Gates are connected to the Black Mage somehow; I'm sure of it! The gates seem to control nearby monsters and drain the life right out of anyone who gets near them. But why? At any rate, I need to tell Bastille about all this. Actually, why don't you tell him for me? I'll follow you when I'm done here.");
		break;
	case 1:
		qm.sendYesNo("All right! I'll send you straight to Edelstein!");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(1637).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(310000000), qm.getMap(310000000).getPortal(0));
		qm.dispose();
}
}

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
		qm.sendNext("Did you find anything in Leafre? Come, let's discuss this somewhere more private.");
		break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(1637).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().changeMap(qm.getMap(931050500), qm.getMap(931050500).getPortal(0));
		qm.gainExp(164200);
		qm.dispose();
}
}