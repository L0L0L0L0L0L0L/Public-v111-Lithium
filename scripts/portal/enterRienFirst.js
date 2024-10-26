/*
	名字:	瑞恩島
	地圖:	瑞恩西邊平原
	描述:	140010000
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(140000000), pi.getMap(140000000).getPortal(4)); //瑞恩村
	return true;
}