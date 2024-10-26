/*
	名字:	派溫所知道的事情
	地圖:	閒人勿入
	描述:	261020401
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 1) {
		qm.sendOk("Look, if you don't want to, that's your choice. I just can't tell you about that alchemist, that's all.");
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
		qm.sendNext("Oh, welcome! You've done a wonderful job of clearing up my little boredom problem. Now then, you wanted to know about that one alchemist, yes?");
		break;
	case 1:
		qm.sendNextPrev("Well, the thing about that is... He was never particularly memorable, you see. What I'm trying to say here is, well, I forgot.");
		break;
	case 2:
		qm.sendAcceptDecline("I suggest you just go and find that person yourself. See with your own eyes!");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(3320).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(926120200), qm.getMap(926120200).getPortal(0));
		qm.dispose();
}
}