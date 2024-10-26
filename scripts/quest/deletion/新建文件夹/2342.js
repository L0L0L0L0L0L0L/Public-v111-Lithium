/*
	名字:	找回的玉璽
	地圖:	結婚禮堂
	描述:	106021600
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
		qm.sendNext("Looks like you forgot to pick up the #b#t4001318##k when you fought with the #bPrime Minister#k. This is very important to our kingdom, so please deliver this to my father as soon as possible.");
		break;
	case 1:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your etc. inventory."));
			qm.dispose();
			return;
			}
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(2342));
			Packages.server.quest.MapleQuest.getInstance(2342).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(4001318, 1);
			qm.dispose();
}
}