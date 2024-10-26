/*
	名字:	潘姆之路
	地圖:	大路2
	描述:	100030320
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(100030400), pi.getMap(100030400).getPortal(1)); //農場入口
	return true;
}