/*
	名字:	冰雪峽谷
	地圖:	冰雪峽谷2
	描述:	921120100
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getMonsterById(9300275) == null) {
		map = pi.getPlayer().getMap().getId() + 100;
		portal = pi.getPlayer().getMap().getId() == 921120200 ? 1 : 0;
		pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(portal));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Please get the leader in this portal, and make sure Shammos is here."));
		return false;
}