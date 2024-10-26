/*
	名字:	影武者－覺醒之時
	地圖:	雪姬的房間
	描述:	103050101
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2363)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(2363).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendYesNo("So, the Mirror of Insight has chosen you. Very well. I will promote you to Blade Recruit when you are ready.");
			break;
	case 1:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your equip. inventory."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(2363).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(430);
			qm.gainItem(4032616, -1);
			qm.gainItem(1342000, 1);
			qm.sendNext("You are now a #b#eBlade Recruit#n#k. Take pride in that fact.");
			break;
	case 2:
		qm.dispose();
}
}