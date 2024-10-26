/*
	名字:	隱藏地圖
	地圖:	危險之海1
	描述:	923040100
*/

function enter(pi) {
	pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The exit has been closed."));
	return false;
}