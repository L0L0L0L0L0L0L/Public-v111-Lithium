/*
	名字:	神木村
	地圖:	天空地區1
	描述:	240080600
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() < 1) {
		map = pi.getPlayer().getMap().getId() + 100;
		portal = pi.getPlayer().getMap().getId() == 240080600 ? 2 : 1;
		pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(portal));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Due to the monster's obstruction, the exit has been closed."));
		return false;
}