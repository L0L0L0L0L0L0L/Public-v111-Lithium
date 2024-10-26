/*
	名字:	隱藏地圖
	地圖:	漆黑的研究室2
	描述:	926100202
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getReactorByName("rnj32_out").getState() > 0) {
		pi.getPlayer().changeMap(pi.getMap(926100200), pi.getMap(926100200).getPortal(2)); //特殊實驗室
		}
		return false;
}