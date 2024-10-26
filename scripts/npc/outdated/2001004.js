/*
	名字:	圍巾雪人
	地圖:	月光森林
	描述:	209000001
*/

function start() {
	cm.sendYesNo("你準備好離開#b#m" + cm.getMapId() + "##k了嗎？");
}

function action(mode, type, selection) {
	if (mode == 1)
		cm.warp(209000000, 3);
		cm.dispose();
}