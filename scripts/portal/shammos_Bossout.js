/*
	名字:	冰雪峽谷
	地圖:	萬年冰河洞穴
	描述:	921120300
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() < 1) {
		pi.getPlayer().changeMap(pi.getMap(921120400), pi.getMap(921120400).getPortal(0)); //峽谷墓場
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Due to the monster's obstruction, the exit has been closed."));
		return false;
}