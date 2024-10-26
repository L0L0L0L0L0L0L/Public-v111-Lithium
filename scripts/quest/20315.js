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
		qm.sendYesNo("Because of that, the Empress gave you a new title! Can you believe that? Do you want the title?");
		break;
	case 2:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your equip. inventory."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(20315).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(1511);
			qm.gainItem(4032179, -1);
			qm.gainItem(4032105, -1);
			qm.gainItem(1142068, 1);
			qm.getPlayer().gainSP(1, 2);
			qm.sendOk("#h0#, from here on out, you will become an Advanced Knight of the Knights of Cygnus! As your standing rises, so does the difficulty of the tasks you will be receiving. But challenge is good, right? You have to enjoy life. Enjoy what's given to you!");
			break;
	case 3:
		qm.dispose();
}
}