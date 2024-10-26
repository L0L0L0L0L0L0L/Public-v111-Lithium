/*
	名字:	守護人 狼
	地圖:	冰雪平原
	描述:	140010200
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
	switch (status) {
	case 0:
		cm.sendNext("What is it? If you're here to waste my time, get lost.");
		break;
	case 1:
		if (!(cm.getPlayer().hasEquipped(1902016) || cm.getPlayer().itemQuantity(1902016))) {
			cm.dispose();
			return;
			}
			cm.sendNextPrev("Ohh, are you the one that the captain was talking about? In that case, come right in.");
			break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(140010210), cm.getMap(140010210).getPortal(1));
		cm.dispose();
}
}