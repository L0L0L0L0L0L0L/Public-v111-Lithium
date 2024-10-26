/*
	名字:	黃金寺廟
	地圖:	黃金寺廟
	描述:	809060000
*/

function enter(pi) {
	var map = pi.getPlayer().getMap().getId() == 809060000 ? 809061000 : 950101000;
	pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(6));
	return true;
}