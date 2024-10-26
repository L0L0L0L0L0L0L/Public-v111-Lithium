/*
	名字:	隱藏地圖
	地圖:	卡帕萊特祕密之室
	描述:	261000021
*/

function enter(pi) {
	var map = pi.getPlayer().getSavedLocation(Packages.server.maps.SavedLocationType.fromString("MULUNG_TC"));
	if (map < 0) map = 261000020; //卡帕萊特協會

	portal = map == 261000020 ? 2 : pi.getMap(map).getPortal("unityPortal2") != null ? "unityPortal2" : pi.getMap(map).getPortal(3) != null ? 3 : 0;
	pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(portal));
	pi.getPlayer().clearSavedLocation(Packages.server.maps.SavedLocationType.fromString("MULUNG_TC"));
	return true;
}