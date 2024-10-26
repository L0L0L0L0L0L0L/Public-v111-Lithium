/*
	名字:	珍奇之路
	地圖:	寶物倉庫入口
	描述:	390009999
*/

function enter(pi) {
	var map = pi.getPlayer().getSavedLocation(Packages.server.maps.SavedLocationType.fromString("RICHIE"));
	if (map < 0) map = 104000000; //維多利亞港

	pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(0));
	pi.getPlayer().clearSavedLocation(Packages.server.maps.SavedLocationType.fromString("RICHIE"));
	return true;
}