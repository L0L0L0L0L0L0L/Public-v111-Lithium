/*
	名字:	鲁皮
	地圖:	幸福村
	描述:	209000000
*/

function start() {
	cm.sendYesNo("你準備好返回#b#m" + cm.getSavedLocation("HAPPYVILLE") + "##k了嗎？");
}

function action(mode, type, selection) {
	if (mode == 1) {
		var returnMap = cm.getSavedLocation("HAPPYVILLE");
		if (returnMap < 0) {
		returnMap = 230000000; // to fix people who entered the fm trough an unconventional way
		}
		cm.clearSavedLocation("HAPPYVILLE");
		cm.warp(returnMap, "unityPortal2");
		}
	cm.dispose();
}