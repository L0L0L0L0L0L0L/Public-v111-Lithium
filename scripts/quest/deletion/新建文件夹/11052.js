/*
	名字:	生存達人
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
		qm.sendNext("It's not really a difficult mission... You can do it, can't you?");
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
		qm.sendAcceptDecline("This mission is to score 500 points in Free-for-all mode throughout the day! How does that sound? It's not that hard, is it?");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(11052).forceStart(qm.getPlayer(), qm.getNpc(), null);
		Packages.server.quest.MapleQuest.getInstance(11055).forceStart(qm.getPlayer(), qm.getNpc(), 0);
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
		qm.sendNext("See? Piece of cake, right? 'Course it was. Here's your gift, just like I said.");
		break;
	case 1:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Etc item inventory is full."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(11052).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(4310015, 1);
			qm.dispose();
}
}