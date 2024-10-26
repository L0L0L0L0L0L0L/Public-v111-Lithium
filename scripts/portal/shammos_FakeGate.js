/*
	名字:	冰雪峽谷
	地圖:	冰雪峽谷1
	描述:	921120005
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() < 1) {
		pi.getPlayer().changeMap(pi.getMap(921120100), pi.getMap(921120100).getPortal(0)); //冰雪峽谷2
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Due to the monster's obstruction, the exit has been closed."));
		return false;
}