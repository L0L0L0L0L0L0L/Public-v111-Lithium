/*
	名字:	哈姆梅爾的禮物
	地圖:	專業技術村 &amp;lt;梅斯特鎮&gt;
	描述:	910001000
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
		qm.sendNext("I see you've completed Cole's first lesson in Mining! I've prepared a small gift to congratulate you.");
		break;
	case 1:
		qm.sendNextPrev("The #bportal on the far right side in the lower level of Ardentmill#k is connected to Cole's secret mine. #bIt's filled with mineral veins for Mining#k.");
		break;
	case 2:
		qm.sendNextPrev("Well then, keep up the good work until you become a great Miner!");
		break;
	case 3:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Etc item inventory is full."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(2553).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(4001480, 1);
			qm.dispose();
}
}