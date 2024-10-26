/*
	名字:	隱藏地圖
	地圖:	令人不適的實驗室
	描述:	926110100
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getReactorByName("jnr2_door").getState() > 2) {
		pi.getPlayer().changeMap(pi.getMap(926110200), pi.getMap(926110200).getPortal(1)); //特殊實驗室
		}
		return false;
}