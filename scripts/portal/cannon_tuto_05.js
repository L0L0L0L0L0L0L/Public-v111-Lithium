/*
	名字:	可可島
	地圖:	維多利亞島
	描述:	3000000
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(912060100), pi.getMap(912060100).getPortal(0)); //前往猴子方向 動畫地圖
	return true;
}