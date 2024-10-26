/*
	名字:	邪摩斯的覺醒
	地圖:	邪摩斯的單人房
	描述:	211000002
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 2) {
		qm.sendNext("How dare you refuse me... You will regret it...");
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
		qm.sendNext("Hey, you're #b#h0##k, right? My name is #bShammos#k. I've called you here because I have a very important request. But first, I'm sure you have many questions about me.");
		break;
	case 1:
		qm.sendYesNo("As you can see, I'm not human. I am part of the Hoblin race. At least that's what people tell me. Truth is, I don't really know who I am or why I'm trapped here. For some reason, I can't remember much of anything. It's so frustrating! I really need your help, yeah?");
		break;
	case 2:
		qm.sendNext("Please come see me now. As you may already know, I am in the #bbasement of the Chief's Residence in El Nath#k.");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(3116).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}