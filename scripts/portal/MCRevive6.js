/*
	名字:	怪物擂台賽
	地圖:	擂台賽場地6&amp;lt;復活之章&gt;
	描述:	980000602
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(980000601), pi.getMap(980000601).getPortal(0)); //嘉擂台賽場地6&amp;lt;戰場&gt;
	return true;
}