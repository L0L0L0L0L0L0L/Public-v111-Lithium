/*
	名字:	隱藏地圖
	地圖:	猶利塔的辦公室
	描述:	926100203
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getReactorByName("rnj6_out").getState() > 0) {
		pi.getPlayer().changeMap(pi.getMap(926100300), pi.getMap(926100300).getPortal(0)); //研究室走廊
		}
		return false;
}