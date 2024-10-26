/*
	名字:	巫師(火， 毒)之路
	地圖:	魔法森林圖書館
	描述:	101000003
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 4) {
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
		qm.sendNext("A Fire/Poison Wizard is, as you might have guessed, a Magician who specializes in fire and poison elemental magic.");
		break;
	case 1:
		qm.sendNextPrev("Wizards learn many advanced magic spells. There's #bMP Eater#k, which absorbs enemy MP, #bMeditation#k, which increases your party's magic powers, and #bSpell Mastery#k and #bHigh Wisdom#k which are fundamental for learning more powerful spells.");
		break;
	case 2:
		qm.sendNextPrev("Fire/Poison Wizards rely on two main damage spells. #bFlame Orb#k launches a powerful projectile that burns enemies. #bPoison Breath#k coats enemies in a poison that drains their health.");
		break;
	case 3:
		qm.sendNextPrev("Some other useful skills include #bElemental Drain#k which increases your damage as you hit more enemies and #bIgnite#k which creates a wall of fire.");
		break;
	case 4:
		qm.sendNextPrev("Is that enough explanation for you? Magic spells are more fun when you try them out for yourself, anyway. Does this mean you're ready to be a Fire/Poison Wizard? If so, I'll test you to make sure.");
		break;
	case 5:
		qm.sendAcceptDecline("The test is simple... Eliminate the monsters at the test site and return with #r30 Dark Marbles#k. If you're ready, I'll send you to the test site now.");
		break;
	case 6:
		Packages.server.quest.MapleQuest.getInstance(1415).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(910140000), qm.getMap(910140000).getPortal(1));
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
		qm.sendYesNo("These are the Dark Marbles... I knew you could do it. Are you prepared to become a Fire/Polson Wizard?");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1415)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your equip. inventory."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(1415).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(210);
			qm.removeAll(4031013);
			qm.gainItem(1142108, 1);
			}
			qm.sendNext("From this day forth, you are a #bFire/Poison Wizard#k! Whenever you see evil, it is your duty to kill it with fire!");
			break;
	case 2:
		qm.sendPrev("A Wizard wields great power. Use that power wisely, and bring justice to this land that needs it so.");
		break;
	case 3:
		qm.dispose();
}
}