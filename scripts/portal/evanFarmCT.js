/*
	名字:	潘姆之路
	地圖:	農場中心地
	描述:	100030300
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(100030310), pi.getMap(100030310).getPortal(3)); //大路1
	return true;
}