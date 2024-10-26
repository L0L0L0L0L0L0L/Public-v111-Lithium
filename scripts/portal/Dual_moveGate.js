/*
	名字:	墮落城市
	地圖:	墮落城市
	描述:	103000000
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(103050000), pi.getMap(103050000).getPortal(5)); //墮落城市後街
	return true;
}