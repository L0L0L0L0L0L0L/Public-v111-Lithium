/*
	名字:	隱密之地
	地圖:	雅典娜禁地&amp;lt;休息室&gt;
	描述:	920010400
*/

var map = new Array(920010200, 920010300, 920010400, 920010700, 920011000);
var exit = new Array(4, 12, 5, 13, 14);

function enter(pi) {
	for (var i = 0; i < map.length; i ++)
	if (pi.getPlayer().getMap().getId() == map[i])
		pi.getPlayer().changeMap(pi.getMap(920010100), pi.getMap(920010100).getPortal(exit[i])); //雅典娜禁地&amp;lt;中央塔&gt;
		return true;
}