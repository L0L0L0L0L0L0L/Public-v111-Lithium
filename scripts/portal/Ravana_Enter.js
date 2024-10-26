/*
	名字:	黃金寺廟
	地圖:	封印神殿入口
	描述:	950101000
*/

function enter(pi) {
	var level = pi.getPlayer().getLevel();
	var mob = pi.getPlayer().getMap().getId() == 809061010 ? 9409018 : pi.getPlayer().getMap().getId() == 950101011 ? 9500390 : pi.getPlayer().getMap().getId() == 950101012 ? 9500391 : 9500392;
	var map = pi.getPlayer().getMap().getId() == 809061000 ? 809061010 : level < 50 ? 950101011 : level < 90 ? 950101012 : 950101013;
	if (pi.getPlayer().getMap().getId() == 809061000 && level < 120) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "At least level 120 or above is required to enter."));
		return false;
		}
	if (pi.getPlayer().itemQuantity(4001433) < 20) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "To worship the Six Hand Evil God Temple, it is necessary to worship 20 sparks of the sun."));
		return false;
		}
	if (pi.getMap(map).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		return false;
		}
		pi.gainItem(4001433, -20);
		pi.getMap(map).resetFully();
		pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(0));
		pi.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(mob), new java.awt.Point(1000, 513));
		pi.getPlayer().startMapTimeLimitTask(1200, pi.getMap(pi.getPlayer().getMap().getId() == 809061010 ? 809061000 : 950101000));
		return true;
}