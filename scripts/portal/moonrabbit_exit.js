/*
	名字:	隱藏地圖
	地圖:	月妙的年糕&amp;lt;離開地圖&gt;
	描述:	910010500
*/

function enter(pi) {
	var map = pi.getPlayer().getSavedLocation(Packages.server.maps.SavedLocationType.fromString("MULUNG_TC"));
	if (map < 0) map = 100000200;  //邱比特公園

	portal = pi.getMap(map).getPortal("unityPortal2") != null ? "unityPortal2" : pi.getMap(map).getPortal(3) != null ? 3 : 0;
	pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(portal));
	pi.getPlayer().clearSavedLocation(Packages.server.maps.SavedLocationType.fromString("MULUNG_TC"));
	return true;
}