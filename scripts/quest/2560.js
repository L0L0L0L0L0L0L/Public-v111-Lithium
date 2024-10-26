/*
	名字:	救命恩人是隻猴子？
	地圖:	淺海地帶
	描述:	3000100
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 1) {
		qm.sendNext("Ook! Ook! (The monkey looks very dissatisfied.)");
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
		qm.sendNext("Ooook! Ook! Ook!");
		break;
	case 1:
		qm.sendNextPrevS("Well, that hit the spot, but... I still don't understand what happened. Where's the ship? Hey, do you know what happened to me?", 2);
		break;
	case 2:
		qm.sendAcceptDecline("Oook! (The monkey nods. Does he really know what's going on? Couldn't hurt to ask.)");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(2560).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}