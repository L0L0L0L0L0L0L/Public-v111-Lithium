/*
	名字:	隱藏地圖
	地圖:	令人不適的實驗室
	描述:	926100100
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getReactorByName("rnj2_door").getState() > 2) {
		pi.getPlayer().changeMap(pi.getMap(926100200), pi.getMap(926100200).getPortal(0)); //特殊實驗室
		}
		return false;
}