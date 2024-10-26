/*
	名字:	霧之海
	地圖:	第1 作戰室
	描述:	923020110
*/

function enter(pi) {
	pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "the exit has been closed."));
	return true;
}