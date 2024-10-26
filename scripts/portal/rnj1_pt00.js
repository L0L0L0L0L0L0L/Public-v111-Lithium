/*
	名字:	隱藏地圖
	地圖:	可疑的研究室
	描述:	926100000
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getReactorByName("d00").getState() > 0) {
		pi.getPlayer().changeMap(pi.getMap(926100001), pi.getMap(926100001).getPortal(0)); //實驗室通道
		}
		return false;
}