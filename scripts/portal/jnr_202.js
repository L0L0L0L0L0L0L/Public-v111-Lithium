/*
	名字:	隱藏地圖
	地圖:	漆黑的研究室2
	描述:	926110202
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getReactorByName("jnr32_out").getState() > 0) {
		pi.getPlayer().changeMap(pi.getMap(926110200), pi.getMap(926110200).getPortal(2)); //特殊實驗室
		}
		return false;
}