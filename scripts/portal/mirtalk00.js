/*
	名字:	夢中
	地圖:	夢見的森林入口
	描述:	900010000
*/

function enter(pi) {
	if (pi.getPlayer().getInfoQuest(22013).indexOf("dt00=o") != -1) {
		return false;
		}
		pi.getPlayer().updateInfoQuest(22013, pi.getPlayer().getInfoQuest(22013) + ";dt00=o");
		pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("evan/dragonTalk00", 3));
		return true;
}