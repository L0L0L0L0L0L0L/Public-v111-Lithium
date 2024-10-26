/*
	名字:	猶他家
	地圖:	客廳
	描述:	100030101
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(100030102), pi.getMap(100030102).getPortal(2)); //前院
	return true;
}