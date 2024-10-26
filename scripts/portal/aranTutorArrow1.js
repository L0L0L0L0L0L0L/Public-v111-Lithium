/*
	名字:	黑路
	地圖:	燃燒的森林1
	描述:	914000200
*/

function enter(pi) {
	if (pi.getPlayer().getInfoQuest(21002).indexOf("arr1=o") != -1) {
		return false;
		}
		pi.getPlayer().updateInfoQuest(21002, pi.getPlayer().getInfoQuest(21002) + ";arr1=o");
		pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.AranTutInstructionalBalloon("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialArrow1"));
		return false;
}