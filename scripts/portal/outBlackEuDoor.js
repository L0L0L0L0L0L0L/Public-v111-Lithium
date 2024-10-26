/*
	名字:	精靈森林
	地圖:	受到攻擊的發光的洞穴之路
	描述:	910150220
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "We should defeat the Black Wing henchmen first!"));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(101050000), pi.getMap(101050000).getPortal(9)); //櫻花處
		return true;
}