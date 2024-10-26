/*
	名字:	長相神奇的石像
	地圖:	傀儡師秘密通路
	描述:	910510100
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
		cm.sendNext("Please talk to me after you've finished taking care of everything.");
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
		cm.sendYesNo("Welcome, Master Francis. Would you like to be sent to your cave?");
		break;
	case 1:
		cm.sendOk("Take care of yourself, master Francis.");
		break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(101040311), cm.getMap(101040311).getPortal(2)); //傀儡師的避難所
		cm.dispose();
}
}