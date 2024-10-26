/*
	名字:	伊培賀
	地圖:	寂靜的洞穴
	描述:	914100023
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
		status--;
		break;
	case 1:
		status++;
		break;
		}
		reactor = 'action' + (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0 ? 0 : 1);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22604)).getCustomData() == 0) {
			cm.sendNext("You seem to be a lot more powerful than I'd thought. I don't think you'll be able to take my subordinates, however.");
			cm.dispose();
			return;
			}
			cm.sendNextS("...?! Why are you still here? I thought I told you to leave!", 1);
			break;
	case 1:
		cm.sendNextPrevS("Hi... Hiver? What are you doing here? I mean, why... what are you trying to... Are you here to wake the sleeping dragon?", 3);
		break;
	case 2:
		cm.sendNextPrevS("Geez, what a pain... I'm sorry, but I'm going to have to get rid of you.", 1);
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(22604).forceStart(cm.getPlayer(), 0, 0);
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Whoa... I had no idea you were this strong. Oh well. I'II have to retreat for now. The next time I see you... I suppose you will be an enemy.");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(914100021), cm.getMap(914100021).getPortal(1));
		Packages.server.quest.MapleQuest.getInstance(22604).forceStart(cm.getPlayer(), 0, 1);
		cm.dispose();
}
}