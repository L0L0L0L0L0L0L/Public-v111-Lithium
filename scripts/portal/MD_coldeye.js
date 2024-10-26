/*
	名字:	北部森林
	地圖:	小樹森林
	描述:	101030300
*/

var map = 101030300;
var maps = 101030400; //獨眼蜥蜴
var num = 10;

function enter(pi) {
	if (pi.getPlayer().getMap().getId() != map) {
		pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(1));
		return true;
		}
		for (var i = 0; i < num; i++)
	if (pi.getMap(maps + i).getCharacters().size() < 1) {
		pi.getPlayer().changeMap(pi.getMap(maps + i), pi.getMap(maps + i).getPortal(4));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "All of the Mini-Dungeons are in use right now, please try again later."));
		return false;
}