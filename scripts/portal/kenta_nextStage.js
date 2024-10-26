/*
	名字:	隱藏地圖
	地圖:	危險之海1
	描述:	923040100
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getId() == 923040100 && pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Due to the monster's obstruction, the entrance has been closed."));
		return false;
		}
	if (pi.getPlayer().getMap().getId() == 923040200 && pi.getPlayer().itemQuantity(2430364) < 10) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Due to the obstruction of water pressure, it is necessary to carry 10 bubbles."));
		return false;
		}
		pi.getPlayer().removeAll(2430364);
		map = pi.getPlayer().getMap().getId() + 100;
		pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(pi.getPlayer().getMap().getId() == 923040100 ? 2 : 3));
		return true;
}