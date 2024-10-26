/*
	名字:	打手之路
	地圖:	航海室
	描述:	120000101
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
		qm.sendNext("Ready to become a Brawler, are we? You're the kind of pirate that likes to beat down monsters with their fists. It may look flashy, but it's going to take a lot of dedication. Think you've got what it takes?");
		break;
	case 1:
		qm.sendNextPrev("Brawlers rely on their #bTornado Uppercut#k to blast their enemies into oblivion. #bCorkscrew Blow#k is another great standby, if you like dashing into the fray.");
		break;
	case 2:
		qm.sendNextPrev("Don't skip out on the basics just for fancy attacks. Learning #bKnuckle Mastery#k and #bKnuckle Booster#k will give you more speed and power when using a knuckle, and #bHP Boost#k will increase your HP and #bEndurance#k to make sure you always have MP.");
		break;
	case 3:
		qm.sendNextPrev("Don't forget #bDark Clarity#k either. The enhanced ATT and Accuracy you'll get will make you unstoppable.");
		break;
	case 4:
		qm.sendNextPrev("That's enough out of me. You've got a test to take. Get down to the test site, eliminate all the monsters there, and bring back the #ritems they drop#k. It's going to be a fight, I'll guarantee you that much.");
		break;
	case 5:
		qm.sendAcceptDecline("If you run out of potions in the middle of the test, you'll have to #bforfeit the quest and restart#k. If you think you're all set, let me know. I'll send you over to the test site.");
		break;
	case 6:
		Packages.server.quest.MapleQuest.getInstance(1425).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(912040000), qm.getMap(912040000).getPortal(1));
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
		qm.sendYesNo("I see you got the Dark Marble. Nicely done. I think you have the combat skills to make a fine Brawler. In fact, I'll make you into a Brawler right now!");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1425)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your equip. inventory."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(1425).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(510);
			qm.removeAll(4031013);
			qm.gainItem(1142108, 1);
			}
			qm.sendNext("There you go. From now on, you are a #bBrawler#k. I expect you to overwhelm your enemies with your body and bare fists. Because of this, you will have to focus on training more than others. Let me know if you ever need help.");
			break;
	case 2:
		qm.sendNextPrev("I improved your Master of Organization skill. Check out how spacious your Inventory is now!");
		break;
	case 3:
		qm.sendPrev("A Brawler must be strong, but it's not right to use that strength on the weak. Using your power for good... That's even more difficult than becoming stronger.");
		break;
	case 4:
		qm.dispose();
}
}