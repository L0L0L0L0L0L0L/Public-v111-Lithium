/*
	名字:	黑色傳送點
	地圖:	隱藏著的入口
	描述:	310040110
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
		cm.sendNext("Deactivates the Secret Portal.");
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
		cm.sendYesNo("Activates the Black Wings Secret Portal. Consumes 1 Black Token to teleport you to Victoria Island. Would you like to teleport to Victoria Island?");
		break;
	case 1:
		if (cm.getPlayer().itemQuantity(4032766) < 1) {
			cm.sendNext("The portal will not activate without a Black Wings Token. Please talk to Harry Lion.");
			cm.dispose();
			return;
			}
			cm.dispose();
			cm.gainItem(4032766, -1);
			cm.getPlayer().changeMap(cm.getMap(104020000), cm.getMap(104020000).getPortal(0));
}
}