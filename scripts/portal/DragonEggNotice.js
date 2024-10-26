/*
	名字:	隱密之地
	地圖:	茂盛的森林
	描述:	900020110
*/

function enter(pi) {
	if (pi.getPlayer().getInfoQuest(22013).indexOf("egg=o") != -1) {
		return false;
		}
		pi.getPlayer().updateInfoQuest(22013, pi.getPlayer().getInfoQuest(22013) + ";egg=o");
		pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.getEvanTutorial("UI/tutorial/evan/8/0"));
		return true;
}