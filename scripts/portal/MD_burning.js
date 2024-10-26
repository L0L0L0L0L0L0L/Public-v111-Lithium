/*
	名字:	炎熱之路
	地圖:	仙人掌沙漠1
	描述:	260010100
*/

var map = 260010100;
var maps = 260010101; //燃燒山丘
var num = 10;

function enter(pi) {
	if (pi.getPlayer().getMap().getId() != map) {
		pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(4));
		return true;
		}
	if (pi.getPlayer().getLevel() > 200) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Level 200 or above cannot be accessed."));
		return false;
		}
	if (!pi.getPlayer().itemQuantity(4032055)) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "You need to have an Event Ticket (Regular)."));
		return false;
		}
		for (var i = 0; i < num; i++)
	if (pi.getMap(maps + i).getCharacters().size() < 1) {
		pi.getPlayer().changeMap(pi.getMap(maps + i), pi.getMap(maps + i).getPortal(1));
		pi.gainItem(4032055, -1);
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "All of the Mini-Dungeons are in use right now, please try again later."));
		return false;
}