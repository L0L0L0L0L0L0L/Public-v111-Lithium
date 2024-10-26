/*
	名字:	飛行中
	地圖:	前往過去的神木村的路
	描述:	200090530
*/

function enter(pi) {
	pi.cancelItem(2210083); //恢复變龍
	pi.getPlayer().changeMap(pi.getMap(272010000), pi.getMap(272010000).getPortal(2)); //時間神殿迴廊1
	return true;
}