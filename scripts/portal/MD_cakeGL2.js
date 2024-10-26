/*
	名字:	隱藏的街道
	地圖:	甜蜜蛋糕山丘入口
	描述:	683000000
*/

var map = 683000000;
var maps = 683000110; //甜饼地图
var num = 10;

function enter(pi) {
	for (var i = 0; i < num; i++)
	if (pi.getMap(maps + i).getCharacters().size() < 1) {
		pi.getPlayer().changeMap(pi.getMap(maps + i), pi.getMap(maps + i).getPortal(3));
		pi.gainItem(4032055, -1);
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "All of the Mini-Dungeons are in use right now, please try again later."));
		return false;
}