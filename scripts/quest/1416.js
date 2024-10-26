/*
	名字:	巫師(冰， 雷)之路
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
		qm.sendNext("An Ice/Lightning Wizard is, as you might have guessed, a Magician who specializes in ice and lightning elemental magic.");
		break;
	case 1:
		qm.sendNextPrev("As a Wizard, you will unlock more advanced magic. #bMP Eater#k absorbs an enemy's MP, #bMeditation#k increases your party's magic power, #bTeleport#k allows you to warp through space, #bSlow#k lowers enemies' movement speed, and #bSpell Master#k and #bHigh Wisdom#k create a foundation for learning even greater spells.");
		break;
	case 2:
		qm.sendNextPrev("The Ice/Lightning Wizard's signature spells, however, are #bCold Beam#k, which fires powerful ice at the enemy, and #bThunder Bolt#k, which creates a magnetic field that rains lightning on 6 enemies.");
		break;
	case 3:
		qm.sendNextPrev("Of course, the fun of magic is in the using of it. If you're interested in becoming a Ice/Lightning Wizard. I have a test for you.");
		break;
	case 4:
		qm.sendAcceptDecline("The test is simple... Eliminate the monsters at the test site and return with #r30 Dark Marbles#k. If you're ready, I'll send you to the test site now.");
		break;
	case 5:
		Packages.server.quest.MapleQuest.getInstance(1416).forceStart(qm.getPlayer(), qm.getNpc(), null);
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
		qm.sendYesNo("These are the Dark Marbles... I knew you could do it. Are you prepared to become an Ice/Lightning Wizard?");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1416)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your equip. inventory."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(1416).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(220);
			qm.removeAll(4031013);
			qm.gainItem(1142108, 1);
			}
			qm.sendNext("From this day forth, you are an #bIce/Lightning Wizard#k! Shock and freeze evil until it can fight no more!");
			break;
	case 2:
		qm.sendPrev("A Wizard wields great power. Use that power wisely, and bring justice to this land that needs it so.");
		break;
	case 3:
		qm.dispose();
}
}