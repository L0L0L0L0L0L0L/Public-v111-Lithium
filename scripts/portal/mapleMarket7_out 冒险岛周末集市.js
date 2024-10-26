/*
	名字:	楓葉市集
	地圖:	弓箭手村楓葉市集
	描述:	680100000
*/

function enter(pi) {
	var map = pi.getSavedLocation("EVENT");
	if (map < 0) map = 100000000;

	pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(0));
	return true;
}