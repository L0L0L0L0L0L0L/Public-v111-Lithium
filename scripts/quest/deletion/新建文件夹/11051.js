/*
	名字:	大亂鬥參加獎勵
	地圖:	戰鬥廣場
	描述:	960000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 0) {
		qm.sendNext("Really? It's not like it's hard...");
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
		qm.sendNext("Hello, #h0#! I am Rosette, the Battle Square guide. Right now, I am handing out gifts to those who complete challenges.");
		break;
	case 1:
		qm.sendAcceptDecline("This mission is very easy. Just participate in any Battle Mode 5 times, and I'll give you a gift. You can do that, right?");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(11051).forceStart(qm.getPlayer(), qm.getNpc(), null);
		Packages.server.quest.MapleQuest.getInstance(11054).forceStart(qm.getPlayer(), qm.getNpc(), 0);
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
		qm.sendNext("See? I told you it was easy. It WAS easy, right? 'Course it was.");
		break;
	case 1:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Etc item inventory is full."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(11051).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(4310015, 1);
			qm.dispose();
}
}