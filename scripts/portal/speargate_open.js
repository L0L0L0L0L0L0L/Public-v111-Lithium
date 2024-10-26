/*
	名字:	威廉的古堡
	地圖:	騎士大廳
	描述:	990000400
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getReactorByName("speargate").getState() > 3) {
		pi.getPlayer().changeMap(pi.getMap(990000401), pi.getMap(990000401).getPortal(0)); //中央通道
		}
		return false;
}