/*
	名字:	黑暗耶雷弗
	地圖:	耶雷弗岔路
	描述:	271000300
*/

function enter(pi) {
	var map = pi.getPlayer().itemQuantity(4032922) ? 271030000 : 271030010; //要塞入口
	pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(1));
	return true;
}