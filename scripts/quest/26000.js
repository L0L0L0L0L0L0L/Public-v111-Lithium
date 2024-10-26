/*
	名字:	黛依雅的G-藥水
	地圖:	公會
	描述:	公會
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("So you won't claim them now? Come back to get them if needed. They're distributed once a week.");
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
		qm.sendYesNo("The #bBanner of Plenty supplies,#k which get distributed #ronce a week,#k have arrived. \r\nWould you like to receive the items now?");
		break;
	case 1:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
			qm.sendNext("Do you even have any space to receive items? Make sure you check and then come see me again.");
			qm.dispose();
			return;
			}
			qm.gainItem(2002037, qm.getGuild().getLevel() * 25, 7);
			Packages.server.quest.MapleQuest.getInstance(26000).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.sendOk("You can use the distributed supplies until Sunday of this week. \r\nIf you work hard to raise your skill level, you'll be able to receive more Banner of Plenty supplies, so keep at it. Supplies will arrive again next week, so I'll see you then. Best of luck out there!");
			break;
	case 2:
		qm.dispose();
}
}