/*
	名字:	重新飼養提提阿那
	地圖:	奇裡督王台
	描述:	130010220
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 1) {
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
		qm.sendNext("You lost your Mimiana?! Geez, you have to be zealous for them, as they are a gift of the Empress to us! You have to be teached once again: The riding for Knights are a bit different from the rides available for regular folks. The takes place through a creature that is of the Mimi race that can be found on this island; they are called #bMimianas#k. Instead of riding monsters, the Knights ride Mimiana. There's one thing that you should never, ever forget.");
		break;
	case 1:
		qm.sendNextPrev("Don't think of this as just a form of mount or transportation. These mounts can be your friend, your comrade, your colleague... all of the above. Even a friend close enough to entrust your life! That's why the Knights of Ereve actually grow their own mounts.");
		break;
	case 2:
		qm.sendAcceptDecline("Now, here's a Mimiana egg. Are you ready to raise a Mimiana and have it as your traveling companion for the rest of its life?");
		break;
	case 3:
		if (qm.getPlayer().itemQuantity(4220137)) {
			qm.sendNext("I don't think you're ready. You need to realize that you're raising a companion, a friend that will stick by you for a long time. Please come more prepared the next time I see you.");
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.sendNext("Make up a room on your ETC tab so I can give you the Mimiana egg.");
			qm.dispose();
			return;
			}
			qm.gainItem(4220137, 1);
			qm.sendOk("Mimiana's egg can be raised by #bsharing your daily experiences with it#k. Once Mimiana fully grows up, please come see me. One more thing, I talked with #p2060005# beforehand and retrieved the #b#t4032117##k for you. The price to charge remains the same: #r10,000,000 mesos#k.");
			break;
	case 4:
		Packages.server.quest.MapleQuest.getInstance(20526).forceStart(qm.getPlayer(), qm.getNpc(), null);
		Packages.server.quest.MapleQuest.getInstance(20514).forceStart(qm.getPlayer(), qm.getNpc(), 0);
		qm.dispose();
}
}

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		qm.sendNext("Hey there! How's Mimiana's egg?");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20522)).getStatus() < 2) {
		if (!qm.getPlayer().itemQuantity(4220137)) {
			qm.sendNext("I see, you lost your egg... You need to be more careful when raising a baby Mimiana!");
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20514)).getCustomData() < 510000) {
			qm.sendNext("Hmmm... I don't think Mimiana has been fully awakened, yet. There's no need to rush here, though. Mimiana will grow as much as you grow.");
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getMeso() < 10000000) {
			qm.sendNext("Are you sure you have enough mesos?");
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendNext("Please, make a space on your EQUIP tab for your Mimiana!");
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(20526).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(4220137, -1);
			qm.gainItem(1902005, 1);
			qm.gainMeso(-10000000);
			}
			qm.sendNextPrev("Okay, you now may mount Mimiana again. Take good care of it this time.");
			break;
	case 2:
		qm.dispose();
}
}