/*
	名字:	十字軍
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1431)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1431).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("You passed the test safely. Good! I bet you were surprised to see #bDances with Balrog#k there, huh? That was #bDances with Balrog from another dimension#k, a copy from another world. I guess he takes your skills quite seriously.");
			break;
	case 1:
		qm.sendYesNo("The fight with the true Warrior Dances with Balrog has given you the strength of a true Warrior. Can you feel it? All that is left is a Job Advancement. Are you prepared to become a Crusader, an even stronger Warrior?");
		break;
	case 2:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendNext("The Job Advancement cannot continue because you either have no room in your Equip tab, or you do not have a Black Charm.");
			qm.dispose();
			return;
			}
			qm.gainItem(1142109, 1);
			qm.gainItem(4031059, -1);
			qm.getPlayer().changeJob(111);
			Packages.server.quest.MapleQuest.getInstance(1431).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.sendOk("You are now a #bCrusader#k, the master of #bswords and axes#k. As a true Crusader use your strength to the fullest.");
			break;
	case 3:
		qm.dispose();
}
}