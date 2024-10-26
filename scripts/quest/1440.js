/*
	名字:	狙擊手
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1440)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1440).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("You passed the test, I see. Did you have any trouble with #bAthena Pierce from another dimension?#k See, the #bHoly Stone#k can summon a copy of someone from another dimension to battle against. This is what #Athena Pierce prepared just for you.");
			break;
	case 1:
		qm.sendYesNo("The fight with the true Bowman, Athena Pierce, will guide you to the path of true mastery. Can you feel your growth? Are you ready to become a Sniper, an even more powerful Bowman?");
		break;
	case 2:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendNext("The Job Advancement cannot continue because you either have no room in your Equip tab, or you do not have a Black Charm.");
			qm.dispose();
			return;
			}
			qm.gainItem(1142109, 1);
			qm.gainItem(4031059, -1);
			qm.getPlayer().changeJob(321);
			Packages.server.quest.MapleQuest.getInstance(1440).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.sendOk("From now on, you are a #bSniper#k, a master of #bbows#k. As a true Sniper, show the world your power!");
			break;
	case 3:
		qm.dispose();
}
}