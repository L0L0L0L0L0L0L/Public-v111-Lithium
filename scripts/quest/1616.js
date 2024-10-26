/*
	名字:	[十字獵人]雪麗的提議
	地圖:	補給品倉庫
	描述:	931050500
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 2) {
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
		qm.sendNextS("Hey! Look sharp!", 1);
		break;
	case 1:
		qm.sendNextPrevS("Starling! What are you trying to pull? Spiruna didn't have any gifts, and Crow's a big jerk!", 3);
		break;
	case 2:
		qm.sendNextPrevS("It wasn't a trick, it was a test! Ever since we met in the subway, I've been keeping an eye on you...", 1);
		break;
	case 3:
		qm.sendYesNo("I think you just might be good enough. I want you to join us.");
		break;
	case 4:
		Packages.server.quest.MapleQuest.getInstance(1616).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendOk("Find #bBastille#k in Edelstein. He'll fill you in. He's the dapper fellow with the puppy. Don't make me regret this!");
		break;
	case 5:
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
		qm.sendNext("I've been expecting you! Come, let's go somewhere where we can speak in private.");
		break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(1616).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().changeMap(qm.getMap(931050500), qm.getMap(931050500).getPortal(0));
		qm.gainExp(37425);
		qm.dispose();
}
}