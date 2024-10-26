

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("Just wait a bit... You really are impatient.");
		qm.dispose();
		return;
		}
		if (type == 2) {
		qm.sendNext("I can make another if I have the materials. Come to me when you have them all.");
		qm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
		var reactor = 'action' + (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3192)).getForfeited() < 1 ? 1 : 2);
		eval(reactor)(mode, type, selection);
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendAcceptDecline("I guess this is the last time.");
		break;
	case 1:
		qm.sendNext("You brought all the materials. Give me a moment.");
		break;
	case 2:
		qm.sendNextPrev("Here's the Barrier Totem. Place in the Forest of Dead Trees IV where Lich appears to block its forbidden magic.");
		break;
	case 3:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3192)).getStatus() < 1) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
			qm.sendNext("I don't think you have room in your Inventory. Please check your Inventory again.");
			qm.dispose();
			return;
			}
			qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3192)).setStatus(1);
			qm.getPlayer().updateQuest(qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3192)), true);
			qm.gainItem(2430180, 1);
			}
			qm.sendNextPrev("I doubt it will matter, but you'll have to bring me the materials again if you lose this, so...don't lose it.");
			break;
	case 4:
		qm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendAcceptDecline("I guess this is the last time.");
		break;
	case 1:
		if (qm.getPlayer().itemQuantity(2430180) && qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3192)).getStatus() < 1) {
			qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3192)).setStatus(1);
			qm.getPlayer().updateQuest(qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3192)), true);
			qm.sendNext("Please place the Barrier Totem at the Forest of Dead Trees IV, where Lich appears. The totem will block its forbidden magic. You'll have to bring me the materials again if you lose this, so...don't lose it.");
			qm.dispose();
			return;
			}
			qm.sendNext("What happened to the Barrier Totem I gave you earlier?");
			break;
	case 2:
		qm.sendNextPrev("Lost it? And after warning you...");
		break;
	case 3:
		qm.sendYesNo("I guess there's no choice. As I told you before, to make the Barrier Totem, I need a Red Contract Orb and a Bible of the Corrupt. Do you have what I need?");
		break;
	case 4:
		if (!qm.getPlayer().itemQuantity(4000633) || !qm.getPlayer().itemQuantity(4000336) || qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
			qm.sendOk("Maybe you don't have enough materials or room in your Inventory? Please check again.");
			qm.dispose();
			return;
			}
			qm.gainItem(4000633, -1);
			qm.gainItem(4000336, -1);
			qm.gainItem(2430180, 1);
			qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3192)).setStatus(1);
			qm.getPlayer().updateQuest(qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3192)), true);
			qm.sendOk("Here you go. Please place the Barrier Totem before the zombies attack the village again. You must place the Barrier Totem in the Forest of Dead Trees IV, where Lich appears.");
			break;
	case 5:
		qm.dispose();
}
}