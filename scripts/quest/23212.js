/*
	名字:	和莫斯提馬的契約
	地圖:	秘密廣場
	描述:	310010000
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("You're still not sure about this?");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23212)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(23212).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendOk("You'll need to empty at least #b2 slots#k in your #bEquip tab#k before you can complete your job advancement.");
			qm.dispose();
			return;
			}
			qm.sendYesNo("Everything is ready. Let us begin the contract ritual. Focus your mind.");
			break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23212)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(23212).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(3110);
			qm.gainItem(1142342, 1);
			}
			qm.sendNextS("#b(You feel a strange energy flowing into you.)", 17);
			break;
	case 2:
		qm.sendPrevS("Contract completed. Great! Now, don't say anything. Just speak... directly into MY MIND.", 1);
		break;
	case 3:
		qm.dispose();
}
}