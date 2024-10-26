/*
	名字:	維多利亞
	地圖:	秘密花園地下
	描述:	103050300
*/

function enter(pi) {
	if (pi.getPlayer().getLevel() < 20) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "You need level 20 to enter."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(103050310), pi.getMap(103050310).getPortal(1)); //修煉場1
		return true;
}