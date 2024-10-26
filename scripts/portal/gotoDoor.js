/*
	名字:	黑暗時間神殿
	地圖:	時間神殿迴廊2
	描述:	272010100
*/

function enter(pi) {
	var em = pi.getEventManager("Arkarium");
	var prop = em.getProperty("state");
	if (prop == null || prop == 0) {
		em.startInstance(pi.getPlayer());
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		return false;
}