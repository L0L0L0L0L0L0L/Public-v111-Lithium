/*
	名字:	獅子王城
	地圖:	第二座塔
	描述:	211060400
*/

function enter(pi) {
	if (pi.getPlayer().itemQuantity(4032833)) {
	if (pi.getMap(211060401).getCharacters().size() < 1) {
		var em = pi.getEventManager("tower_Second");
		em.startInstance(pi.getPlayer());
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The door seems to be locked."));
		return false;
}