/*
	名字:	危機的菇菇國王
	地圖:	精靈遊俠
	描述:	310010000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 1 || status == 5) {
		qm.sendNext("Consider this a request being made from the entire Mushroom Kingdom to the entire Elven race.");
		qm.dispose();
		return;
		}
		if (status == 6) {
		qm.sendNext("Are you planning to walk all the way there? If so, please hurry. You can get to Mushking Empire by heading west from Ghost Mushroom Forest, where the Henesys Mushroom Forest ends. <Theme Dungeon: Mushroom Castle> is its entrance.");
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
		qm.sendNext("Welcome, your Highness! Yes, I have heard the rumors about you. I am the Secretary of Domestic Affairs for the Mushroom Kingdom. It is my great privilege to stand here before you.");
		break;
	case 1:
		qm.sendAcceptDecline("I humbly apologize for such a sudden request, but I fear we are in dire need of help...");
		break;
	case 2:
		qm.sendNext("A great disaster has befallen the #bMushking Empire#k. While our long-suffering king was resting from his illness, filthy traitors took over the whole of the Mushking Empire!");
		break;
	case 3:
		qm.sendNextPrev("We wish to drive them out, but those traitors allied with the powerful Yetis, leaving us powerless to stop them. This is why we humbly beg for your help, your majesty...");
		break;
	case 4:
		qm.sendNextPrevS("(l have every desire to help them, but... My powers are still incomplete. I don't think I could help them as much as they need. Maybe I should just explain this for now.)", 2);
		break;
	case 5:
		qm.sendYesNo("Your Majesty is so very humble... In that case, perhaps you would be willing to help us not as a ruler, but as an adventurer? We could grant you this letter of recommendation in return.");
		break;
	case 6:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your etc. inventory."));
			qm.dispose();
			return;
			}
			qm.gainItem(4032375, qm.getPlayer().itemQuantity(4032375) ? 0 : 1);
			Packages.server.quest.MapleQuest.getInstance(2346).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.sendYesNo("The Mushking Empire is near Henesys. if you select Yes, I'll send you to the Mushking Empire right away.");
			break;
	case 7:
		qm.dispose();
		qm.getPlayer().changeMap(qm.getMap(106020001), qm.getMap(106020001).getPortal(0));
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
		qm.sendNext("Huh? Recommendation Letter from a job instructor! What's this? You're the one sent here to save our Mushking Kingdom?");
		break;
	case 1:
		qm.sendNextPrevS("Y...Yesss?", 3);
		break;
	case 2:
		qm.sendNextPrev("Hmm, I see. Well, if a job instructor recommended you, I will put my trust in you as well. I apologize for my late introduction. I am the #bHead Security Officer#k in charge of the royal family's security. As you can see, I am currently in charge of security over this temporary housing and the key figures inside. We're not in the best of situations, but nevertheless, let me welcome you to the Mushking Empire.");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(2346).forceComplete(qm.getPlayer(), qm.getNpc());
		Packages.server.quest.MapleQuest.getInstance(2311).forceStart(qm.getPlayer(), qm.getNpc(), 1);
		qm.gainItem(4032375, -1);
		qm.gainExp(1200);
		qm.dispose();
}
}