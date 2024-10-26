/*
	名字:	瑞恩島
	地圖:	寒冷的森林5
	描述:	140090500
*/

function enter(pi) {
	pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonHelper(false));
	return false;
}