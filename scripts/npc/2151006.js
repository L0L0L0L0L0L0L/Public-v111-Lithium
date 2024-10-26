/*
	名字:	威德琳
	地圖:	訓練房入口
	描述:	310010010
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case - 1:
		cm.dispose();
		return;
	case 0:
		if (status < 1) {
		cm.sendNext("So you don't need treatment?");
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
		cm.sendYesNo("Are you hurt? Allow me to treat you. Treatment is always free for members of the Resistance.");
		break;
	case 1:
		cm.getPlayer().getStat().heal(cm.getPlayer());
		cm.sendOk("There you go. You're fully healed.");
		break;
	case 2:
		cm.dispose();
}
}