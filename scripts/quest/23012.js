/*
	名字:	狂豹獵人之路
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23012)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(23012).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendYesNo("I applaud your spirit! But are you certain about this? Wild Hunters are very strong, but they're also difficult to control. You have to control your mount and attack at the same time. It requires excellent reflexes. Are you sure you're up for a job like this?");
			break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23012)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 2 || qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
			qm.sendOk("You don't have enough space in your Inventory Equip and Use tabs for me to give you a weapon? Empty out a few slots for me.");
			qm.dispose();
			return;
			}
			qm.getPlayer().changeJob(3300);
			qm.resetStats(4, 25, 4, 4);
			qm.gainItem(1142242, 1);
			qm.gainItem(1462092, 1);
			qm.gainItem(2061000, 2000);
			Packages.server.quest.MapleQuest.getInstance(23012).forceComplete(qm.getPlayer(), qm.getNpc());
			Packages.server.quest.MapleQuest.getInstance(23977).forceStart(qm.getPlayer(), qm.getNpc(), 1);
			qm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(30001061), 1, 1, -1);
                        		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.updateJaguar(qm.getPlayer()));//防止捕獲技能閃退
			}
			qm.sendNext("Well, well! Congratulations! You're now an official member of the Resistance and a Wild Hunter. Hop on your mount, move like the wind. and slay all enemies who get in your way!");
			break;
	case 2:
		qm.sendNextPrev("Now, a warning. Don't lure the Black Wings' attention to you by telling people you're a Wild Hunter. I'll be your 'teacher' from now on. This IS a school after all, right? I'll give you special lessons to turn you into the best Wild Hunter ever!");
		break;
	case 3:
		qm.dispose();
}
}