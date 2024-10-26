/*
	名字:	黑暗時間神殿
	地圖:	時間神殿迴廊1
	描述:	272010000
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(200090530), pi.getMap(200090530).getPortal(11)); //前往過去的神木村的路
	pi.useItem(2210083); //變龍
	return true;
}