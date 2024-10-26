/*
	名字:	黑路
	地圖:	燃燒的森林3
	描述:	914000220
*/

function enter(pi) {
	if (pi.getPlayer().getInfoQuest(21002).indexOf("cmd=o") != -1) {
		return false;
		}
		pi.getPlayer().updateInfoQuest(21002, pi.getPlayer().getInfoQuest(21002) + ";cmd=o");
		pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("aran/tutorialGuide3", 3));
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "You can use a Command Attack by pressing both the arrow key and the attack key after a Consecutive Attack."));
		return false;
}