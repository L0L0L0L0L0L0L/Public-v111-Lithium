/*
	名字:	皇后之路
	地圖:	小橋樑
	描述:	130030006
*/

function enter(pi) {
	if (!pi.getPlayer().hasSummon())
	pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonHelper(true));
	pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonMessage(11));
	return true;
}