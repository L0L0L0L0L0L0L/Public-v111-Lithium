/*
	名字:	神獸的眼淚
	地圖:	耶雷弗
	描述:	130000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 0) {
		qm.sendNext("Come back when you are ready.");
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
		qm.sendNext("The jewel you brought back from the Master of Disguise is Shinsoo's Teardrop. It is the crystallization of Shinsoo's powers. If the Black Mage gets his hands on this, then this spells doom for all of us.");
		break;
	case 1:
		qm.sendYesNo("For your effort in preventing a potentially serious disaster, the Empress has decided to present you with a new title. Are you ready to accept it?");
		break;
	case 2:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendNext("If you wish to receive the medal befitting the title, you may want to make some room on your equipment inventory.");
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(20311).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(1111);
			qm.gainItem(4032179, -1);
			qm.gainItem(4032101, -1);
			qm.gainItem(1142068, 1);
			qm.getPlayer().gainSP(1, 2);
			qm.sendOk("#h0#, as of this moment, you are an Advanced Knight. From this moment on, you shall carry yourself with dignity and respect befitting your new title, an Advanced Knight of Cygnus Knights. May your glory continue to shine as bright as this moment.");
			break;
	case 3:
		qm.dispose();
}
}