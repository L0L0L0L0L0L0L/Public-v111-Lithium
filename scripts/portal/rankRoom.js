/*
	名字:	殿堂入口
	地圖:	100000201
	描述:	弓箭手培訓中心
*/

var map = new Array(130000000, 130000200, 140010100, 120000101, 103000003, 100000201, 101000003, 102000003);
var tomap = new Array(130000100, 130000100, 140010110, 120000105, 103000008, 100000204, 101000004, 102000004);
var x = new Array(5, 4, 1, 1, 1, 2, 2, 1);

function enter(pi) {
	if (pi.getPlayer().getMap().getId() == 910080000 || pi.getPlayer().getMap().getId() == 910090000) {
		return false;
		}
	for (var i = 0; i < map.length; i ++)
	if (pi.getPlayer().getMap().getId() == map[i])
		pi.getPlayer().changeMap(pi.getMap(tomap[i]), pi.getMap(tomap[i]).getPortal(x[i]));
		return true;
}