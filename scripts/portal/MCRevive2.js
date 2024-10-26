/*
	名字:	怪物擂台賽
	地圖:	擂台賽場地2&amp;lt;復活之章&gt;
	描述:	980000202
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(980000201), pi.getMap(980000201).getPortal(0)); //擂台賽場地2&amp;lt;戰場&gt;
	return true;
}