/*
	名字:	危機的菇菇國王
	地圖:	秘密廣場
	描述:	310010000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendOk("Oh really? Well, this is very urgent, so please talk to me again if you change your mind.");
		qm.dispose();
		return;
		}
		if (status < 4) {
		qm.sendNext("Are you planning to walk all the way there? If so, please hurry. You can get to Mushking Empire #bby heading west from Ghost Mushroom Forest#k, where the Henesys Mushroom Forest ends. #b<Theme Dungeon: Mushroom Castle>#k is its entrance.");
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
		qm.sendAcceptDecline("#h0#, I know you're busy carrying out your Resistance missions, but could you spare me a moment? I received a request for help from outside, and I can't think of anyone better than you.");
		break;
	case 1:
		qm.sendNext("#bMushking Empire#k is in great danger right now. Their former Emperor is seriously ill...something terrible must have happened! Mushking Empire is located near Henesys. Please hurry!");
		break;
	case 2:
		qm.sendNextPrev("Unlike the Cygnus Knights, who declined Edelstein's help during a time of need, members of the Resistance cannot just stand back and watch others suffer. Please, go save the Mushking Empire from danger. Here is a recommendation letter.");
		break;
	case 3:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your etc. inventory."));
			qm.dispose();
			return;
			}
			qm.gainItem(4032375, qm.getPlayer().itemQuantity(4032375) ? 0 : 1);
			Packages.server.quest.MapleQuest.getInstance(2345).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.sendYesNo("Mushking Empire is near Henesys. If you select Yes, I'll send you to the Mushking Empire right away.");
			break;
	case 4:
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
		Packages.server.quest.MapleQuest.getInstance(2345).forceComplete(qm.getPlayer(), qm.getNpc());
		Packages.server.quest.MapleQuest.getInstance(2311).forceStart(qm.getPlayer(), qm.getNpc(), 1);
		qm.gainItem(4032375, -1);
		qm.gainExp(1200);
		qm.dispose();
}
}