/*
	名字:	隱藏的街道
	地圖:	甜蜜蛋糕山丘入口
	描述:	684000000
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(600000000), pi.getMap(600000000).getPortal(19)); //新叶城-市区中心
	return true;
}