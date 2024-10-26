/*
	名字:	威廉的古堡
	地圖:	威廉公爵之墓
	描述:	990000700
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getReactorByName("ghostgate").getState() > 0) {
		pi.getPlayer().changeMap(pi.getMap(990000800), pi.getMap(990000800).getPortal(0)); //死亡迴廊
		}
		return false;
}