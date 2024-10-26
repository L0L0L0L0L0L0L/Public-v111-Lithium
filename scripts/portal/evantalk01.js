/*
	名字:	夢中
	地圖:	夢見的森林入口
	描述:	900010000
*/

function enter(pi) {
	if (pi.getPlayer().getInfoQuest(22013).indexOf("mo01=o") != -1) {
		return false;
		}
		pi.getPlayer().updateInfoQuest(22013, pi.getPlayer().getInfoQuest(22013) + ";mo01=o");
		pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.AranTutInstructionalBalloon("Effect/OnUserEff.img/guideEffect/evanTutorial/evanBalloon01"));
		return true;
}