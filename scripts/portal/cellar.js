/*
	名字:	亞泰爾營地
	地圖:	營地會議場
	描述:	300000010
*/

function enter(pi) {
	pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You cannot enter because it's locked."));
	return false;
}