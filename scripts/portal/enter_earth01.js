/*
	名字:	地球防衛總部
	地圖:	司令室
	描述:	221000300
*/

function enter(pi) {
	if (!pi.getPlayer().itemQuantity(4031890)) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "You need a warp card to activate this portal."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(120000101), pi.getMap(120000101).getPortal(3)); //航海室
		return true;
}