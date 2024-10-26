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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23023)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(23023).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("You brought the Black Wings Report? Good!");
			break;
	case 1:
		qm.sendNextPrev("You know, I gave you that mission on purpose. That member of the Black Wings was the one who hurt you in the past. How's it feel to easily defeat someone who once seemed impossible to fight?");
		break;
	case 2:
		qm.sendNextPrev("Still, I had no idea you'd handle the mission so excellently. To be honest, I had my doubts about you. But I'm starting to think there's something...special about you.");
		break;
	case 3:
		qm.sendYesNo("Okay, I think you're ready for the next stage, a stage in which you'll be transformed into an unimaginably strong Battle Mage...");
		break;
	case 4:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23023)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendNext("Whoa! Why are you carrying so many things? I was going to give you a gift but there isn't enough room in the Equip tab of your inventory.");
			qm.dispose();
			return;
			}
			qm.gainItem(1142243, 1);
			qm.gainItem(4032737, -1);
			qm.getPlayer().changeJob(3210);
			Packages.server.quest.MapleQuest.getInstance(23023).forceComplete(qm.getPlayer(), qm.getNpc());
			}
			qm.sendNext("I've advanced your job. I've also passed onto you skills that are much more powerful than the ones you've had before. You are now an even more powerful Battle Mage. Guess I'm a pretty good teacher, heh.");
			break;
	case 5:
		qm.sendPrev("I will see you at the next lesson. Until then, keep up the good fight.");
		break;
	case 6:
		qm.dispose();
}
}