/*
	名字:	弓箭手村
	地圖:	弓箭手村
	描述:	100000000
*/

function enter(pi) {
	if (pi.getPlayer().getLevel() < 30) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "You must be level 30 in order to be able to enter the Crafting Town."));
		return false;
		}
		pi.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("ARDENTMILL"));
		pi.getPlayer().changeMap(pi.getMap(910001000), pi.getMap(910001000).getPortal(6));
		return true;
}