/*
	名字:	自由市場
	地圖:	自由市場入口
	描述:	910000000
*/

var maps = [100000100, 220000000, 211000100, 102000000, 221000000, 200000000, 801000300, 240000000, 250000000, 251000000, 260000000, 222000000, 540000000, 120000100, 310000000, 550000000, 551000000, 140000000, 103050000, 541000000, 910001000, 600000000];

function enter(pi) {
	var map = pi.getPlayer().getSavedLocation(Packages.server.maps.SavedLocationType.fromString("FREE_MARKET"));
	map = map == -1 ? 104000000 : map == 100000000 ? map = 100000100 : map == 103000000 ? map = 103050000 : map;
	portal = map == 230000000 ? "market01" : map == 261000000 ? "market0" : map == 130000200 ? "st00" : 0;
	for (var i = 0; i < maps.length; i++)
	if (map == maps[i]) portal = "market00"
	pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(portal));
	return true;
}