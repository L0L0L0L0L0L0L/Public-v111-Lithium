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
		qm.sendNext("Don't you want stronger skills?");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23034)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(23034).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("You destroyed the #o9001032#! I was right about you. Now our town won't have to worry about energy issues for awhile. You've really done a great thing for Edelstein.");
			break;
	case 1:
		qm.sendYesNo("Now that I know how much you've grown, I will give you the next lesson. I believe you are now strong enough to be reborn as a more powerful Wild Hunter!");
		break;
	case 2:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23034)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendNext("I was going to give you gift for making the job advancement but I can't. Your Inventory Equip tab is full. Empty out at least one slot if you're interested in my gift.");
			qm.dispose();
			return;
			}
			qm.gainItem(1142244, 1);
			qm.getPlayer().changeJob(3311);
			Packages.server.quest.MapleQuest.getInstance(23034).forceComplete(qm.getPlayer(), qm.getNpc());
			}
			qm.sendNext("You've been advanced. You now have a larger arsenal of skills to manage. It might not be easy, since you still have to control your mount, but I'm not worried.");
			break;
	case 3:
		qm.sendPrev("I'll see you at the next lesson. Until then, continue your good fight.");
		break;
	case 4:
		qm.dispose();
}
}