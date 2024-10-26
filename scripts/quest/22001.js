/*
	名字:	餵食地獄獵犬
	地圖:	前院
	描述:	100030102
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 2) {
		qm.sendNext("Stop being lazy. Do you want to see your brother bitten by a dog? Hurry up! Talk to me again and accept the quest!");
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
		qm.sendNext("Haha. I had a good laugh. Hahaha. But enough with that nonsense. Feed #p1013102#, would you?");
		break;
	case 1:
		qm.sendNextPrevS("#bWhat? That's #p1013101#'s job!", 2);
		break;
	case 2:
		qm.sendAcceptDecline("You little brat! I told you to call me Older Brother! You know how much #p1013102# hates me. He'll bite me if I go near him. You feed him. He likes you.");
		break;
	case 3:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22001)).getStatus() < 1) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.sendNext("What's all that in your Inventory? I can't give you any Dog Food then. Empty a slot in your Etc window.");
			qm.dispose();
			return;
			}
			qm.gainItem(4032447, qm.getPlayer().itemQuantity(4032447) ? 0 : 1);
			}
			qm.sendNext("Hurry up and head #bleft#k to feed #b#p1013102##k. He's been barking to be fed all morning.");
			break;
	case 4:
		qm.sendNextPrev("Feed #p1013102# and come back to see me.");
		break;
	case 5:
		Packages.server.quest.MapleQuest.getInstance(22001).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}