/*
	名字:	冰原雪域
	地圖:	邪摩斯的單人房
	描述:	211000002
*/

function enter(pi) {
	var map = pi.getPlayer().getSavedLocation(Packages.server.maps.SavedLocationType.fromString("MULUNG_TC"));
	if (map < 0) map = 211000001; //長老公館

	portal = pi.getMap(map).getPortal("unityPortal2") != null ? "unityPortal2" : pi.getMap(map).getPortal(3) != null ? 3 : 0;
	pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(portal));
	pi.getPlayer().clearSavedLocation(Packages.server.maps.SavedLocationType.fromString("MULUNG_TC"));
	return true;
}