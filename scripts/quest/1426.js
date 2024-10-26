/*
	名字:	槍手之路
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
		qm.sendNext("Taking on the path of the Gunslinger, are we? You must enjoy using #bguns#k to blast enemies from a distance. Gun skills are flashier than bow skills, but they're much harder to use. They're lots of fun, though!");
		break;
	case 1:
		qm.sendNextPrev("Gunslingers really have to focus on their #bGun Mastery#k and #bGun Booster#k skills to boost firing speed and accuracy.");
		break;
	case 2:
		qm.sendNextPrev("The real fun comes with their attack skills. You can take down multiple enemies with #bRapid Blast#k, tear up one enemy with #bTriple Fire#k, or blast yourself to safety with #bRecoil Shot#k.");
		break;
	case 3:
		qm.sendNextPrev("You can even use #bWings#k to leap into the air. Holding down the skill key will allow you to glide down slowly, and you can fire your weapon as you descend. The important thing is to use the right skill at the right time.");
		break;
	case 4:
		qm.sendNextPrev("I bet your trigger finger is getting itchy. It's time for your Gunslinger test! Enter the test site, eliminate all the monsters, and bring back the #ritems they drop#k. It's going to be a fight, I'll guarantee you that much.");
		break;
	case 5:
		qm.sendAcceptDecline("If you run out of potions in the middle of the test, you'll have to #bforfeit the quest and restart#k. If you think you're all set, let me know. I'll send you over to the test site.");
		break;
	case 6:
		Packages.server.quest.MapleQuest.getInstance(1426).forceStart(qm.getPlayer(), qm.getNpc(), null);
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
		qm.sendYesNo("I see you got the Dark Marble. Nicely done. I think you have the combat skills to make a fine Gunslinger. ln fact, I'll make you into a Gunslinger right now!");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1426))).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your equip. inventory."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(1426).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(520);
			qm.removeAll(4031013);
			qm.gainItem(1142108, 1);
			}
			qm.sendNext("Okay! From now on, you are a #bGunslinger#k. Gun your enemies down at long range, and make every shot count. To become even stronger, you must devote yourself to training. I'll help you, if you ever need it.");
			break;
	case 2:
		qm.sendPrev("A Gunslinger must be strong, but it's not right to use that strength on the weak. Using your power for good... That's even more difficult than becoming stronger.");
		break;
	case 3:
		qm.dispose();
}
}