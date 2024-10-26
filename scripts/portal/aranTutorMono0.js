/*
	名字:	黑路
	地圖:	傷兵的棚子
	描述:	914000000
*/

function enter(pi) {
	if (pi.getPlayer().getInfoQuest(21002).indexOf("mo1=o") != -1) {
		return false;
		}
		pi.getPlayer().updateInfoQuest(21002, pi.getPlayer().getInfoQuest(21002) + ";mo1=o");
		pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.AranTutInstructionalBalloon("Effect/OnUserEff.img/guideEffect/aranTutorial/legendBalloon1"));
		return false;
}