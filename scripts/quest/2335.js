/*
	名字:	清除餘黨
	地圖:	結婚禮堂
	描述:	106021600
*/

var status = -1;

function start(mode, type, selection){
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
		qm.sendNext("This is not the end, #b#h0##k. Minions of the #bPrime Minister#k can still be found scattered throughout the castle.");
		break;
	case 1:
		qm.sendYesNo("There are some more servants of the Prime Minister hiding at #b#m106021001##k. You can get to them by using #bSecret Key#k from the #bCastle Wall 3#k. Please make sure to clear them all out!");
		break;
	case 2:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.sendOk("Please have at least 1 slot empty in your Etc window.");
			qm.dispose();
			return;
			}
			qm.sendNext("For one last time, good luck.");
			Packages.server.quest.MapleQuest.getInstance(2335).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.gainItem(4032405, qm.getPlayer().itemQuantity(4032405) ? 0 : 1);
			qm.dispose();
}
}