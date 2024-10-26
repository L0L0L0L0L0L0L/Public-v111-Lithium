/*
	名字:	真正的冒險家
	地圖:	祭司之林
	描述:	240010501
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1455)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1455).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendYesNo("You proved that everything you need to be a true hero exists within yourself. There is nothing left for you to prove. Are you ready to realize your full potential?");
			break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1455)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendNext("You don't have enough space in your Inventory. Make some room and try again.");
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(1455).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(qm.getPlayer().getJob() + 1);
			qm.gainItem(4031514, -1);
			qm.gainItem(4031515, -1);
			qm.gainItem(1142110, 1);
			}
			qm.sendNext("You started your journey as a simple adventurer...but you have grown so much since then. You possesses great strength, willpower, and courage.");
			break;
	case 2:
		qm.sendNextPrev("If one who possesses all of these qualities cannot be called a hero, then who can?");
		break;
	case 3:
		qm.sendPrev("A hero is not born, but is created through struggle. Accept your destiny, and lead Maple World to a brighter future.");
		break;
	case 4:
		qm.dispose();
}
}