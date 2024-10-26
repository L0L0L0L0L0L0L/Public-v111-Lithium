/*
	名字:	請擊倒薛西斯
	地圖:	克里塞基地
	描述:	200100010
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("Are we really ready?");
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
		qm.sendYesNo("It seems we are ready. What do you think? \r\nI think now is the best time... Could you like to eliminate #bXerxes#k?");
		break;
	case 1:
		qm.sendNext("I am scary little bit, but I believe we can do it. We will follow you so please you take the lead.");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(31013).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}