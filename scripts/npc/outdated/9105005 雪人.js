/*
	名字:	雪人
	地圖:	幸福村入口
	描述:	889100000
*/

function start() {
	cm.sendYesNo("返回#b幸福村#k?");
}

function action(mode, type, selection) {
	if (mode == 1) {
		cm.warp(889100100);
		}
	cm.dispose();
}