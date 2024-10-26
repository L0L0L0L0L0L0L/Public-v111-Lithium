/*
	名字:	奔翔之地
	地圖:	網咖的路
	描述:	199000000
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(103000000), pi.getMap(103000000).getPortal(0)); //墮落城市
	return true;
}