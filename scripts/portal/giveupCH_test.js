/*
	名字:	十字獵人基地
	地圖:	測試房間
	描述:	931050510
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(931050500), pi.getMap(931050500).getPortal(1)); //補給品倉庫
	return true;
}