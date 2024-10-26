/*
	名字:	黑路
	地圖:	燃燒的森林3
	描述:	914000220
*/

function enter(pi) {
	if (pi.getPlayer().getInfoQuest(21002).indexOf("arr3=o") != -1) {
		return false;
		}
		pi.getPlayer().updateInfoQuest(21002, pi.getPlayer().getInfoQuest(21002) + ";arr3=o");
		pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.AranTutInstructionalBalloon("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialArrow1"));
		return false;
}