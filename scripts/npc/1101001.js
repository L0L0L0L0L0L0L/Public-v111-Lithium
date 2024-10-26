/*
	名字:	神獸
	地圖:	耶雷弗
	描述:	130000000
*/

function start() {
	if (cm.getPlayer().getJob() >= 1000 && cm.getPlayer().getJob() < 2000) cm.useItem(2022458);
		cm.sendOk("To become stronger, for Maple World...");
		cm.dispose();
}