/*
	名字:	隱藏地圖
	地圖:	特殊實驗室
	描述:	926100200
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getReactorByName("rnj3_out2").getState() > 0) {
		pi.getPlayer().changeMap(pi.getMap(926100202), pi.getMap(926100202).getPortal(1)); //漆黑的研究室2
		}
		return false;
}