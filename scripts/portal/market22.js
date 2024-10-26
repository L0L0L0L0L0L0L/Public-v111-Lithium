/*
	名字:	瑞恩島
	地圖:	瑞恩村
	描述:	140000000
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