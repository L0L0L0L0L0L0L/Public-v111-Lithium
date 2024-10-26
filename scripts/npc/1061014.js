/*
	名字:	武英
	地圖:	神殿底層
	描述:	105100100
*/

/*
	名字:	麥吉
	地圖:	勇士之村
	描述:	102000000
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
		cm.sendNext("");
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
		if (cm.getPlayer().getLevel() < 65) {
			cm.sendOk("The Balrog imprisoned here is incredibly dangerous. Only a fearsome warrior can join the #e<Boss: Balrog>#n expedition. \r\nYou must be above Lv. 65 to join.");
			cm.dispose();
			return;
			}
			cm.sendYesNo("You can only enter in a party. Would you like me to setone up for you?");
			break;
	case 1:
		cm.sendNext("");
		break;
	case 2:
		if (cm.getPlayer().getMeso() < 10000) {
			cm.sendNext("You don't have enough Mesos. How dare you even dream of participating without the right amount of Mesos?! Scram!");
			cm.dispose();
			return;
			}
			cm.dispose();
			cm.getPlayer().changeMap(cm.getMap(105100100), cm.getMap(105100100).getPortal(0));
}
}