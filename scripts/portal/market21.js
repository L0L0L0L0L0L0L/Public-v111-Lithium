/*
	名字:	馬來西亞
	地圖:	鄉村鎮
	描述:	551000000
*/

function enter(pi) {
	pi.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("FREE_MARKET"));
	pi.getPlayer().changeMap(pi.getMap(910000000), pi.getMap(910000000).getPortal(34));
	return true;
}