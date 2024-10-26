/*
	名字:	猶他家
	地圖:	前院
	描述:	100030102
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(100030200), pi.getMap(100030200).getPortal(2)); //小路
	return true;
}