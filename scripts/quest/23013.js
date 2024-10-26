/*
	名字:	機甲戰神之路
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
		qm.sendNext("I will await your decision.");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23013)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(23013).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendYesNo("Have you made your decision to become a Mechanic? You can still change your mind, you know. Just stop the conversation, forfeit this quest, and talk to another job trainer. So, are you certain becoming a Mechanic is the best way for you to serve the Resistance?");
			break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23013)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 2) {
			qm.sendOk("You don't have enough space in your Inventory Equip tab for me to give you a weapon...");
			qm.dispose();
			return;
			}
			qm.getPlayer().changeJob(3500);
			qm.resetStats(4, 20, 4, 4);
			qm.gainItem(1142242, 1);
			qm.gainItem(1492014, 1);
			Packages.server.quest.MapleQuest.getInstance(23013).forceComplete(qm.getPlayer(), qm.getNpc());
			Packages.server.quest.MapleQuest.getInstance(23977).forceStart(qm.getPlayer(), qm.getNpc(), 1);
			qm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(30001068), 1, 1, -1);
			}
			qm.sendNext("Welcome to the Resistance. From now on, you are a Mechanic. As one who works with machines, use every method available to defeat the enemies before you!");
			break;
	case 2:
		qm.sendNextPrev("Take this Magnum. It's extremely powerful. Use it to kick some Black Wing beeee-hind!");
		break;
	case 3:
		qm.sendNextPrev("We have to be careful that our identity is not revealed to the Black Wings. So from no on, refer to me as teacher. You will pretend to be a student who is coming here for extracurricular lessons. It's during these lessons that I will teach you to become a strong Mechanic.");
		break;
	case 4:
		qm.dispose();
}
}