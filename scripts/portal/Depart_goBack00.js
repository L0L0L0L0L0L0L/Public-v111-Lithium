/*
	名字:	福爾摩沙
	地圖:	7層8層 C區域
	描述:	103040420
*/

function enter(pi) {
	var map = pi.getPlayer().getMap().getId() - 10;
	pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(2));
	return true;
}