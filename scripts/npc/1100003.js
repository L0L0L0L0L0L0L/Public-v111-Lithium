/*
	名字:	奇里盧
	地圖:	天空渡口
	描述:	130000210
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
		return;
	case 0:
		if (status > 0) {
		cm.sendNext("You still have business in Ereve? Well, come again if you want to go to Victoria.");
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
		reactor = 'action' + (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20704)).getStatus() == 1 ? 1 : 0);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Would you like to leave #m130000000#? Then you came to the right place! This ship will take you to the #bSix Path Crossway#k on #bVictoria Island#k.");
		break;
	case 1:
		cm.sendYesNo("It will take about #b30 seconds#k to get to the #bSix Path Crossway#k on Victoria Island. The fee is #b1000#k Mesos. Are you ready to board?");
		break;
	case 2:
		if (cm.getPlayer().getMeso() < 1000) {
			cm.sendNext("Uh, it looks like you don't have money... The fee is #b1000#k Mesos... Check your inventory to see how much money you have...");
			cm.dispose();
			return;
			}
			cm.gainMeso(-1000);
			cm.getPlayer().changeMap(cm.getMap(200090031), cm.getMap(200090031).getPortal(0));
			cm.getPlayer().startMapTimeLimitTask(30, cm.getMap(104020120));
			cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Eh, hello... again. Do you want to leave Ereve and go somewhere else? If so you've come to the right place I operate a ferry that goes from Ereve to #bPort Road#k.");
		break;
	case 1:
		cm.sendYesNo("Oh, you're the knight that has been assigned to Henesys. Do you need to go to Victoria Island? You probably don't have much money yet...I'll let you ride for free this time, would you like to board the ferry now?");
		break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(200090031), cm.getMap(200090031).getPortal(0));
		cm.getPlayer().startMapTimeLimitTask(30, cm.getMap(104020120));
		cm.dispose();
}
}