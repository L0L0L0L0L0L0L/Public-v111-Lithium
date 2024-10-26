/*
	名字:	騎士團要塞
	地圖:	西格諾斯庭園
	描述:	271040000
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getId() == 271040000) {
		pi.openNpc(2143004);
		return true;
		}
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Due to the monster's obstruction, the exit has been closed."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(271040210), pi.getMap(271040210).getPortal(0)); //西格諾斯後院
		return false;
}