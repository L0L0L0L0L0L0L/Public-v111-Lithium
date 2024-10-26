/*
	名字:	黑路
	地圖:	傷兵的棚子
	描述:	914000000
*/

function enter(pi) {
	if (pi.getPlayer().getInfoQuest(21002).indexOf("mo2=o") != -1) {
		return false;
		}
		pi.getPlayer().updateInfoQuest(21002, pi.getPlayer().getInfoQuest(21002) + ";mo2=o");
		pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("Aran/balloon", 4));//喧雜聲
		pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.AranTutInstructionalBalloon("Effect/OnUserEff.img/guideEffect/aranTutorial/legendBalloon2"));
		return false;
}