/*
	名字:	隱藏地圖
	地圖:	特殊實驗室
	描述:	926100200
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getReactorByName("rnj3_out1").getState() > 0) {
		pi.getPlayer().changeMap(pi.getMap(926100201), pi.getMap(926100201).getPortal(1)); //漆黑的研究室1
		}
		return false;
}