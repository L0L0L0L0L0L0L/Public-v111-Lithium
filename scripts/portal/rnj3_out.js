/*
	名字:	隱藏地圖
	地圖:	特殊實驗室
	描述:	926100200
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getReactorByName("rnj3_out3").getState() > 0) {
		pi.getPlayer().changeMap(pi.getMap(926100203), pi.getMap(926100203).getPortal(0)); //猶利塔的辦公室
		}
		return false;
}