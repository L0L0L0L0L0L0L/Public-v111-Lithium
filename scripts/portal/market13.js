/*
	名字:	日落之路
	地圖:	瑪迦提亞城
	描述:	261000000
*/

function enter(pi) {
	pi.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("FREE_MARKET"));
	pi.getPlayer().changeMap(pi.getMap(910000000), pi.getMap(910000000).getPortal(34));
	return true;
}