/*
	名字:	坍塌的石像
	地圖:	第5階段
	描述:	910530200
*/

function start() {
	cm.sendYesNo("Once I lay my hand on the statue, a strange light covers me and it feels like I am being sucked into somewhere else. Will it be okay to go back to #m105000000#?");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendNext("Once I took my hand off the statue it got quiet, as if nothing happened.");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(105000000), cm.getMap(105000000).getPortal(0));
		}
		cm.dispose();
}