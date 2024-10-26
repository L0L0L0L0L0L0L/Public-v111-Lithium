/*
	名字:	瑞恩島
	地圖:	冰雪平原
	描述:	140010200
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(140030000), pi.getMap(140030000).getPortal(1)); //镜洞
	return true;
}