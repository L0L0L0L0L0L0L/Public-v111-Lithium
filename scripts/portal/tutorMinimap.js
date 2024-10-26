/*
	名字:	皇后之路
	地圖:	開始之森林2
	描述:	130030001
*/

function enter(pi) {
	if (!pi.getPlayer().hasSummon())
	pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonHelper(true));
	pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonMessage(1));
	return true;
}