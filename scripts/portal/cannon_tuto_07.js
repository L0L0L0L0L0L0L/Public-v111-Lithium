/*
	名字:	可可島
	地圖:	火箭出發
	描述:	912060200
*/

function enter(pi) {
	pi.spawnNPCRequestController(1096012, -51, -97, 0);
	pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(1));
	pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 2));
	return false;
}