/*
	名字:	駱駝計程車
	地圖:	納希北門外
	描述:	260020000
*/

function start() {
	cm.sendYesNo("Would you like to take the #b#p2110005##k to #b" + (cm.getPlayer().getMap().getId() == 260020700 ? "#m260000000#" : "#m261000000#") + "#k, the " + (cm.getPlayer().getMap().getId() == 260020700 ? "Oasis town" : "town of Alchemy") + "? The fare is #b1500 mesos#k.");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendNext("Take a moment to think about it, then talk to me when you're ready.");
		break;
	case 1:
		if (cm.getPlayer().getMeso() < 1500) {
			cm.sendNext("You don't have enough mesos.");
			cm.dispose();
			return;
			}
			cm.getPlayer().changeMap(cm.getMap(cm.getPlayer().getMap().getId() == 260020000 ? 261000000 : 260000000), cm.getMap(cm.getPlayer().getMap().getId() == 260020000 ? 261000000 : 260000000).getPortal(0));
			cm.gainMeso(-1500);
			}
			cm.dispose();
}