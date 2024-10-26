/*
	名字:	冰雪平原
	地圖:	冰雪平原後路
	描述:	932000100
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getMonsterById(9300438) == null) {
		map = pi.getPlayer().getMap().getId() + 100;
		pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(0));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Please get the leader in this portal, and make sure Ice Knight is here."));
		return false;
}