/*
	名字:	天上之島克里塞
	地圖:	天天空之城公園
	描述:	200000200
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 2) {
		qm.sendNext("Is this a bad time? I really need you to come here...");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31000)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(31000).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("You're finally here. You have no idea how long I've been waiting for you...");
			break;
	case 1:
		qm.sendNextPrev("There is a floating island called Chryse in the sky of Orbis, full of well-meaning giants. \r\nBut some time ago, Chryse drifted away from us, and now we can't make contact with the island.\r\nl am sure something bad has happened... I would love to go look for the island, but as you can see, I can't really leave this place...");
		break;
	case 2:
		qm.sendNextPrev("I thought perhaps you could see if something has happened to Chryse. \r\nI will help you get there. Please don't forget to come back and tell me what's going on. Okay?");
		break;
	case 3:
		qm.sendYesNo("Are you ready? \r\nIt's going to be a long trip, so you should prepare well. I will send you now.");
		break;
	case 4:
		qm.sendNext("Great. I will send you now.");
		break;
	case 5:
		qm.dispose();
		qm.gainExp(1200);
		Packages.server.quest.MapleQuest.getInstance(31000).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().changeMap(qm.getMap(200100001), qm.getMap(200100001).getPortal(0));
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("Pressing the JUMP key allows you to fly to Chryse."));
}
}