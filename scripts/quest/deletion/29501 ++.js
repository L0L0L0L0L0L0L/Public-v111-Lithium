/*
	名字:	闇黑龍王殺手
	地圖:	維多利亞港
	描述:	104000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("Come back when you're ready.");
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
		qm.sendAcceptDecline("#v1142007# #e#b#t1142007##k\r\n\r\n-Horned Tail Hunt Count #1#n\r\n\r\nDo you want to test your skills to see if you're worthy of this title?");
		break;
	case 1:
		qm.sendNext("Current Ranking\r\n\r\n1：)#b?#k : ? times");
		break;
	case 2:
		qm.sendNextPrev("I wish you the best! There isn't a specific time limit, so whenever you think you're ready, come back and see me. Also, you are prohibited from trying out for another title unless you first complete or forfeit this challenge.");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(29501).forceStart(qm.getPlayer(), qm.getNpc(), 0);
		qm.dispose();
}
}

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
		if (status < 2) {
		qm.sendNext("Keep working at it.");
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
		qm.sendSimple("The number of times you hunted Horntail is " + qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(29501)).getCustomData() + ". What would you like to do? \r\n#L0#Take on the special medal challenge.#l\r\n#L1#I want to forfeit the challenge.#l");
		break;
	case 1:
		if (selection == 0) {
			if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(29501)).getCustomData() < 1) {
			qm.sendNext("You haven't even hunted one Horned Tail. Why don't you come back after you hunt at least one?");
			qm.dispose();
			return;
			}
			qm.sendAcceptDecline("Current Ranking\r\n\r\n1：)#b?#k : ? times \r\n\r\nDo you want to try out for the special medal?");
			}
		if (selection == 1) {
			qm.sendAcceptDecline("You don't want to try anymore? If you want to go for another title quest, you have to quit this quest first.");
			}
			select = selection;
			break;
	case 2:
		if (select == 1) {
			Packages.server.quest.MapleQuest.getInstance(29501).forfeit(qm.getPlayer());
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(29501)).getCustomData() < 100) {
			qm.sendOk("It's not enough to be #b#eHorntail Slayer#n#k yet. Give it some more effort and come back. \r\n(Can only be registered when you are in 1st place.)");
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendOk("Make sure you have enough space in the Equip window of your Item Inventory.");
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(29501).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(1142007, 1);
			qm.dispose();
}
}