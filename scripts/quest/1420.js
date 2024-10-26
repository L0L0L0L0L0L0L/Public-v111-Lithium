/*
	名字:	弩弓箭手之路
	地圖:	弓箭手培訓中心
	描述:	100000201
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 6) {
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
		qm.sendNext("You really wish to become a Crossbowman? Crossbowmen utilize crossbows over bows. Though they attack slower, their single shots are more powerful and accurate than any other.");
		break;
	case 1:
		qm.sendNextPrev("Crossbowmen learn #bCrossbow Mastery#k, giving them greater control over their weapons. They also learn #bCrossbow Booster#k to fire arrows will quickly, and #bFinal Attack#k to hit with more power. And let's not forget #bPhysical Training#k, which allows you to fire arrows with even greater skill.");
		break;
	case 2:
		qm.sendNextPrev("The #bIron Arrow#k skill fires a powerful arrow that penetrates enemy defenses. They can also Summon the #bGolden Eagle#k to automatically attack enemies for a short time.");
		break;
	case 3:
		qm.sendNextPrev("Of course, Crossbowmen must always have arrows on hand. That is, unless you learn #bSoul Arrow#k, which lets you use the power of your soul to attack even without physical arrows.");
		break;
	case 4:
		qm.sendNextPrev("People used to say Crossbowmen were too slow, but with #bDouble Jump#k they can jump a second time while in the air, making them quite agile.");
		break;
	case 5:
		qm.sendNextPrev("The only way to truly understand is by becoming a Crossbowman. If you wish to discover this for yourself, I will test you to see you're ready.");
		break;
	case 6:
		qm.sendNextPrev("The test is simple. Go to the test site, eliminate the monsters there, and return with #r30 Dark Marbles#k. These monsters are tough, so be careful.");
		break;
	case 7:
		qm.sendAcceptDecline("If you run out of potions, you will have to #bforfeit the quest and restart#k, so make sure you're ready. Accept, and I'll send you to the test site right away.");
		break;
	case 8:
		Packages.server.quest.MapleQuest.getInstance(1420).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(910070000), qm.getMap(910070000).getPortal(1));
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
		qm.sendYesNo("Good. These are all the Dark Marbles you need. Are you prepared to become a Crossbowmen?");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1420)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your equip. inventory."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(1420).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(320);
			qm.removeAll(4031013);
			qm.gainItem(1142108, 1);
			}
			qm.sendNext("Well done, #bCrossbowmen#k. Wisdom is your greatest weapon, and with it you can pierce any defense.");
			break;
	case 2:
		qm.sendPrev("Crossbowmen must be strong, but you must never use that strength to harm the innocent. Work hard to become a hero of Maple World.");
		break;
	case 3:
		qm.dispose();
}
}