/*
	名字:	威廉的古堡
	地圖:	賢者噴水池
	描述:	990000500
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getReactorByName("watergate").getState() > 0) {
		pi.getPlayer().changeMap(pi.getMap(990000600), pi.getMap(990000600).getPortal(1)); //地下水路
		}
		return false;
}