/*
	名字:	墮落廣場
	地圖:	墮落廣場站
	描述:	103020020
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(103020000), pi.getMap(103020000).getPortal(2)); //地鐵售票處
	return true;
}