/*
	名字:	製作紅珠玉
	地圖:	瑞恩村
	描述:	140000000
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 0) {
		qm.sendNext("What's with the joke? Don't even try it. You were never funny!");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21302)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(21302).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("Oh, isn't that... Hey, did you remember how to make the Red Jade? You may be a dummy who has amnesia, but this is why I can't leave you. Now hurry. give me the gem!");
			break;
	case 1:
		qm.sendYesNo("Okay, now that I have the power of Red Jade, I'll restore more of your abilities. Your level has gotten much higher since the last time we met, so I'm sure I can work my magic a bit more this time!");
		break;
	case 2:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendOk("Hey... You don't have any empty slots in your Equip tab. Empty one out, will you?");
			qm.dispose();
			return;
			}
			qm.removeAll(4032312);
			qm.gainItem(1142131, 1);
			qm.getPlayer().changeJob(2111);
			Packages.server.quest.MapleQuest.getInstance(21302).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.sendNext("Please get back all of your abilities soon. I want to explore with you like we did in the good old days.");
			break;
	case 3:
		qm.dispose();
}
}