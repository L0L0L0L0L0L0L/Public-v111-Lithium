/*
	名字:	隱藏地圖
	地圖:	專業技術村 &amp;lt;梅斯特鎮&gt;
	描述:	910001000
*/

function enter(pi) {
	pi.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("FREE_MARKET"));
	pi.getPlayer().changeMap(pi.getMap(910000000), pi.getMap(910000000).getPortal(34));
	return true;
}