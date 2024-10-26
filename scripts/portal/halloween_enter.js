/*
	名字:	隱藏地圖
	地圖:	鬧鬼宅邸外部
	描述:	682000000
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(682000100), pi.getMap(682000100).getPortal(8)); //大廳
	return true;
}