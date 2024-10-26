/*
	名字:	永無止盡的戰鬥
	地圖:	偉大的精神降臨
	描述:	910150100
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 0) {
		qm.sendNext("Don't be afraid of a little gift. This is all to help you beat that nasty Black Mage.");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24020)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(24020).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("Hero's Echo... Just by being around, you lift the people's spirits. This strength is yours to take.");
			break;
	case 1:
		qm.sendYesNo("And please take this special gift for your friend. You know who I mean...");
		break;
	case 2:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendNext("Look in your Equip inventory. It should be there...");
			qm.dispose();
			return;
			}
			qm.gainItem(1142340, 1);
			Packages.server.quest.MapleQuest.getInstance(24020).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(20021160), 0, 0, -1);
			qm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(20021161), 1, 1, -1);
			qm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(20021005), 1, 1, -1);
			qm.sendOk("You will bring peace back to the Elves. We're counting on you, deary.");
			break;
	case 3:
		qm.dispose();
}
}