/*
	名字:	隱藏地圖
	地圖:	專業技術村 &amp;lt;梅斯特鎮&gt;
	描述:	910001000
*/

function enter(pi) {
	var map = pi.getPlayer().getSavedLocation(Packages.server.maps.SavedLocationType.fromString("ARDENTMILL"));
	if (map < 0) map = 101000000; //魔法森林

	pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal("profession"));
	return true;
}