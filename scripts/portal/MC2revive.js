/*
	名字:	怪物 擂台賽 2
	地圖:	擂台賽場地&amp;lt;復活之章&gt;
	描述:	980031200
*/

function enter(pi) {
	var map = pi.getPlayer().getMap().getId() - 100;
	pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(1));
	return true;
}