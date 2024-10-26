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
		qm.sendNext("Huh? You don't want to get stronger? Maybe I was wrong about you...");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23024)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(23024).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("So you have the Black Wings Report. Ha! I knew I was right about you!");
			break;
	case 1:
		qm.sendNextPrev("This mission was supposed to go to someone else but I had it re-assigned to you. That guy from the Black Wings was the one who attacked you in the past. I gave you the mission so you could take your revenge. Two birds with one stone, eh?");
		break;
	case 2:
		qm.sendNextPrev("To be honest though, you completed the mission more easily than I expected. You've really developed your skills...");
		break;
	case 3:
		qm.sendYesNo("I originally thought it might be too soon, but you've proved me wrong. You're more than ready to advance. You're ready to enhance your powers as a Wild Hunter.");
		break;
	case 4:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23024)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendNext("Hey, you don't have any empty Equip slots in your inventory. I was going to give you a gift...");
			qm.dispose();
			return;
			}
			qm.gainItem(1142243, 1);
			qm.gainItem(4032738, -1);
			qm.getPlayer().changeJob(3310);
			Packages.server.quest.MapleQuest.getInstance(23024).forceComplete(qm.getPlayer(), qm.getNpc());
			}
			qm.sendNext("I've advanced your job. I've also upgraded your skills. Enjoy your new abilities!");
			break;
	case 5:
		qm.sendPrev("I will see you at the next lesson. Until then, keep up the good fight.");
		break;
	case 6:
		qm.dispose();
}
}