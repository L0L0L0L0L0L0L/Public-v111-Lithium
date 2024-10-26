/*
	名字:	祭司
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1437)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1437).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("Did you meet #bthe other Grendel the Really Old#k? The #bHoly Stone#k is more powerful than I thought, if it allows you to fight a doppelganger in another dimension. You should thank #Grendel the Really Old... he prepared all of this just for you...");
			break;
	case 1:
		qm.sendYesNo("By fighting against a true Magician, you have proven your talents with magic. The only thing left is the Job Advancement to Priest. Are you ready?");
		break;
	case 2:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendNext("The Job Advancement cannot continue because you either have no room in your Equip tab, or you do not have a Black Charm.");
			qm.dispose();
			return;
			}
			qm.gainItem(1142109, 1);
			qm.gainItem(4031059, -1);
			qm.getPlayer().changeJob(231);
			Packages.server.quest.MapleQuest.getInstance(1437).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.sendOk("Now you're a #bPriest#k, master of #bhealing powers and holiness#k. Feel free to wield your newly acquired powers.");
			break;
	case 3:
		qm.dispose();
}
}