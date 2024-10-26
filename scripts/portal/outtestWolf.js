/*
	名字:	隱藏地圖
	地圖:	狼的考驗
	描述:	914030000
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() < 1) {
		pi.getPlayer().changeMap(pi.getMap(140010210), pi.getMap(140010210).getPortal(0)); //狼之平原
		Packages.server.quest.MapleQuest.getInstance(21620).forceStart(pi.getPlayer(), 0, 0);
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Due to the monster's obstruction, the exit has been closed."));
		return false;
}