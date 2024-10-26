/*
	名字:	水世界
	地圖:	危險的洞穴
	描述:	230040410
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(230040420), pi.getMap(230040420).getPortal(2)); //海怒斯洞穴
	return true;
}