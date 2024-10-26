/*
	名字:	龍騎士
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1433)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1433).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("So, you passed the test... How did you fare against #bDances with Balrog from another dimension#k? He was nothing more than a mysterious illusion made by the amazing power of the #bHoly Stone#k...");
			break;
	case 1:
		qm.sendYesNo("By fighting against #bDances with Balrog#k. you have proven your right to become a true Warrior. You may now take the title of #bDragon Knight#k...are you ready?");
		break;
	case 2:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendNext("The Job Advancement cannot continue because you either have no room in your Equip tab, or you do not have a Black Charm.");
			qm.dispose();
			return;
			}
			qm.gainItem(1142109, 1);
			qm.gainItem(4031059, -1);
			qm.getPlayer().changeJob(131);
			Packages.server.quest.MapleQuest.getInstance(1433).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.sendOk("You are now a #bDragon Knight#k, a master of #bswords and blunt weapons#k. As a true Warrior, show the world your strength!");
			break;
	case 3:
		qm.dispose();
}
}