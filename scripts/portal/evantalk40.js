/*
	名字:	隱密之地
	地圖:	遺失的森林入口
	描述:	900020200
*/

function enter(pi) {
	if (pi.getPlayer().getInfoQuest(22013).indexOf("mo40=o") != -1) {
		return false;
		}
		pi.getPlayer().updateInfoQuest(22013, pi.getPlayer().getInfoQuest(22013) + ";mo40=o");
		pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.AranTutInstructionalBalloon("Effect/OnUserEff.img/guideEffect/evanTutorial/evanBalloon40"));
		return true;
}