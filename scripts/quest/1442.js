/*
	名字:	暗殺者
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1442)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1442).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("You passed the test. Not bad. I should tell you, the #bDark Lord from another dimension#k you fought was merely a clone, but I still didn't think you would win. I was surprised the Dark Lord went out of his way to summon his clone using the #bHoly Stone#k, but I guess it was worth it.");
			break;
	case 1:
		qm.sendYesNo("The fight with the true Thief, Dark Lord, has proven your worth as a true Thief. Now, the only thing left is the Job Advancement. Are you prepared to become a Hermit, an even stronger Thief?");
		break;
	case 2:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendNext("The Job Advancement cannot continue because you either have no room in your Equip tab, or you do not have a Black Charm.");
			qm.dispose();
			return;
			}
			qm.gainItem(1142109, 1);
			qm.gainItem(4031059, -1);
			qm.getPlayer().changeJob(411);
			Packages.server.quest.MapleQuest.getInstance(1442).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.sendOk("You are now a #bHermit#k, a master of #bclaws and throwing stars#k. As a true Hermit, use your strength to the fullest!");
			break;
	case 3:
		qm.dispose();
}
}