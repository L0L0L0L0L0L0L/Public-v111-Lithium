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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23033)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(23033).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("You destroyed the #o9001032#! Good. This should alleviate the problem of insufficient energy in town. We'll all be able to sleep a little easier now. You've done a tremendous good for Edelstein.");
			break;
	case 1:
		qm.sendYesNo("You've proven yourself so throughly that there's no reason to put this off. I think you are ready for your advancement. Now you will become an even stronger Battle Mage. I trust you'll be able to handle it...");
		break;
	case 2:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23033)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendNext("I was going to give you gift for making the job advancement but I can't. Your Inventory Equip tab is full. Empty out at least one slot if you're interested in my gift.");
			qm.dispose();
			return;
			}
			qm.gainItem(1142244, 1);
			qm.getPlayer().changeJob(3211);
			Packages.server.quest.MapleQuest.getInstance(23033).forceComplete(qm.getPlayer(), qm.getNpc());
			}
			qm.sendNext("You've been advanced. Now you have access to a maddening variety of powerful skills. They might not be easy to control, but from the way you completed that last mission, I think you can handle them.");
			break;
	case 3:
		qm.sendPrev("I'll see you at the next lesson. Until then, continue your good fight.");
		break;
	case 4:
		qm.dispose();
}
}