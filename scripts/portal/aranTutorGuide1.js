/*
	名字:	黑路
	地圖:	燃燒的森林2
	描述:	914000210
*/

function enter(pi) {
	if (pi.getPlayer().getInfoQuest(21002).indexOf("chain=o") != -1) {
		return false;
		}
		pi.getPlayer().updateInfoQuest(21002, pi.getPlayer().getInfoQuest(21002) + ";chain=o");
		pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("aran/tutorialGuide2", 3));
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "You can use Consecutive Attacks by pressing the Ctrl key multiple times."));
		return false;
}