/*
	名字:	黑路
	地圖:	避難準備中
	描述:	914000100
*/

function enter(pi) {
	if (pi.getPlayer().getInfoQuest(21002).indexOf("arr0=o") != -1) {
		return false;
		}
		pi.getPlayer().updateInfoQuest(21002, pi.getPlayer().getInfoQuest(21002) + ";arr0=o");
		pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.AranTutInstructionalBalloon("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialArrow3"));
		return false;
}