/*
	名字:	OSSS Researcher
	地圖:	BOSS戰
	描述:
*/

function start() {
	cm.sendYesNo("確定要離開#b#m" + cm.getPlayer().getMap().getId() + "##k嗎？");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getPlayer().changeMap(cm.getMap(980010000), cm.getMap(980010000).getPortal(0));
		cm.dispose();
}