/*
	名字:	海豚 計程車
	地圖:	水之都
	描述:	230000000
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
		cm.sendNext("Okay, next time.");
		cm.dispose();
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
		cm.sendSimple("Oceans are all connected to each other. Places you can't reach by foot can be easily reached oversea. How about taking #bDolphin Taxi#k with us today? \r\n\r\n#b" + (cm.getPlayer().getMap().getId() == 230000000 ? "" + "#L0#Go to the Sharp Unknown. (Towards Ludibrium/Korean Folk Town)#l\r\n#L1#Go to Herb Town.#l" : "#L1#Go to Acuariurm.#l") + "");
		break;
	case 1:
		cm.sendYesNo("The fare is " + (selection < 1 ? 1000 : 10000) + " mesos. Shall we go?");
		select = selection;
		break;
	case 2:
		if (cm.getPlayer().getMeso() < (select < 1 ? 1000 : 10000)) {
			cm.sendNext("You don't have enough mesos.");
			cm.dispose();
			return;
			}
			cm.dispose();
			cm.gainMeso(-(select < 1 ? 1000 : 10000));
			cm.getPlayer().changeMap(cm.getMap(select < 1 ? 230030200 : cm.getPlayer().getMap().getId() == 251000100 ? 230000000 : 251000100), cm.getMap(select < 1 ? 230030200 : cm.getPlayer().getMap().getId() == 251000100 ? 230000000 : 251000100).getPortal(select < 1 ? 2 : 0));
}
}