/*
	名字:	霧之海
	地圖:	第5 作戰室
	描述:	923020114
*/

function enter(pi) {
	var map = pi.getPlayer().getMap().getId();
	pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(1));
	return true;
}