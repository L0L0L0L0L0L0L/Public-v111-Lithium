/*
	Name:	Jiaozi
	Map:	Maple Leaf Castle Outskirts
	Description:	800040000
*/

var cost = 10000;

function start() {
	if (cm.getPlayer().getMap().getId() == 800000000) {
		cm.sendYesNo("Greetings, would you like to visit the Sakura Ninja Castle? It will be a quick trip for #b" + cost + "#k mesos. Shall we go?");
	} else {
		cm.sendYesNo("Do you wish to return to the starting area?");
	}
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getPlayer().getMap().getId() == 800000000 && cm.getPlayer().getMeso() < cost) {
			cm.sendOk("Oh no! You don't have enough #b" + cost + "#k mesos. How can I assist you?");
			cm.dispose();
			return;
		}
		var targetMap = cm.getPlayer().getMap().getId() == 800000000 ? 800040000 : 800000000;
		cm.getPlayer().changeMap(cm.getMap(targetMap), cm.getMap(targetMap).getPortal(0));
		cm.gainMeso(cm.getPlayer().getMap().getId() == 800000000 ? -cost : 0);
	}
	cm.dispose();
}
