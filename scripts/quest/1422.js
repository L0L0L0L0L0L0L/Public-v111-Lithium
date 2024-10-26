/*
	名字:	刺客之路
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
		qm.sendNext("Have you chosen the path of the Assassin? It won't be easy. Assassins are the masters of throwing stars, attacking with quick bursts from afar. They are the true champions of 1-on-1 combat.");
		break;
	case 1:
		qm.sendNextPrev("Assassins first learn #bClaw Mastery#k and #bClaw Booster#k to become more dangerous with their throwing weapons. You can also pick up #bCritical Throw#k to perform a powerful blow.");
		break;
	case 2:
		qm.sendNextPrev("Already looking for new skills? That's the spirit! I would recommend #bGust Charm#k if you want to knock back enemies or #bShuriken Burst#k if you'd rather blast a batch of enemies with an explosive charge.");
		break;
	case 3:
		qm.sendNextPrev("I apologise if I keep rambling. I'm very excited by new Assassins! If you are prepared to take the next step, enter the test site, destroy the monsters, and bring back #r30 Dark Marbles#k. If you can defeat those beasts, you will have proven yourself ready to become an Assassin!");
		break;
	case 4:
		qm.sendAcceptDecline("If you run out of potions in the middle of the test, you must #bforfeit the quest and restart#k. Do you think you are ready? If so, I will send you to the test site.");
		break;
	case 5:
		Packages.server.quest.MapleQuest.getInstance(1422).forceStart(qm.getPlayer(), qm.getNpc(), null);
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
		qm.sendYesNo("You brought all of the Dark Marbles. Not bad! I think being an Assassin will suit you rather well. I will make you into an Assassin right now. Are you prepared?");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1422)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your equip. inventory."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(1422).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(410);
			qm.removeAll(4031013);
			qm.gainItem(1142108, 1);
			}
			qm.sendNext("Right, from now on, you are an #bAssassin#k. As an Assassin, lurk in the shadows and defeat your foes with the element of surprise. I hope that you will devote yourself to your training even more.");
			break;
	case 2:
		qm.sendPrev("An Assassin must be strong, but it's not right to use that strength on the weak. Using your power for good... That's ever more difficult than becoming stronger.");
		break;
	case 3:
		qm.dispose();
}
}