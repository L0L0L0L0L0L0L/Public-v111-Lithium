

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("Isn't there anyone who can hear me...?");
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
		qm.sendAcceptDecline("Please... If there is anyone who can hear my voice... Listen. Even if it's just for a moment... Listen to what I have to say...");
		break;
	case 1:
		qm.sendNext("Can you hear me? Oh, what a relief! I was terrified that no one could hear me.");
		break;
	case 2:
		qm.sendNextPrev("My name is #b#p2161004##k. I came here looking for the legendary #bLion King's Medal#k. I was searching the entire castle for the medal, but then everything started shaking, and monsters appeared! I tried to run, when a man appeared in front of me out of nowhere.");
		break;
	case 3:
		qm.sendNextPrev("That man claimed that he was #bVon Leon the Lion King#k, the king of this castle. He then turned me into a ghost to trap me here...to punish me. It must be a curse or something. I can still feel my body...and it hurts a lot! I can't move much, and it even hurts to talk like this.");
		break;
	case 4:
		qm.sendNextPrev("I want to deliver this letter to my family. Could you take this letter to #bAlcaster#k in El Nath? Alcaster will then send it to my family.");
		break;
	case 5:
		qm.sendNextPrev("I'd been saving this scroll to get back one day, but I guess you can have it. Just get to #bEI Nath#k and give my letter to Alcaster!");
		break;
	case 6:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.sendNext("You got no room in your Etc tab!");
			qm.dispose();
			return;
			}
			qm.getPlayer().changeMap(qm.getMap(211000000), qm.getMap(211000000).getPortal(0));
			qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3181)).setStatus(1);
			qm.getPlayer().updateQuest(qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3181)), true);
			qm.gainItem(4032859, qm.getPlayer().itemQuantity(4032859) ? 0 : 1);
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
		qm.sendNext("Hm? A letter for me? From whom?");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21010)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(3181).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(4032859, -1);
			qm.gainExp(682200);
			}
			cm.sendNextPrev("Hmm, I knew this would happen. That fool...");
			break;
	case 2:
		cm.sendNextPrev("#p2161004# came by a few days ago on his way to the castle. I told him not to go after that Lion King Medal. There's been a foul wind coming off the castle lately. Does he listen to an old man? No! He goes out there at night!");
		break;
	case 3:
		cm.sendPrev("I sent a few locals to rescue him, but the monsters scared them off. I'll make sure to get this to his family.");
		break;
	case 4:
		qm.dispose();
}
}