/*
	名字:	威廉的古堡
	地圖:	迷宮之盡頭
	描述:	990000641
*/

function enter(pi) {
	eim = pi.getPlayer().getEventInstance();
	eim.setProperty(pi.getPlayer().getName(), 2);

	pi.getPlayer().changeMap(pi.getMap(990000700), pi.getMap(990000700).getPortal(1)); //威廉公爵之墓
	return true;
}