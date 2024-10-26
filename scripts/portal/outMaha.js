/*
	名字:	隱藏地圖
	地圖:	與瑪哈的對決
	描述:	914020000
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Due to the monster's obstruction, the exit has been closed."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(140000000), pi.getMap(140000000).getPortal(1)); //瑞恩村
		return true;
}