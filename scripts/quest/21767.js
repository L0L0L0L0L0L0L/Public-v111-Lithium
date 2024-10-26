/*
	名字:	木箱的秘密
	地圖:	維多利亞港
	描述:	104000000
*/

var status = -1;

function start(mode, type, selection) {
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
		qm.sendNextS("(Inside the box was an unidentifiable treatment of some sort.)", 9);
		break;
	case 1:
		qm.sendNextPrevS("#bHm, there's a medicinal substance in the box. What could this be? You better take this to John and ask him what it is.", 3);
		break;
	case 2:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.sendNextS("#bOh, is the bag full? Better check.", 3);
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(21767).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.gainItem(4032423, qm.getPlayer().itemQuantity(4032423) ? 0 : 1);
			qm.dispose();
}
}