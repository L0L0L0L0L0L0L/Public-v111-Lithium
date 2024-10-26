/*
	名字:	再次取得蒙特鳩的披風
	地圖:	蒙特鳩協會
	描述:	261000010
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("If you don't want one, then that's fine. You are no longer recognized as a member of the Zenumist Society.");
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
		qm.sendAcceptDecline("Hmm? Aren't you the alchemist that have recently joined the Zenumist Society? Where's your Zenumist Cape...? Oh, you lost it. The cape represents the proud tradition of the Zenumist Society. Have you lost your mind? This has made me feel very uncomfortable. I do not wish to give you another cape, but... there's nothing I can do. Do you want another one?");
		break;
	case 1:
		qm.sendNext("I will give you one more chance. If you wish to make the Zenumist Cape, then I need #b10 Leathers#k and #b10,000 mesos#k as a service charge for the person responsible for making the cape.");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(3305).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}