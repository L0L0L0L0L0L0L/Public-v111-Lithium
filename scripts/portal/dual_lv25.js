/*
	名字:	維多利亞
	地圖:	秘密花園地下
	描述:	103050300
*/

function enter(pi) {
	if (pi.getPlayer().getLevel() < 25) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "You need level 25 to enter."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(103050340), pi.getMap(103050340).getPortal(1)); //修煉場2
		return true;
}