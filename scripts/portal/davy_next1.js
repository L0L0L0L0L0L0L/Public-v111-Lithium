/*
	名字:	隱藏地圖
	地圖:	突破船首!
	描述:	925100100
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getReactorByName("treasure1").getState() > 0) {
		pi.getPlayer().changeMap(pi.getMap(925100200), pi.getMap(925100200).getPortal(0)); //突破甲板1
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The portal is not opened yet."));
		return false;
}