/*
	名字:	隱密之地
	地圖:	結束旅行
	描述:	950000000
*/

function enter(pi) {
	var returnMap = pi.getSavedLocation("MULUNG_TC");
	if (map < 0) map = 100000000;

	portal = map == 540000000 || map == 600000000 || map == 800000000 ? 3 : 0;
	pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(portal));
	pi.clearSavedLocation("MULUNG_TC");
	return true;
}