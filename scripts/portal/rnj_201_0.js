/*
	名字:	隱藏地圖
	地圖:	漆黑的研究室1
	描述:	926100201
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getReactorByName("rnj31_out").getState() > 0) {
		pi.getPlayer().changeMap(pi.getMap(926100200), pi.getMap(926100200).getPortal(1)); //特殊實驗室
		}
		return false;
}