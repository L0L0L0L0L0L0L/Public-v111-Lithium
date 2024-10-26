/*
	名字:	福爾摩沙
	地圖:	7層8層 A區域
	描述:	103040400
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(103040300), pi.getMap(103040300).getPortal(1)); //名人大道東部區域
	return true;
}