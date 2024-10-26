/*
	名字:	阿裡可的秘信
	地圖:	長老公館
	描述:	211000001
*/

var status = -1;

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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2374)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(2374).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("I've been waiting for you. Do you have Arec's answer? Please give me his letter.");
			break;
	case 1:
		qm.sendNextPrevS("We have finally received Arec's official recognition. This is an important moment for us. It's also time that you experience a change.", 1);
		break;
	case 2:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2374)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your equip. inventory."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(2374).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(432);
			qm.gainItem(4032619, -1);
			qm.gainItem(1132021, 1);
			}
			qm.sendPrevS("Now that we have Arec's recognition, you can make a job advancement by going to see him when you reach Lv. 70. Finally, a new future has been opened for the Dual Blades.", 1);
			break;
	case 3:
		qm.dispose();
}
}