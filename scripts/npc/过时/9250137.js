/*
	名字:	Bing Force
	地圖:	502029000
	描述:	502029000
*/

function start() {
	cm.sendYesNo("確定要離開#b#m" + cm.getMapId() + "##k嗎？");
}

function action(mode, type, selection) {
	if (mode == 1)
		cm.warp(100000000, 0);
		cm.dispose();
}