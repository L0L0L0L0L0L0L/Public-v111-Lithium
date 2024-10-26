/*
	名字:	艾靈森林
	地圖:	女王的藏身處
	描述:	300030310
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Due to the monster's obstruction, the exit has been closed."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(300030300), pi.getMap(300030300).getPortal(2)); //蝴蝶精的森林2
		return true;
}