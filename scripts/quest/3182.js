

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("It's not that big a favor... Aren't you a selfish person! Tsk tsk...");
		qm.dispose();
		return;
		}
		if (status > 3) {
		qm.sendNext("Can you really put a price on saving a poor soul? In truth, you are partly to blame for his predicament. Well, come back to me if you change your mind.");
		qm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
		var reactor = 'action' + ((qm.getPlayer().itemQuantity(2430159) && qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3182)).getStatus() < 1) ? 2 : qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3182)).getForfeited() < 1 ? 1 : 3);
		eval(reactor)(mode, type, selection);
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendAcceptDecline("I've delivered #b#p2161004##k's letter to his family. Now, could you do me a favor?");
		break;
	case 1:
		qm.sendNext("The reason #p2161004#'s soul is suffering is because of the curse the Lion King put on #p2161004#. To lift the curse, you must break the link between the Lion King and #p2161004#...");
		break;
	case 2:
		qm.sendNextPrev("Take this Crystal. This Crystal contains my magic. Use it where #p2161004# is at to lift Lion King's curse from #p2161004#.");
		break;
	case 3:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
			qm.sendNext("I don't think you have enough room in your Inventory. Please check your Inventory again.");
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3182)).getStatus() < 1) {
			qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3182)).setStatus(1);
			qm.getPlayer().updateQuest(qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3182)), true);
			qm.gainItem(2430159, 1);
			}
			qm.sendNextPrev("I'll give you the Crystal for free this time, but remember that I need #r10 million mesos#k to make a new one. I'll also send you to the Lion King's Castle entrance, so hurry on over to #p2161004#.");
			break;
	case 4:
		qm.getPlayer().changeMap(qm.getMap(211060000), qm.getMap(211060000).getPortal(0));
		qm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendAcceptDecline("I've delivered #b#p2161004##k's letter to his family. Now, could you do me a favor?");
		break;
	case 1:
		qm.sendNext("The reason #p2161004#'s soul is suffering is because of the curse the Lion King put on #p2161004#. To lift the curse, you must break the link between the Lion King and #p2161004#...");
		break;
	case 2:
		qm.sendNextPrev("To lift Lion's King's curse, you need the Crystal that contains my magic. You do have the Crystal, don't you?");
		break;
	case 3:
		qm.sendNextPrev("Don't forget that you must use the Crystal in front of Murt to lift the Lion King's curse. Since 10 million mesos are needed to make a Crystal, don't come to me asking for a new one after losing it or using it in a weird place.");
		break;
	case 4:
		qm.sendNextPrev("Now hurry up and lift the Lion King's curse from Murt.");
		break;
	case 5:
		qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3182)).setStatus(1);
		qm.getPlayer().updateQuest(qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3182)), true);
		qm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendAcceptDecline("I've delivered #b#p2161004##k's letter to his family. Now, could you do me a favor?");
		break;
	case 1:
		qm.sendNext("The reason #p2161004#'s soul is suffering is because of the curse the Lion King put on #p2161004#. To lift the curse, you must break the link between the Lion King and #p2161004#...");
		break;
	case 2:
		qm.sendNextPrev("To lift Lion's King's curse, you need the Crystal that contains my magic. You do have the Crystal, don't you?");
		break;
	case 3:
		qm.sendNextPrev("You don't have the Crystal? Didn't you take the Crystal from me earlier? I told you not to lose it or use it in a weird place... tsk tsk...");
		break;
	case 4:
		qm.sendYesNo("I guess there's no choice. As I told you before, to make the Crystal, I need 10 million mesos. You wish to make one again?");
		break;
	case 5:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1 || qm.getPlayer().getMeso() < 10000000) {
			qm.sendOk("Maybe you don't have enough mesos or room in your Inventory? Please check again.");
			qm.dispose();
			return;
			}
			qm.gainMeso(-10000000);
			qm.gainItem(2430159, 1);
			qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3182)).setStatus(1);
			qm.getPlayer().updateQuest(qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3182)), true);
			qm.sendOk("Here you go. This time, please don't come back to me after losing it, or using it in a weird place. Now hurry up and lift the Lion King's curse from Murt.");
			break;
	case 6:
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
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		qm.sendYesNo("It's you... Did you deliver my letter to Alcaster?");
		break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(3182).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.gainExp(682200);
		qm.dispose();
}
}