/*
	名字:	东方神州
	地圖:	钓鱼场
	描述:	741000200
*/

function enter(pi) {
	returnmap = pi.getSavedLocation("FLORINA");
	if (map < 0) map = 250000000; //桃花仙境

	pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(0));
	pi.clearSavedLocation("FLORINA"); //刪除標記地圖
	return true;
}