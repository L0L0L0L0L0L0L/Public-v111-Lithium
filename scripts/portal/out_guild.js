/*
	名字:	天空之城
	地圖:	公會本部&amp;lt;英雄之殿&gt;
	描述:	200000301
*/

function enter(pi) {
	var map = pi.getPlayer().getSavedLocation(Packages.server.maps.SavedLocationType.fromString("CHRISTMAS"));
	if (map < 0) map = 200000300; //相遇之丘

	portal = map == 200000300 ? 11 : 0;
	pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(portal));
	pi.getPlayer().clearSavedLocation(Packages.server.maps.SavedLocationType.fromString("CHRISTMAS"));
	return true;
}