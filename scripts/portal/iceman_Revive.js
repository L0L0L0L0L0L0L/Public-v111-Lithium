/*
	名字:	冰峰原野
	地圖:	932000400
	描述:	932000400
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(932000000), pi.getMap(932000000).getPortal(0)); //冰雪平原入口
	return true;
}