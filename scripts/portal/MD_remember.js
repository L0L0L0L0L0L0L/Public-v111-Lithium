/*
	名字:	神木村
	地圖:	被遺留的龍之巢穴
	描述:	240040511
*/

var map = 240040511;
var maps = 240040800; //復活的記憶
var num = 10;

function enter(pi) {
	if (pi.getPlayer().getMap().getId() != map) {
		pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(6));
		return true;
		}
		for (var i = 0; i < num; i++)
	if (pi.getMap(maps + i).getCharacters().size() < 1) {
		pi.getPlayer().changeMap(pi.getMap(maps + i), pi.getMap(maps + i).getPortal(1));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "All of the Mini-Dungeons are in use right now, please try again later."));
		return false;
}