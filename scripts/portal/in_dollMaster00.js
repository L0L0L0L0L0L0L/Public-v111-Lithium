/*
	名字:	龍族洞穴
	地圖:	冰冷的風
	描述:	105020200
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(910510500), pi.getMap(910510500).getPortal(1));
	return true;
}