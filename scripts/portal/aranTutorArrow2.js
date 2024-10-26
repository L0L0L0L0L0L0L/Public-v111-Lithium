/*
	名字:	黑路
	地圖:	燃燒的森林2
	描述:	914000210
*/

function enter(pi) {
	if (pi.getPlayer().getInfoQuest(21002).indexOf("arr2=o") != -1) {
		return false;
		}
		pi.updateInfoQuest(21002, "normal=o;arr0=o;arr1=o;arr2=o;mo1=o;chain=o;mo2=o;mo3=o;mo4=o");
		pi.getPlayer().updateInfoQuest(21002, pi.getPlayer().getInfoQuest(21002) + ";arr2=o");
		pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.AranTutInstructionalBalloon("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialArrow1"));
		return false;
}