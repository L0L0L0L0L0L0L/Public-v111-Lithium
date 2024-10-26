/*
	名字:	結婚村莊
	地圖:	結婚小鎮
	描述:	680000000
*/

function enter(pi) {
	var map = pi.getPlayer().getSavedLocation(Packages.server.maps.SavedLocationType.fromString("AMORIA"));
	if (map < 0) map = 100000000;

	pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(0));
	return true;
}