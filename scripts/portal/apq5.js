/*
	名字:	隱藏地圖
	地圖:	階段 4 - 終極悍將
	描述:	670010500
*/

function enter(pi) {
	var eim = pi.getPlayer().getEventInstance();
	if (eim.getProperty("stage3") > 0) {
		pi.getPlayer().changeMap(pi.getMap(670010600), pi.getMap(670010600).getPortal(1)); //階段 5 - 心跳不規則
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The portal is not opened yet."));
		return false;
}