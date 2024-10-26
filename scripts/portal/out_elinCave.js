/*
	名字:	艾靈森林
	地圖:	洞穴深處
	描述:	300010420
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Due to the monster's obstruction, the exit has been closed."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(300010410), pi.getMap(300010410).getPortal(2)); //岩石山洞穴
		return true;
}