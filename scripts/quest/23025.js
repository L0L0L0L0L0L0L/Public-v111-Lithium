/*
	名字:	復仇和成長
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
		if (status == 3) {
		qm.sendNext("Don't you want to become stronger?");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23025)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(23025).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendOk("You'll need to empty at least #b2 slots#k in your #bEquip tab#k before you can complete your job advancement.");
			qm.dispose();
			return;
			}
			qm.sendNext("So this is the Black Wings Report we needed. With this document, we can figure out the plans of the Black Wings. Thank you so much.");
			break;
	case 1:
		qm.sendNextPrev("This mission was not originally assigned to you, but I swapped a few things around. I wanted you to defeat that individual personally, give you a chance to right past wrongs, you know?");
		break;
	case 2:
		qm.sendNextPrev("Even so, I didn't think you would accomplish the mission so easily. You're progressing much faster than I expected.");
		break;
	case 3:
		qm.sendYesNo("I wasn't planning to do this for a while yet, but I think you're ready. Yes, I will advance you to become a Mechanic who can handle even more machines.");
		break;
	case 4:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23025)).getStatus() < 2) {
			qm.gainItem(1142243, 1);
			qm.gainItem(4032739, -1);
			qm.getPlayer().changeJob(3510);
			Packages.server.quest.MapleQuest.getInstance(23025).forceComplete(qm.getPlayer(), qm.getNpc());
			}
			qm.sendNext("I've advanced your job. I've also passed you a few more skills. I also upgraded the Magnum that you've been using up to this point. Enjoy the new powers that you have gained.");
			break;
	case 5:
		qm.sendPrev("I will see you at the next lesson. Until then, keep up the good fight!");
		break;
	case 6:
		qm.dispose();
}
}