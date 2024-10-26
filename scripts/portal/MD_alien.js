/*
	名字:	地球防衛總部
	地圖:	克嵐草原Ⅰ
	描述:	221040000
*/

var map = 221040000;
var maps = 221040001; //注意！ 外星人出沒區域
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