/*
	名字:	新葉城 市區街道
	地圖:	新葉城-市區中心
	描述:	600000000
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(600020000), pi.getMap(600020000).getPortal(7)); //大廳
	return true;
}