/*
	名字:	魔導士(冰，雷)
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1436)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1436).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("Did you meet #bthe other Grendel the Really Old#k? The #bHoly Stone#k is more powerful than I thought if it allows you to fight a doppelganger in another dimension. You should thank #Grendel the Really Old... He prepared all of this Just for you...");
			break;
	case 1:
		qm.sendYesNo("By fighting against a true Magician, you have proven your talents with magic. The only thing left is the Job Advancement to Mage. Are you ready?");
		break;
	case 2:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendNext("The Job Advancement cannot continue because you either have no room in your Equip tab, or you do not have a Black Charm.");
			qm.dispose();
			return;
			}
			qm.gainItem(1142109, 1);
			qm.gainItem(4031059, -1);
			qm.getPlayer().changeJob(221);
			Packages.server.quest.MapleQuest.getInstance(1436).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.sendOk("You are now a #bMage#k, a master of #bice and lightning#k. As a true Mage. show the world your strength!");
			break;
	case 3:
		qm.dispose();
}
}