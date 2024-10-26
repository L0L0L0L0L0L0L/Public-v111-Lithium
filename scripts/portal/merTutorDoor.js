/*
	名字:	結冰的精靈森林
	地圖:	櫻花處
	描述:	910150001
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(910150002), pi.getMap(910150002).getPortal(2)); //發光的洞穴之路
	return false;
}