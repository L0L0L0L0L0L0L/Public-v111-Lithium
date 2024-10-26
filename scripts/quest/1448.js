/*
	名字:	重砲兵隊長
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1448)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1448).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("You passed the test safely. Good! I bet you were surprised to see #bKyrin#k there, huh? That was #bKyrin from another dimension#k, a copy from another world. I guess she takes your skills quite seriously.");
			break;
	case 1:
		qm.sendYesNo("The fight with the true Pirate, Kyrin, has give you the strength of a true Pirate. Can you feel it? All that is left is the Job Advancement. Are you prepared to become a Cannon Trooper, an even stronger Pirate?");
		break;
	case 2:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendNext("The Job Advancement cannot continue because you either have no room in your Equip tab, or you do not have a Black Charm.");
			qm.dispose();
			return;
			}
			qm.gainItem(1142109, 1);
			qm.gainItem(4031059, -1);
			qm.getPlayer().changeJob(531);
			Packages.server.quest.MapleQuest.getInstance(1448).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.sendOk("You are now a #bCannon Trooper#k, the master of #bridiculously large guns#k. As a true Cannon Trooper, use your strength to the fullest!");
			break;
	case 3:
		qm.dispose();
}
}