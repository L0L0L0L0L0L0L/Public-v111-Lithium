/*
	名字:	弓箭手村
	地圖:	弓箭手村市場
	描述:	100000100
*/

function enter(pi) {
	if (pi.getPlayer().getLevel() < 10) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "You must be level 10 in order to be able to enter the FreeMarket."));
		return false;
		}
		pi.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("FREE_MARKET"));
		pi.getPlayer().changeMap(pi.getMap(910000000), pi.getMap(910000000).getPortal(34));
		return true;
}