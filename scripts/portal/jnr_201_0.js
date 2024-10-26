/*
	名字:	隱藏地圖
	地圖:	漆黑的研究室1
	描述:	926110201
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getReactorByName("jnr31_out").getState() > 0) {
		pi.getPlayer().changeMap(pi.getMap(926110200), pi.getMap(926110200).getPortal(1)); //特殊實驗室
		}
		return false;
}