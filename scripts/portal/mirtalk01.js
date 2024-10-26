/*
	名字:	夢中
	地圖:	夢見的路
	描述:	900010100
*/

function enter(pi) {
	if (pi.getPlayer().getInfoQuest(22013).indexOf("dt01=o") != -1) {
		return false;
		}
		pi.getPlayer().updateInfoQuest(22013, pi.getPlayer().getInfoQuest(22013) + ";dt01=o");
		pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("evan/dragonTalk01", 3));
		return true;
}