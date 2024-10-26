/*
	名字:	結冰的精靈森林
	地圖:	發光的洞穴之路
	描述:	910150002
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(910150003), pi.getMap(910150003).getPortal(1)); //盛開的森林
	return true;
}