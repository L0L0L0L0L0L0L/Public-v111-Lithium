/*
	名字:	調查武陵
	地圖:	特魯的情報商店
	描述:	104000004
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 1) {
		qm.sendNext("Whatever you're doing, the Black Wings are more important.");
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
		qm.sendNext("Have you been advancing your levels? I found an interesting piece of information about the Black Wings. This time, you'll have to travel quite a bit. Do you know a town called #b#m250000000##k? You'll have to head there.");
		break;
	case 1:
		qm.sendAcceptDecline("Apparently, #b#p2090004##k in #m250000000# somehow met with the Black Wings. I don't know the details. Please go and find out why the Black Wings contacted #p2090004# and what exactly happened between them.");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(21741).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendOk("#p2090004# is known to be curt, so you are going to have to remain patient while talking to him. Talk to him with the #bl heard you met the Shadow Knight of the Black Wings#k keyword.");
		break;
	case 3:
		qm.dispose();
}
}