/*
	名字:	水世界
	地圖:	危險海峽2
	描述:	230040300
*/

function enter(pi) {
	if (!pi.getPlayer().itemQuantity(4001108)) {
		return false;
		}
	if (pi.getMap(923000100).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		return false;
		}
		pi.getMap(923000100).resetFully();
		pi.getPlayer().changeMap(pi.getMap(923000100), pi.getMap(923000100).getPortal(1)); //冰冷的洞穴
		pi.getPlayer().startMapTimeLimitTask(300, pi.getMap(230040300));
		return true;
}