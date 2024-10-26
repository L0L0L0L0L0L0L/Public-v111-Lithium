/*
	名字:	隱藏的街道
	地圖:	甜蜜蛋糕山丘
	描述:	683000100
*/

var map =[683000130, 683000120, 683000110];
var x = [6, 5, 4];

function enter(pi) {
	for (var i = 0; i < map.length; i ++)
	if (pi.getPlayer().getMap().getId() < map[i]) {
		y = x[i];
		}
		pi.getPlayer().changeMap(pi.getMap(683000000), pi.getMap(683000000).getPortal(y)); //甜蜜蛋糕山丘入口
		return true;
}