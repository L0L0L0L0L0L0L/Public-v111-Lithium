/*
	名字:	煉獄巫師之路
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
		if (status < 1) {
		qm.sendNext("Think carefully before you make your decision.");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23011)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(23011).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendYesNo("So you've finally decided to become a Battle Mage, eh? Well, you can still change your mind. Just stop our conversation, forfeit this quest, and talk to another class trainer. But are you certain you want to become a Battle Mage? I'm not interested in teaching you unless you're a hundred percent sure...");
			break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23011)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 2) {
			qm.sendOk("You don't have enough space in the Equip tab of your inventory. How am I supposed to give you your weapon? Empty a few slots for me.");
			qm.dispose();
			return;
			}
			qm.getPlayer().changeJob(3200);
			qm.resetStats(4, 4, 20, 4);
			qm.gainItem(1142242, 1);
			qm.gainItem(1382100, 1);
			Packages.server.quest.MapleQuest.getInstance(23011).forceComplete(qm.getPlayer(), qm.getNpc());
			Packages.server.quest.MapleQuest.getInstance(23977).forceStart(qm.getPlayer(), qm.getNpc(), 1);
			}
			qm.sendNext("Right, then. Welcome to the Resistance. From now on, you will play the role of a Battle Mage, a fierce Magician always ready to lead your party from the front line.");
			break;
	case 2:
		qm.sendNextPrev("But don't go spreading it around that you're a Battle Mage, hm? No need to tempt the Black Wings to come after you. From now on, I'll be your teacher. If anyone asks, you're visiting me as a regular student, not as a member of the Resistance. I'll give you special lessons now and then. You better not fall asleep in class, hear?");
		break;
	case 3:
		qm.dispose();
}
}