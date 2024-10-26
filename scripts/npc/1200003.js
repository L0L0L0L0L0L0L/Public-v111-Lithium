/*
	名字:	噗洛
	地圖:	企鵝港口
	描述:	140020300
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
		if (cm.getPlayer().itemQuantity(4032338)) {
		cm.sendNext("I suppose you have more things you need to take care of in Rien? Alright. I'll let you board the ship whenever you want with Lilin's letter, so just come find me again another time.");
		cm.dispose();
		return;
		}
		if (status > 0) {
		cm.sendNext("No sweat off my rear end. Come back and see me when you're ready for a trip!");
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
		reactor = 'action' + (cm.getPlayer().itemQuantity(4032338) ? 0 : 1);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Are you trying to leave Rien? Board this ship and I'll take you to #bLith Harbor#k in Victoria Island for a fee of 800 Mesos... Wait, isn't that a letter from Lilin?");
		break;
	case 1:
		cm.sendYesNo("With Lilin's letter, you can board the ship free of cost Would you like to head over to Lith Harbor right now? It'll take about a minute to get there.");
		break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(200090070), cm.getMap(200090070).getPortal(0));
		cm.getPlayer().startMapTimeLimitTask(60, cm.getMap(104000000));
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Are you trying to leave Rien? Board this ship and I'll take you to #bLith Harbor#k in Victoria Island for a fee of 800 Mesos...");
		break;
	case 1:
		cm.sendYesNo("Next stop, Lith Harbor! Hold your horses for about a minute.");
		break;
	case 2:
		if (cm.getPlayer().getMeso() > 800) {
			cm.getPlayer().changeMap(cm.getMap(200090070), cm.getMap(200090070).getPortal(0));
			cm.getPlayer().startMapTimeLimitTask(60, cm.getMap(104000000));
			cm.gainMeso(-800);
			cm.dispose();
			return;
			}
			cm.sendNext("Hmm... Make sure you have #b800#k Mesos. I can't take you if you don't pay the fee.");
			cm.dispose();
}
}