/*
	名字:	獅子王城
	地圖:	第一座塔
	描述:	211060200
*/

function enter(pi) {
	if (pi.getPlayer().itemQuantity(4032858)) {
	if (pi.getMap(921140100).getCharacters().size() < 1) {
		pi.getMap(921140100).resetFully();
		pi.getPlayer().changeMap(pi.getMap(921140100), pi.getMap(921140100).getPortal(1)); //危險的第一座塔樓
		pi.getMap(921140100).spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(8210010), new java.awt.Point(1171, -183));
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(211060200));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		return false;
		}
	if (pi.getPlayer().itemQuantity(4032832)) {
	if (pi.getMap(211060201).getCharacters().size() < 1) {
		var em = pi.getEventManager("tower_First");
		em.startInstance(pi.getPlayer());
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The door seems to be locked."));
		return false;
}