/*
	名字:	飛向天際
	地圖:	104000000
	描述:	維多利亞港
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 1) {
		qm.sendOk("Oh, come on! I KNOW you're interested! Just admit it.");
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
		qm.sendNext("Hello, Explorer. I have something to tell you.");
		break;
	case 1:
		qm.sendNextPrev("The sky is so clear today! Ahh, I feel like I could just fly away. Wouldn't it be nice to soar through the sky?");
		break;
	case 2:
		qm.sendYesNo("I think you know how I feel. Heh. Now, what would you say if I told you that there IS a way to fly? Interested?");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(2559).forceStart(qm.getPlayer(), qm.getNpc(), null);
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
		qm.sendNext("Oh, did the Maple Administrator send you? Interested in an airplane?");
		break;
	case 1:
		qm.sendNextPrev("You... You don't know what an airplane is? Well, I guess it is a little new. It's, er, a bit like the mounts that you have, but can take you long distances, like to other continents.");
		break;
	case 2:
		qm.sendNextPrev("'Course you can't fly to any continent. You can fly to #bVictoria Island, Ereve, Edelstein, Ludibrium, Ariant, Mu Lung, or Leafre#k from #bOrbis#k, using the airplane. You can also fly the opposite route, of course. Lastly, you can fly to #bVictoria Island#k from #bEdelstein#k, and vice-versa. These are the only locations you can take an airplane to...The others are a bit too dangerous yet...");
		break;
	case 3:
		qm.sendNextPrev("If you want to go somewhere using an airplane, talk to the various people running the Intercontinental flights like #bIsa the Station Guide#k at Orbis Station or #bCherry Cabin Crew#k at Station to Orbis.");
		break;
	case 4:
		qm.sendNextPrev("That's it. Any more questions?");
		break;
	case 5:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2559)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
			qm.sendOk("Your Inventory is full! Make some space so I can give you this.");
			qm.dispose();
			return;
			}
			qm.gainItem(2430249, 1);
			Packages.server.quest.MapleQuest.getInstance(2559).forceComplete(qm.getPlayer(), qm.getNpc());
			}
			qm.sendNextPrev("All right, then! Here, take this. It's a little gift for you.");
			break;
	case 6:
		qm.sendPrev("Enjoy the trip! I'll see you around.");
		break;
	case 7:
		qm.dispose();
}
}