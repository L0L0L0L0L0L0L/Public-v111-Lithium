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
		qm.sendNext("The jewel you brought back from the Master of Disguise is Shinsoo's Teardrop. It is the crystalization of Shinsoo's powers. If the Black Mage gets his hands on this, then this spells doom for all of us.");
		break;
	case 1:
		qm.sendYesNo("The Empress thought highly of your accomplishment and granted you a new title. Would you like to receive it?");
		break;
	case 2:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendNext("Your Equip tab is full, which means you don't have room for the medal. If you want the medal, you should take care of your inventory first.");
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(20314).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(1411);
			qm.gainItem(4032179, -1);
			qm.gainItem(4032104, -1);
			qm.gainItem(1142068, 1);
			qm.getPlayer().gainSP(1, 2);
			qm.sendOk("#h0#, from here on out, you are an Advanced Knight of the Cygnus Knights. The title comes with a newfound broad view on everything. You may encounter temptations here and there, but I want you to keep your faith and beliefs in tact and do not succumb to the darkness.");
			break;
	case 3:
		qm.dispose();
}
}