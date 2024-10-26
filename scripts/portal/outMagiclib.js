/*
	名字:	隱藏地圖
	地圖:	魔法圖書館
	描述:	910110000
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Due to the monster's obstruction, the exit has been closed."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(101000000), pi.getMap(101000000).getPortal(7)); //魔法森林
		return true;
}