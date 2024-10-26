/*
	名字:	隱藏地圖
	地圖:	猶利塔的辦公室
	描述:	926110203
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getReactorByName("jnr6_out").getState() > 0) {
		pi.getPlayer().changeMap(pi.getMap(926110300), pi.getMap(926110300).getPortal(0)); //研究室走廊
		}
		return false;
}