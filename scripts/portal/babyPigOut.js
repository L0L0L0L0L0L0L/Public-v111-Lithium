/*
	名字:	隱密之地
	地圖:	茂盛的森林
	描述:	900020110
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(100030300), pi.getMap(100030300).getPortal(2)); //農場中心地
	return true;
}