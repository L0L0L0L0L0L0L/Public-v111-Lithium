/*
	名字:	飛行中
	地圖:	前往時間神殿之路
	描述:	200090520
*/

function enter(pi) {
	pi.cancelItem(2210083); //恢復變龍
	pi.getPlayer().changeMap(pi.getMap(272000600), pi.getMap(272000600).getPortal(0)); //燃燒的神木村6
	return true;
}