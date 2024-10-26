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
		qm.sendYesNo("As a token of her appreciation for your work on this, the Empress decided to present you with a new title. Would you like to receive that title?");
		break;
	case 2:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your equip. inventory."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(20313).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(1311);
			qm.gainItem(4032179, -1);
			qm.gainItem(4032103, -1);
			qm.gainItem(1142068, 1);
			qm.getPlayer().gainSP(1, 2);
			qm.sendOk("#h0#, as of this moment, you are an Advanced Knight. From this moment on, you will be carrying a whole lot of responsibility befitting your new title as an Advanced Knight of Cygnus Knights. You may view the world in a carefree mode, but please remember what your mission is.");
			break;
	case 3:
		qm.dispose();
}
}