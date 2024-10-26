/*
	名字:	獅子王之城
	地圖:	亞尼的禁閉室
	描述:	211061100
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getMonsterById(8210013) == null) {
		pi.getPlayer().changeMap(pi.getMap(211061000), pi.getMap(211061000).getPortal(6)); //第五座塔
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Due to the monster's obstruction, the exit has been closed."));
		return false;
}