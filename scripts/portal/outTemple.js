/*
	名字:	時間之路
	地圖:	時間神殿
	描述:	270000100
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(200090510), pi.getMap(200090510).getPortal(11)); //前往米納爾森林之路
	pi.useItem(2210016); //變龍
	return true;
}