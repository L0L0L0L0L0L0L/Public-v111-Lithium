/*
	名字:	威廉的古堡
	地圖:	威廉公爵之墓
	描述:	990000700
*/

function enter(pi) {
	eim = pi.getPlayer().getEventInstance();
	var backPortals = [6, 8, 9, 11];
	var idx = eim.getProperty(pi.getPlayer().getName());

	pi.getPlayer().changeMap(pi.getMap(990000600), pi.getMap(990000600).getPortal(backPortals[idx])); //地下水路
	return true;
}