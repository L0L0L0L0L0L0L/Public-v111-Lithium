/*
	名字:	請救出小孩2
	地圖:	死路森林
	描述:	914000300
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("*Sob* Aran has declined my request!");
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
		qm.sendAcceptDecline("*Sniff sniff* I was so scared... Please take me to Athena Pierce.");
		break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(21001).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(914000300), qm.getMap(914000300).getPortal(0));
		qm.gainItem(4001271, 1);
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
		qm.sendNext("What about the child? Please give me the child.");
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
		qm.sendYesNo("You made it back safely! What about the child?! Did you bring the child with you?!");
		break;
	case 1:
		qm.sendNextS("Oh, what a relief. I'm so glad...", 9);
		break;
	case 2:
		qm.sendNextPrevS("Hurry and board the ship! We don't have much time!", 3);
		break;
	case 3:
		qm.sendNextPrevS("We don't have any time to waste. The Black Mage's forces are getting closer and closer! We're doomed if we don't leave right this moment!", 9);
		break;
	case 4:
		qm.sendNextPrevS("Leave, now!", 3);
		break;
	case 5:
		qm.sendNextPrevS("Aran, please! I know you want to stay and fight the Black Mage, but it's too late! Leave it to the others and come to Victoria Island with us!", 9);
		break;
	case 6:
		qm.sendNextPrevS("No, I can't!", 3);
		break;
	case 7:
		qm.sendNextPrevS("Athena Pierce, why don't you leave for Victoria Island first? I promise I'll come for you later. I'll be alright. I must fight the Black Mage with the other heroes!", 3);
		break;
	case 8:
		qm.dispose();
		Packages.server.quest.MapleQuest.getInstance(21001).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().changeMap(qm.getMap(914090010), qm.getMap(914090010).getPortal(0));
		Packages.server.MapleInventoryManipulator.unequip(qm.getPlayer().getClient(), -11, qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNextFreeSlot());
		qm.gainItem(4001271, -1);
		qm.gainItem(1442079, -1);
}
}