/*
	名字:	噗洛
	地圖:	維多利亞港
	描述:	104000000
*/

function start() {
	cm.sendYesNo("Are you thinking about leaving Victoria Island and heading to our town? If you board this ship, I can take you to #bRien#k... But you must pay a #bfee of 800#k Mesos. Would you like to go to Rien? It'll take about a minute to get there.");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendNext("Hmm, you don't want to go? Suit yourself. It may be a bit rough on humans, but it's a great place for penguins...");
		break;
	case 1:
		if (cm.getPlayer().getMeso() < 800) {
			cm.sendNext("Hmm... Are you sure you have #b800#k Mesos? Check your Inventory and make sure you have enough. You must pay the fee or I can't let you get on.");
			cm.dispose();
			return;
			}
			cm.getPlayer().changeMap(cm.getMap(200090060), cm.getMap(200090060).getPortal(0));
			cm.getPlayer().startMapTimeLimitTask(60, cm.getMap(140020300));
			cm.gainMeso(-800);
			}
			cm.dispose();
}