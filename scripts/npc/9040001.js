/*
	Name: Nurris
	Map: Resurrection Corridor
	Description: 990001100
*/

var item = [1032033, 4001024, 4001025, 4001026, 4001027, 4001028, 4001029, 4001030, 4001031, 4001032, 4001033, 4001034, 4001035, 4001037];

function start() {
	if (cm.getPlayer().hasEquipped(1032033)) {
		cm.sendOk("To protect the castle's secrets, please remove the equipped #b#z1032033##k before leaving.");
		cm.dispose();
		return;
	}
	cm.sendYesNo("It seems that your guild quest has ended. Are you ready to leave #b#m" + cm.getPlayer().getMap().getId() + "##k?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		for (var i = 0; i < item.length; i++)
			cm.removeAll(item[i]);
		cm.getPlayer().changeMap(cm.getMap(102040200), cm.getMap(102040200).getPortal(0));
	}
	cm.dispose();
}
