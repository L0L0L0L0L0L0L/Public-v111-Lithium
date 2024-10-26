/*
	名字:	獅子王城
	地圖:	第三座塔
	描述:	211060600
*/

function enter(pi) {
	if (pi.getPlayer().itemQuantity(4032834)) {
	if (pi.getMap(211060601).getCharacters().size() < 1) {
		var em = pi.getEventManager("tower_Third");
		em.startInstance(pi.getPlayer());
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The door seems to be locked."));
		return false;
}