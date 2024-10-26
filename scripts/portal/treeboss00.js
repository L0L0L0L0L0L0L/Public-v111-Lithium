/*
	名字:	新加坡
	地圖:	克雷塞爾遺跡 I
	描述:	541020700
*/

function enter(pi) {
	if (!pi.getPlayer().itemQuantity(4000385)) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "A Soul Lantern is required to enter."));
		return false;
		}
	var em = pi.getEventManager("Krexel");
	var prop = em.getProperty("state");
	if (prop == null || prop == 0) {
		pi.gainItem(4000385, -1);
	if (pi.getPlayer().getParty() == null) {
		em.startInstance(pi.getPlayer());
		return true;
		}
		em.startInstance(pi.getPlayer().getParty(), pi.getPlayer().getMap(), 200);
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		return false;
}