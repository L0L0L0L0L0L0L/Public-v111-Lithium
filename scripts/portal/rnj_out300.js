/*
	名字:	隱藏地圖
	地圖:	研究室103號
	描述:	926100303
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(926100400), pi.getMap(926100400).getPortal(0)); //中央研究室入口
	return true;
}