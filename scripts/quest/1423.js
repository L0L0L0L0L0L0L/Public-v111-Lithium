/*
	名字:	俠盜之路
	地圖:	墮落城市酒吧
	描述:	103000003
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 3) {
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
		qm.sendNext("More of the Bandit type, are we? Bandits mainly use daggers to perforate their enemies swiftly and at short distance. They are the truest thieves of all.");
		break;
	case 1:
		qm.sendNextPrev("Bandits boost their dagger proficiency and speed with #bDagger Mastery#k and #bDagger Booster#k. Afterwards, they use #bSteal#k to damage and steal from multiple enemies, or go for #bSavage Blow#k to perform consecutive attacks on single foe.");
		break;
	case 2:
		qm.sendNextPrev("They can also use #bMeso Guard#k and #bShield Mastery#k to avoid danger during melee combat, and #bChannel Karma#k to maximize their attack power.");
		break;
	case 3:
		qm.sendNextPrev("Look at me talking up a storm again! Are you prepared to become a Bandit? If so, you'll have to take a test. If you are brave enough, enter the test site, eliminate the monsters there, and bring back #b30 Dark Marbles#k. If you can defeat those beasts, you will have proven yourself ready to become a Bandit!");
		break;
	case 4:
		qm.sendAcceptDecline("If you run out of potions in the middle of the test, you must #bforfeit the quest and restart#k. Do you think you are ready? If so, I will send you to the test site.");
		break;
	case 5:
		Packages.server.quest.MapleQuest.getInstance(1423).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(910370000), qm.getMap(910370000).getPortal(1));
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
		qm.sendYesNo("You brought all of the Dark Marbles. Not bad! I think being a Bandit will suit you rather well. I will make you into a Bandit right now. Are you prepared?");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1423)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your equip. inventory."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(1423).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(420);
			qm.removeAll(4031013);
			qm.gainItem(1142108, 1);
			}
			qm.sendNext("Right, from now on, you are a #bBandit#k. As a Bandit, use your speed and cunning to cut down your foes with your blade. I hope that you will devote yourself to your training even more.");
			break;
	case 2:
		qm.sendPrev("A Bandit must be strong, but it's not right to use that strength on the weak. Using your power for good... That's even more difficult than becoming stronger.");
		break;
	case 3:
		qm.dispose();
}
}