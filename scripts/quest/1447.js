/*
	名字:	隱忍
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1447)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1447).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("You passed the test. Not bad. I should tell you, the #bDark Lord from another dimension#k you fought was merely a clone, but I still didn't think you would win. I was surprised the Dark Lord went out of his way to summon his clone using the #bHoly Stone#k, but I guess it was worth it.");
			break;
	case 1:
		qm.sendYesNo("The fight with the master Thief, Dark Lord, has proven your own worth as a Thief. The only thing left is your Job Advancement. Are you prepared to become a Blade Lord, and bring your might to a new level?");
		break;
	case 2:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendNext("The Job Advancement cannot continue because you either have no room in your Equip tab, or you do not have a Black Charm.");
			qm.dispose();
			return;
			}
			qm.gainItem(1142109, 1);
			qm.gainItem(4031059, -1);
			qm.getPlayer().changeJob(433);
			Packages.server.quest.MapleQuest.getInstance(1447).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.sendOk("You are now a #bBlade Lord#k. As a true Blade Lord, use your strength to the fullest!");
			break;
	case 3:
		qm.dispose();
}
}