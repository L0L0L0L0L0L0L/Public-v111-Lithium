/*
	名字:	天空之城
	地圖:	相遇之丘
	描述:	200000300
*/

function enter(pi) {
	pi.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("CHRISTMAS"));
	pi.getPlayer().changeMap(pi.getMap(200000301), pi.getMap(200000301).getPortal(2)); //公會本部&amp;lt;英雄之殿&gt;
	return true;
}