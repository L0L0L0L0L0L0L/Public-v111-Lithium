/*
	名字:	靈藥幻境
	地圖:	金勾海賊團基地2
	描述:	251010402
*/

var map = 251010402;
var maps = 251010410; //搶奪寶物島
var num = 10;

function enter(pi) {
	if (pi.getPlayer().getMap().getId() != map) {
		pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(5));
		return true;
		}
		for (var i = 0; i < num; i++)
	if (pi.getMap(maps + i).getCharacters().size() < 1) {
		pi.getPlayer().changeMap(pi.getMap(maps + i), pi.getMap(maps + i).getPortal(2));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "All of the Mini-Dungeons are in use right now, please try again later."));
		return false;
}