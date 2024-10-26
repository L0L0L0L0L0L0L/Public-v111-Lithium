/*
	名字:	傀儡的邀請
	地圖:	傀儡師洞窟
	描述:	910510200
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 1) {
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
		qm.sendNextS("Aren't you the one that used to be in #m101000000# until not too long ago? I finally found you! Do you know how long it took for me to finally find you?", 8);
		break;
	case 1:
		qm.sendNextPrevS("Who are you?", 2);
		break;
	case 2:
		qm.sendAcceptDecline("Me? If you want to know, stop by my cave. I'll even send you an invitation. You'll be directly sent to my cave as soon as you accept. Look forward to seeing you there.");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(21719).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(910510200), qm.getMap(910510200).getPortal(0));
		qm.dispose();
}
}