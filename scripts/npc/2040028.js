/*
	名字:	玩具士兵-馬克
	地圖:	玩偶之家
	描述:	922000010
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
		if (status < 1) {
		cm.dispose();
		return;
		}
		if (status < 2) {
		cm.sendNext("I knew you'd stay. It's important that you finish what you've started! Now please go locate the different-looking dollhouse, break it, and bring #bPendulum#k to me!");
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
		reactor = 'action' + (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3230)).getStatus() != 1 ? 2 : cm.getPlayer().itemQuantity(4031094) ? 1 : 0);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Hello, there. I'm #b#p2040028##k, in charge of protecting this room. Inside, you'll see a bunch of dollhouses, and you may find one that looks a little bit different from the others. Your job is to locate it, break its door, and find the #bPendulum#k, which is an integral part of the Ludibrium Clocktower. You'll have a time limit on this, and if you break the wrong dollhouse, you'll be forced back outside, so please be careful. \r\n#L0##bI want to get out of here.#l");
		break;
	case 1:
		cm.sendYesNo("Are you sure you want to give up now? Alright then... but please remember that the next time you visit this place, the dollhouses will switch places, and you'll have to look through each and every one of them carefully again. What do you think? Would you still like to leave this place?");
		break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(221023200), cm.getMap(221023200).getPortal(4));
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Oh wow, you did locate the different-looking dollhouse and find #bPendulum#k! That was just incredible!! With this, the Ludibrium Clocktower will be running again! Thank you for your work and here's a little reward for your effort.");
		break;
	case 1:
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3230)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(3230).forceComplete(cm.getPlayer(), cm.getNpc());
			cm.gainMeso(300000);
			cm.gainExp(173035);
			cm.gainItem(4031094, -1);
			}
			cm.sendNextPrev("Thank you so much for helping us out. The clocktower will be running again thanks to your heroic effort, the monsters from the other dimension seem to have disappeared, and #bOlson#k can now smile again, too. I'll let you out now. I'll see you around!");
			break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(221023200), cm.getMap(221023200).getPortal(4));
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("What the... we have been forbidding people from entering this room due to the fact that a monster from another dimension is hiding out here. l don't know how you got in here, but I'll have to ask you to leave immediately, for it's dangerous to be inside this room.");
		break;
	default:
		cm.getPlayer().changeMap(cm.getMap(221023200), cm.getMap(221023200).getPortal(4));
		cm.dispose();
}
}