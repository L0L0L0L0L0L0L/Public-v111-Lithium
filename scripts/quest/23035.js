/*
	名字:	破壞能源傳送裝置
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
		if (status < 2) {
		qm.sendNext("You don't want to learn a stronger skill?");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23035)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(23035).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendOk("You'll need to empty at least #b2 slots#k in your #bEquip tab#k before you can complete your job advancement.");
			qm.dispose();
			return;
			}
			qm.sendNext("You successfully destroyed the #o9001032#! Now we don't have to worry about energy for a while. You've accomplished a truly great feat for Edelstein.");
			break;
	case 1:
		qm.sendYesNo("Now that I've seen your abilities, it is time to show you mine. I will now pass on a new skill to you.");
		break;
	case 2:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23035)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(23035).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(3511);
			qm.gainItem(1142244, 1);
			}
			qm.sendNext("I have advanced you. You will now wield a skill that is more varied, more complex, and much, much more powerful. Don't worry, I trust that you will be able to handle it with ease.");
			break;
	case 3:
		qm.sendPrev("I'll see you for your next mission. Keep fighting the good fight.");
		break;
	case 4:
		qm.dispose();
}
}