/*
	名字:	僧侶之路
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
		qm.sendNext("You seek to follow the path of the Cleric? Unlike the other two Magician paths, Clerics specialize in #brecovery#k and #bsupport#k magic.");
		break;
	case 1:
		qm.sendNextPrev("As a Cleric, you will unlock more advanced magic. #bMP Eater#k absorbs an enemy's MP, #bMeditation#k increases your party's magic power, #bTeleport#k allows you to warp through space, #bSlow#k lowers enemies' movement speed, and #bSpell Mastery#k and #bHigh Wisdom#k create a foundation for learning even greater spells. Clerics also learn #bInvincible#k, decreasing the damage they take.");
		break;
	case 2:
		qm.sendNextPrev("The signature Cleric spell is #bHeal#k. This amazing spell heals not only your own HP, but your whole party's. And since you can also #bBless#k your party to increase their stats, you'll never have trouble finding others to adventure with.");
		break;
	case 3:
		qm.sendNextPrev("Clerics aren't all about healing, however. When necessary, they can launch a #bHoly Arrow#k to damage multiple enemies. It's especially effective against undead and devil monsters!");
		break;
	case 4:
		qm.sendNextPrev("Of course, the fun of magic is in the using of it. If you're interested in becoming a Cleric, I have a test for you.");
		break;
	case 5:
		qm.sendAcceptDecline("The test is simple... Eliminate the monsters at the test site and return with #r30 Dark Marbles#k. If you're ready, I'll send you to the test site now.");
		break;
	case 6:
		Packages.server.quest.MapleQuest.getInstance(1417).forceStart(qm.getPlayer(), qm.getNpc(), null);
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
		qm.sendYesNo("These are the Dark Marbles... I knew you could do it. Are you prepared to become a Cleric?");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1417)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your equip. inventory."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(1417).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(230);
			qm.removeAll(4031013);
			qm.gainItem(1142108, 1);
			}
			qm.sendNext("From this day forth, you are a #bCleric#k! Go forth and do good in the world!");
			break;
	case 2:
		qm.sendPrev("A Cleric is based with great faith. Use your faith to bring good into the world.");
		break;
	case 3:
		qm.dispose();
}
}