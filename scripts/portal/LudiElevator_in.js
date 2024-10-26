/*
	名字:	玩具城
	地圖:	赫爾奧斯塔 2樓
	描述:	222020100
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getId() == 222020100) {
		pi.getPlayer().changeMap(pi.getMap(222020110), pi.getMap(222020110).getPortal(0)); //電梯&amp;lt;前往玩具城&gt;
		pi.getPlayer().startMapTimeLimitTask(10, pi.getMap(222020200));
		return true;
		}
		pi.getPlayer().changeMap(pi.getMap(222020211), pi.getMap(222020211).getPortal(0)); //電梯&amp;lt;前往童話村&gt;
		pi.getPlayer().startMapTimeLimitTask(10, pi.getMap(222020100));
		return true;
}