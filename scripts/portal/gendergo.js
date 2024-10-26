/*
	名字:	隱藏地圖
	地圖:	階段 1 - 魔鏡
	描述:	670010200
*/

function enter(pi) {
	if (pi.getPortal().getId() == 16) {
		if (pi.getPlayer().getGender() > 0) {
			pi.getPlayer().changeMap(pi.getMap(670010200), pi.getMap(670010200).getPortal(4));
			return true;
			}
			pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "This portal leads to the girls' area, try the portal at the other side."));
			return false;
			}
	if (pi.getPortal().getId() == 15) {
		if (pi.getPlayer().getGender() < 1) {
			pi.getPlayer().changeMap(pi.getMap(670010200), pi.getMap(670010200).getPortal(3));
			return true;
			}
			pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "This portal leads to the boys' area, try the portal at the other side."));
			return false;
}
}