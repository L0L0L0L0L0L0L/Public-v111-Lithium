/*
	名字:	最後的報告
	地圖:	時間裂縫
	描述:	272000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1 || qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.SETUP).getNumFreeSlot() < 1) {
			qm.sendNext("Oh, you have too many belongings. Please empty one or more slots in the Equip and Set-up tabs and talk to me again.");
			qm.dispose();
			return;
			}
			qm.sendNext("#h0#, I've been waiting for you. I would like to ask you about the past. I've been investigating our agents to see if anyone other than myself was influenced by #p2144010#. Fortunately, the other agents seem to be unaffected.");
			break;
	case 1:
		qm.sendNextPrevS("I'm glad I took down #p2144010#'s Clone.", 2);
		break;
	case 2:
		qm.sendNextPrev("I have to admit, I breathed my first sigh of relief in a long time when I heard about it. What I want to ask is, have we prevented #p2144010#'s plot from occurring?");
		break;
	case 3:
		qm.sendNextPrevS("I wish I could say that we had, but I don't think so. I believe #p2144010#'s true form is still out there. #p2144016# told me that the Crack in Time would let me into the Dimensional Schism.", 2);
		break;
	case 4:
		qm.sendNextPrev("We can't miss this opportunity! We have to strike now, #h0#! I know you could probably use some rest, but time is not on our side. You must go!");
		break;
	case 5:
		qm.sendNextPrev("Take some time to prepare yourself and talk to me again when you're ready.");
		break;
	case 6:
		Packages.server.quest.MapleQuest.getInstance(31179).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.gainItem(1112679, 1);
		qm.dispose();
}
}