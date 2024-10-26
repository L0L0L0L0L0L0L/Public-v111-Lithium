/*
	名字:	危機的菇菇國王
	地圖:	瑞恩村
	描述:	140000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendOk("Hmm, this is really urgent. Please let me know if you change your mind.");
		qm.dispose();
		return;
		}
		if (status > 2) {
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
		qm.sendAcceptDecline("You were successful in passing the job advancement test. That's great, I just received a request from outside for help, so I was looking for the right person. Do you think you can help?");
		break;
	case 1:
		qm.sendNext("The #bMushking Empire#k seems to be facing a major crisis. Mushking Empire is a mushroom kingdom located near Henesys that is ruled by Mushking, a king popular for his wisdom and desire for peace. But recently, the king fell ill and abdicated his throne to his one and only daughter, the #bPrincess Violetta#k, so that he could rest. However, some problems seem to have arisen.");
		break;
	case 2:
		qm.sendNextPrev("I'm not sure what has happened, but something dire seems to have occurred, so I think it's best that you go find out and help in any way you can. You, of all people, should be the most capable of saving the Mushking Empire. Here, I've written a #bRecommendation Letter#k on your behalf. Please take it and go to the Mushking Empire. You should go find the #bHead Security Officer#k. \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v4032375# #t4032375#");
		break;
	case 3:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your etc. inventory."));
			qm.dispose();
			return;
			}
			qm.gainItem(4032375, qm.getPlayer().itemQuantity(4032375) ? 0 : 1);
			Packages.server.quest.MapleQuest.getInstance(2310).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.sendYesNo("By the way, do you know where the Mushking Empire is located? It doesn't matter if you can get there on your own, but if you'd like I can send you straight to the entrance.");
			break;
	case 4:
		qm.sendNext("Okay, I'll send you to the Mushking Empire. Good luck!");
		break;
	case 5:
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
		Packages.server.quest.MapleQuest.getInstance(2310).forceComplete(qm.getPlayer(), qm.getNpc());
		Packages.server.quest.MapleQuest.getInstance(2311).forceStart(qm.getPlayer(), qm.getNpc(), 1);
		qm.gainItem(4032375, -1);
		qm.gainExp(1200);
		qm.dispose();
}
}