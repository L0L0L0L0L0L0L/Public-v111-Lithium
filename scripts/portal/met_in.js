/*
	名字:	工地
	地圖:	廢棄的工地
	描述:	103010100
*/

function enter(pi) {
	pi.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("MULUNG_TC"));
	pi.getPlayer().changeMap(pi.getMap(910320000), pi.getMap(910320000).getPortal(2)); //廢棄的地鐵月台
	return true;
}