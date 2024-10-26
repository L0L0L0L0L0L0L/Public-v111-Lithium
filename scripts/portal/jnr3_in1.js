/*
	名字:	隱藏地圖
	地圖:	特殊實驗室
	描述:	926110200
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getReactorByName("jnr3_out2").getState() > 0) {
		pi.getPlayer().changeMap(pi.getMap(926110202), pi.getMap(926110202).getPortal(1)); //漆黑的研究室2
		}
		return false;
}