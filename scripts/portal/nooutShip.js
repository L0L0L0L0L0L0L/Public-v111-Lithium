/*
	名字:	黑路
	地圖:	避難準備完畢
	描述:	914000500
*/

function enter(pi) {
	pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "I shouldn't go this way."));
	return false;
}