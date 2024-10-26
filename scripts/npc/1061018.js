/*
	名字:	武英
	地圖:	巴羅古的墳墓
	描述:	105100300
*/

function start() {
	cm.sendYesNo("Would you like to forfeit and exit?");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendNext("Try a bit harder.");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(105100100), cm.getMap(105100100).getPortal(0));
		}
		cm.dispose();
}