/*
	名字:	襲擊者2
	地圖:	受到攻擊的弓箭手村右側
	描述:	910080010
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 6) {
		qm.sendNext("There's no time to explain. We have to hurry!");
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
		qm.sendNext("I felt like the Black Wings were watching me, but they've never attacked directly... Perhaps, they found out that I was trying to take out the #bMistelteinn#k...");
		break;
	case 1:
		qm.sendNextPrevS("Mistelteinn? You mean you still have it?", 2);
		break;
	case 2:
		qm.sendNextPrev("Of course! I know you ordered me to hold onto it so I wouldn't follow you into battle, but it was still an order from my sovereign. I've kept it safe all these centuries...");
		break;
	case 3:
		qm.sendNextPrevS("But why did they attack me, and not you?", 2);
		break;
	case 4:
		qm.sendNextPrev("The Black Wings have a person #rwho can transform into anyone they want#k. Perhaps they wanted to replace you and steal the Mistelteinn, Your Highness.");
		break;
	case 5:
		qm.sendNextPrevS("Such a frightening ability...", 2);
		break;
	case 6:
		qm.sendNextPrev("Yes. That's what makes them so dangerous. Hold on... Could they have been listening to us? If so, they may already know about #m101050000#! Your Highness, we must protect the village!");
		break;
	case 7:
		qm.sendAcceptDecline("Since they couldn't take my place, they might #battack #m101050000#k! I'll use my magic to return there right away!");
		break;
	case 8:
		if (qm.getMap(910150220).getCharacters().size() < 1) {
			Packages.server.quest.MapleQuest.getInstance(24072).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.getMap(910150220).resetFully();
			qm.getPlayer().changeMap(qm.getMap(910150220), qm.getMap(910150220).getPortal(0));
			qm.getPlayer().startMapTimeLimitTask(600, qm.getMap(101050100));
			qm.dispose();
			return;
			}
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "This Story Quest is too busy at the moment. Please try again later."));
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Please try again in a moment, or change channels and try again."));
			qm.dispose();
}
}