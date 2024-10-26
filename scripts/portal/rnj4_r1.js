/*
	名字:	隱藏地圖
	地圖:	研究室走廊
	描述:	926100300
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(926100301), pi.getMap(926100301).getPortal(0)); //研究室101號
	return true;
}