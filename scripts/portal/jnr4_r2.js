/*
	名字:	隱藏地圖
	地圖:	研究室走廊
	描述:	926110300
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(926110302), pi.getMap(926110302).getPortal(2)); //研究室102號
	return true;
}