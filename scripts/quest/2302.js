/*
	名字:	危機的菇菇國王
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
		if (status < 1) {
		qm.sendOk("Oh really? Well, this is very urgent, so please talk to me again if you change your mind.");
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
		qm.sendAcceptDecline("Now that you have made the job advancement, you look like you're ready to handle this. There is a favor I'd like to ask of you. Are you willing to help?");
		break;
	case 1:
		qm.sendNext("The #bMushking Empire#k seems to be facing a major crisis. Mushking Empire is a mushroom kingdom located near Henesys that is ruled by Mushking, a king popular for his wisdom and desire for peace. But recently, the king fell ill and abdicated his throne to his one and only daughter, the #bPrincess Violetta#k, so that he could rest. However, some problems seem to have arisen.");
		break;
	case 2:
		qm.sendNextPrev("I'm not certain what exactly has happened, but it seems that they are in a difficult situation. I think you should go find out and help them if you can. You, of all people, should be able to save the Mushking Empire from its travails. Here, I will give you a #bRecommendation Letter#k. Take it and hurry to the Mushking Empire. Go find the #bHead Security Officer#k. \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v4032375# #t4032375#");
		break;
	case 3:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your etc. inventory."));
			qm.dispose();
			return;
			}
			qm.gainItem(4032375, qm.getPlayer().itemQuantity(4032375) ? 0 : 1);
			Packages.server.quest.MapleQuest.getInstance(2302).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.sendYesNo("By the way, do you know how to get to the Mushking Empire? It's fine if you know how to get there alone. Otherwise, I can send you to the entrance directly.");
			break;
	case 4:
		qm.sendNext("Okay, I'll send you straight to the Mushking Castie. I wish you luck.");
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
		Packages.server.quest.MapleQuest.getInstance(2302).forceComplete(qm.getPlayer(), qm.getNpc());
		Packages.server.quest.MapleQuest.getInstance(2311).forceStart(qm.getPlayer(), qm.getNpc(), 1);
		qm.gainItem(4032375, -1);
		qm.gainExp(1200);
		qm.dispose();
}
}