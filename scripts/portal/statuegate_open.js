/*
	名字:	威廉的古堡
	地圖:	威廉的古堡城門
	描述:	990000300
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getReactorByName("statuegate").getState() > 0) {
		pi.getPlayer().changeMap(pi.getMap(990000301), pi.getMap(990000301).getPortal(0)); //前往威廉的古堡的路
		}
		return false;
}