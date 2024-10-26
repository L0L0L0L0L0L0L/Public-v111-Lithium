/*
	名字:	隱藏地圖
	地圖:	隱藏之塔
	描述:	921160100
*/

function enter(pi) {
	pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The exit has been blocked."));
	return false;
}